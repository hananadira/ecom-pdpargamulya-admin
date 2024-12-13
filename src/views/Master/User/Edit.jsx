import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from '../../../redux/services/UserApi';
import { Button, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EditUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const { data: user, error, isLoading } = useGetUserQuery(id); // Fetch user data
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    fullname: '',
    phone_number: '',
    image: null,
  });

  // Populate formData with user data if available
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        role: user.role || '',
        email: user.email || '',
        password: '', // Password should not be pre-filled for security reasons
        confirmPassword: '',
        address: user.address || '',
        fullname: user.fullname || '',
        phone_number: user.phone_number || '',
        image: null, // You can handle image differently if needed
      });
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (validTypes.includes(file.type)) {
        setFormData((prevData) => ({ ...prevData, image: file }));
      } else {
        alert('Tipe file tidak valid. Harap unggah file gambar (jpeg, png, jpg, svg, gif).');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userPayload = new FormData();
      userPayload.append('username', formData.username);
      userPayload.append('role', formData.role);
      userPayload.append('email', formData.email);
      userPayload.append('password', formData.password); // Only send password if provided
      userPayload.append('address', formData.address);
      userPayload.append('fullname', formData.fullname);
      userPayload.append('phone_number', formData.phone_number);
      userPayload.append('image', formData.image);
      // userPayload.append('_method', 'PUT')
      // if (formData.image) {
      //   userPayload.append('image', formData.image); // Add image if it exists
      // }

      await updateUser({ id, ...formData }).unwrap(); // Update the user
      navigate('/master/user'); // Redirect to user list after successful update
    } catch (err) {
      console.error('Error saat mengupdate data:', err);
    }
  };

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  // Loading state
  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
        <div className="flex items-center mb-5">
        <Button variant="text" onClick={() => navigate('/master/user')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Edit User</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>
        
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Left Column - Username, Email, Password, etc */}
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username {/*<span className="text-red-500">*</span>*/}
            </label>
            <Input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukan nama profile"
              className="w-full"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role {/* <span className="text-red-500">*</span> */}
            </label>
            <Input
              id="role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Masukan role"
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email {/* <span className="text-red-500">*</span> */}
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exampleEmail@gmail.com"
              className="w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password {/* <span className="text-red-500">*</span> (Kosongkan jika tidak ingin mengubah) */}
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukan password"
              className="w-full"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Verifikasi Password {/* <span className="text-red-500">*</span> (Kosongkan jika tidak ingin mengubah) */}
            </label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Verifikasi password"
              className="w-full"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address {/* <span className="text-red-500">*</span> */}
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukan alamat"
              className="w-full border rounded-md p-2"
              rows="4"
            />
          </div>
        </div>

        {/* Right Column - Fullname, Phone Number, Image */}
        <div className="space-y-4">
          {/* Fullname */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
              Fullname {/* <span className="text-red-500">*</span> */}
            </label>
            <Input
              id="fullname"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Masukan nama lengkap"
              className="w-full"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number {/* <span className="text-red-500">*</span> */}
            </label>
            <Input
              id="phone_number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="nomor handphone"
              className="w-full"
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image {/* <span className="text-red-500">*</span> */}
            </label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full"
            />
            <div className="mt-4 bg-gray-100 h-40 w-full flex items-center justify-center">
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="max-h-full max-w-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Preview Image</span>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 text-right">
          <Button type="submit" variant="gradient" className="px-8 py-2">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
