import { useState } from 'react';
import { useCreateMasterPengirimanMutation } from '../../../redux/services/PengirimanApi';
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddMasterPengiriman = () => {
  const [formData, setFormData] = useState({
    city: '',
    cost: '',
  });
  const [createRekening] = useCreateMasterPengirimanMutation();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    // Handle file input change
    // const handleFileChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //       const file = e.target.files[0];
    //     //   const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
    //     //   if (validTypes.includes(file.type)) {
    //     //     setFormData({ ...formData, cost: file });
    //     //   } else {
    //     //     alert('Tipe file tidak valid. Harap unggah file gambar (jpeg, png, jpg, svg, gif).');
    //     //   }
    //     }
    //   };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rekeningPayload = new FormData();
      rekeningPayload.append('city', formData.city);
      rekeningPayload.append('cost', formData.cost);

      await createRekening(rekeningPayload).unwrap();
      navigate('/master/pengiriman');
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
        <Button variant="text" onClick={() => navigate('/master/pengiriman')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Tambah Pengiriman</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Kota <span className="text-red-500">*</span>
          </label>
          <Input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Masukan Nama Kota"
            className="w-full"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
            Harga Pengiriman <span className="text-red-500">*</span>
          </label>
          <Input
            id="cost"
            type="text"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Masukan Harga"
            className="w-full"
          />
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

export default AddMasterPengiriman;
