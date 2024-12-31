import { apiCore } from "./ApiCore";
import { setAuthToken, setAuthUser, clearAuth } from "../slice/AuthSlice";
import { toast } from "react-toastify";

export const AuthApi = apiCore.injectEndpoints({
  reducerPath: "apiAuth",
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (loginData) => ({
        url: `/api/login`,
        method: "POST",
        body: loginData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token, users, message } = data;

          // Simpan token ke Redux dan localStorage
          dispatch(setAuthToken({
            token,
            isLoggedIn: true,
          }));

          // Simpan data user ke Redux
          dispatch(setAuthUser(users));

          // Simpan token di localStorage
          localStorage.setItem('authToken', token);

          toast.success(message);
        } catch (error) {
          dispatch(clearAuth());
          toast.error("Login failed, please try again.");
        }
      },
    }),
  }),
});

export const { useAuthLoginMutation } = AuthApi;
export default AuthApi;
