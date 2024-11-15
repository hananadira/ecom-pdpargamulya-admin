import { useState, useEffect } from 'react';
import { useUpdateRekeningMutation, useGetRekeningQuery } from '../../../redux/services/RekeningApi';
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EditRekening = () => {
  const { id } = useParams(); // Mengambil ID dari parameter URL
  const [formData, setFormData] = useState({
    payment_method: '',
    payment_master_image: '',
  });
  const { data: rekeningData } = useGetRekeningQuery(id); // Mendapatkan data rekening berdasarkan ID
  const [updateRekening] = useUpdateRekeningMutation(); // Fungsi untuk mengupdate rekening
  const navigate = useNavigate();

  // Isi formulir dengan data rekening yang diambil
  useEffect(() => {
    if (rekeningData) {
      setFormData({
        payment_method: rekeningData.payment_method,
        payment_master_image: rekeningData.payment_master_image,
      });
    }
  }, [rekeningData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (validTypes.includes(file.type)) {
        setFormData({ ...formData, payment_master_image: file });
      } else {
        alert('Tipe file tidak valid. Harap unggah file gambar (jpeg, png, jpg, svg, gif).');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rekeningPayload = {
        id,
        payment_method: formData.payment_method,
        payment_master_image: formData.payment_master_image,
      };

      await updateRekening(rekeningPayload).unwrap();
      navigate('/master/rekening');
    } catch (err) {
      console.error('Error saat memperbarui data:', err);
    }
  };

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="flex items-center mb-5">
        <Button variant="text" onClick={() => navigate('/master/rekening')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Edit Rekening</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Rekening */}
        <div>
          <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Rekening <span className="text-red-500">*</span>
          </label>
          <Input
            id="payment_method"
            type="text"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            placeholder="Masukan rekening"
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
                  src={formData.payment_master_image instanceof File ? URL.createObjectURL(formData.payment_master_image) : formData.payment_master_image}
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditRekening;
