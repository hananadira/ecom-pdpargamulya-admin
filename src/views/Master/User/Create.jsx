import { useState } from 'react';
import { useCreateUserMutation } from '../../../redux/services/UserApi';
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddUser = () => {
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
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Cek tipe file
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (validTypes.includes(file.type)) {
        setFormData({ ...formData, image: file });
      } else {
        alert('Tipe file tidak valid. Harap unggah file gambar (jpeg, png, jpg, svg, gif).');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userPayload = new FormData(); // Menggunakan FormData untuk mengirim file
      userPayload.append('username', formData.username);
      userPayload.append('role', formData.role);
      userPayload.append('email', formData.email);
      userPayload.append('password', formData.password);
      userPayload.append('address', formData.address);
      userPayload.append('fullname', formData.fullname);
      userPayload.append('phone_number', formData.phone_number);
      userPayload.append('image', formData.image); // Tambahkan gambar ke FormData

      await createUser(userPayload).unwrap(); // Menambahkan user baru
      navigate('/master/user'); // Kembali ke halaman daftar user setelah sukses
    } catch (err) {
      console.error('Error saat menambah data:', err);
    }
  };

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="flex items-center mb-5">
        <Button variant="text" onClick={() => navigate('/master/user')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Tambah User</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Kiri - Username, Email, Password, etc */}
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
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
              Role <span className="text-red-500">*</span>
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
              Email <span className="text-red-500">*</span>
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
              Password <span className="text-red-500">*</span>
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

          {/* Konfirmasi Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Verifikasi Password <span className="text-red-500">*</span>
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
              Address <span className="text-red-500">*</span>
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

        {/* Kanan - Fullname, Phone Number, Image */}
        <div className="space-y-4">
          {/* Fullname */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
              Fullname <span className="text-red-500">*</span>
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
              Phone Number <span className="text-red-500">*</span>
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
              Image <span className="text-red-500">*</span>
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
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
