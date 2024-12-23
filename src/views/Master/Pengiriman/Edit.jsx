import { useState, useEffect } from 'react';
import { useUpdateMasterPengirimanMutation, useGetMasterPengirimanQuery } from '../../../redux/services/PengirimanApi';
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EditMasterPengiriman = () => {
  const { id } = useParams(); // Mengambil ID dari parameter URL
  const [formData, setFormData] = useState({
    payment_method: '',
    payment_master_image: '',
  });
  const { data: masterPengirimanData } = useGetMasterPengirimanQuery(id); // Mendapatkan data rekening berdasarkan ID
  const [updateMasterPengiriman] = useUpdateMasterPengirimanMutation(); // Fungsi untuk mengupdate rekening
  const navigate = useNavigate();

  // Isi formulir dengan data rekening yang diambil
  useEffect(() => {
    if (masterPengirimanData) {
      setFormData({
        city: masterPengirimanData.city,
        cost: masterPengirimanData.cost,
      });
    }
  }, [masterPengirimanData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const masterPengirimanPayload = {
        id,
        cost: formData.cost,
        city: formData.city,
      };

      await updateMasterPengiriman(masterPengirimanPayload).unwrap();
      navigate('/master/pengiriman');
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
        <Button variant="text" onClick={() => navigate('/master/pengiriman')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Edit Master Pengiriman</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Biaya Pengiriman */}
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
            Biaya Pengiriman <span className="text-red-500">*</span>
          </label>
          <Input
            id="cost"
            type="text"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Masukan biaya pengiriman"
            className="w-full"
          />
        </div>

        {/* Biaya Pengiriman */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Kota <span className="text-red-500">*</span>
          </label>
          <Input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Masukan kota"
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

export default EditMasterPengiriman;