import { useState, useEffect } from 'react';
import { useUpdateKategoriMutation, useGetKategoriQuery } from '../../../redux/services/ProductApi';
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EditKategori = () => {
  const { id } = useParams(); // Mengambil ID dari parameter URL
  const [formData, setFormData] = useState({
    name_category: '',
  });
  const { data: kategoriData } = useGetKategoriQuery(id); // Mendapatkan data kategori berdasarkan ID
  const [updateKategori] = useUpdateKategoriMutation(); // Fungsi untuk mengupdate kategori
  const navigate = useNavigate();

  // Isi formulir dengan data kategori yang diambil
  useEffect(() => {
    if (kategoriData) {
      setFormData({
        name_category: kategoriData.name_category,
      });
    }
  }, [kategoriData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const kategoriPayload = {
        id,
        name_category: formData.name_category,
      };

      await updateKategori(kategoriPayload).unwrap();
      navigate('/master/kategori');
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
        <Button variant="text" onClick={() => navigate('/master/kategori')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Edit Kategori</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Kategori */}
        <div>
          <label htmlFor="name_category" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Kategori <span className="text-red-500">*</span>
          </label>
          <Input
            id="name_category"
            type="text"
            name="name_category"
            value={formData.name_category}
            onChange={handleChange}
            placeholder="Masukan kategori"
            className="w-full"
          />
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

export default EditKategori;
