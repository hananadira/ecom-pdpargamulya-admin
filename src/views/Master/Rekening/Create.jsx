import { useState } from 'react';
import { useCreateRekeningMutation, useGetRekeningsQuery } from '../../../redux/services/RekeningApi';
import { Typography, Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddRekening = () => {
  const [formData, setFormData] = useState({
    payment_method: '',
    payment_master_image: null,
  });
  const [createRekening, { isLoading, isError, error }] = useCreateRekeningMutation();
  // const { refetch } = useGetRekeningsQuery(); // Refetch data setelah penambahan
  const navigate = useNavigate();

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
        setFormData({ ...formData, payment_master_image: file });
      } else {
        alert('Tipe file tidak valid. Harap unggah file gambar (jpeg, png, jpg, svg, gif).');
      }
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rekeningPayload = new FormData();
      rekeningPayload.append('payment_method', formData.payment_method);
      rekeningPayload.append('payment_master_image', formData.payment_master_image);
  
      const response = await createRekening(rekeningPayload).unwrap();
      console.log('Response:', response);
      navigate('/master/rekening');
    } catch (err) {
      console.error('Error saat menambah rekening:', err);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="flex items-center mb-5">
        <Button variant="text" onClick={() => navigate('/master/rekening')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Tambah Rekening</Typography>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Jenis Pembayaran */}
        <div>
          <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">
            Jenis Pembayaran <span className="text-red-500">*</span>
          </label>
          <Input
            id="payment_method"
            type="text"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            placeholder="Masukan jenis payment"
            className="w-full"
          />
        </div>

        {/* Image */}
        <div>
          <label htmlFor="payment_master_image" className="block text-sm font-medium text-gray-700 mb-1">
            Image <span className="text-red-500">*</span>
          </label>
          <input
            id="payment_master_image"
            type="file"
            name="payment_master_image"
            onChange={handleFileChange}
            className="w-full"
          />
          <div className="mt-4 bg-gray-100 h-40 w-full flex items-center justify-center">
            {formData.payment_master_image ? (
              <img
                src={URL.createObjectURL(formData.payment_master_image)}
                alt="Preview"
                className="max-h-full max-w-full object-cover"
              />
            ) : (
              <span className="text-gray-500">Preview Image</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <Button type="submit" variant="gradient" className="px-8 py-2">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRekening;
