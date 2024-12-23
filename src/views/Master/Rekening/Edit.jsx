import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useGetRekeningQuery, useUpdateRekeningMutation } from '../../../redux/services/RekeningApi';
import { Button, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EditRekening = () => {
  const { id } = useParams(); // Get the rekening ID from the URL
  const { data: rekening, error, isLoading } = useGetRekeningQuery(id); // Fetch user data
  const [updateRekening] = useUpdateRekeningMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    payment_method: '',
    payment_master_image: null,
  });

  // Populate formData with rekening data if available
  useEffect(() => {
    if (rekening) {
      setFormData({
        payment_method: rekening.payment_method || '',
        payment_master_image: null,
      });
    }
  }, [rekening]);

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
        setFormData((prevData) => ({ ...prevData, payment_master_image: file }));
      } else {
        alert('Tipe file tidak valid. Harap unggah file gambar (jpeg, png, jpg, svg, gif).');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rekeningPayload = new FormData();
      rekeningPayload.append('payment_method', formData.payment_method);
      rekeningPayload.append('payment_master_image', formData.payment_master_image);

      await updateRekening({ id, ...formData }).unwrap(); // Update the rekening
      navigate('/master/rekening'); // Redirect to rekening list after successful update
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
        <Button variant="text" onClick={() => navigate('/master/rekening')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Edit Metode Pembayaran</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>
        
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Left Column - Username, Email, Password, etc */}
        <div className="space-y-4">
          {/* payment_method */}
          <div>
            <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Metode Pembayaran {/*<span className="text-red-500">*</span>*/}
            </label>
            <Input
              id="payment_method"
              type="text"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              placeholder="Masukan nama metoe pembayaran"
              className="w-full"
            />
          </div>

          {/* Payment_master_image */}
          <div>
            <label htmlFor="payment_master_image" className="block text-sm font-medium text-gray-700 mb-1">
              Gambar Metode Pembayaran {/* <span className="text-red-500">*</span> */}
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

export default EditRekening;
