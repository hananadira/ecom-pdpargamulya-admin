import { apiCore, baseUrlApi } from "./ApiCore";
import { setAuthToken, setAuthUser, clearAuth, setVerified } from "../slice/AuthSlice";
import { toast } from "react-toastify";

export const AuthApi = apiCore.injectEndpoints({
  reducerPath: "apiAuth",
  endpoints: (builder) => ({
    emailVerify: builder.mutation({
      query: (verifyData) => ({
        url: `/api/verify`,
        method: "POST",
        body: verifyData,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try { 
          const { data } = await queryFulfilled;
          console.log("Verification success:", data);

          dispatch(setVerified({ IsVerified: true }));
          
          toast.success("Verification successful!");
        } catch (error) {
          console.error("Verification error:", error);
          dispatch(clearAuth());       
          // toast.error("Verification failed."); 
        }
      },
    }),
    

    authLogin: builder.mutation({
      query: (loginData) => ({
        url: `/api/login`,
        method: "POST",
        body: loginData,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("data", data)

          // Fetch user data after successful login
          const res = await fetch(`${baseUrlApi}/api/detail`, {
            headers: {
              Authorization: `Bearer ${data.token}`, // Ensure correct token usage
              "ngrok-skip-browser-warning": "true",
              'Content-Type': 'application/json',
            },
          });

          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }

          const user = await res.json();
          console.log("user", user)

          dispatch(setAuthUser(user));
          dispatch(
            setAuthToken({
              token: data.token,
              isLoggedIn: true,
            })
          );
          toast.success(data.message);

        } catch (error) {
          const errorMessage= error.error.data.message
          dispatch(clearAuth());
          toast.error(errorMessage);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useEmailVerifyMutation, useAuthLoginMutation } = AuthApi;

export default AuthApi;