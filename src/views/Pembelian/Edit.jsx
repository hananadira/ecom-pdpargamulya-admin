// src/components/EditPembelian.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPembelianQuery, useUpdatePembelianMutation } from '../../redux/services/PembelianApi';
import { Button, TextInput } from '@material-tailwind/react';

const EditPembelian = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: pembelian, error, isLoading } = useGetPembelianQuery();
  const [updatePembelian] = useUpdatePembelianMutation();
  
  const [username, setUsername] = useState('');
  const [product, setProduct] = useState('');
  const [sub_total, setSubTotal] = useState('');

  useEffect(() => {
    if (pembelian) {
      const selectedPembelian = pembelian.find(item => item.id === parseInt(id));
      if (selectedPembelian) {
        setUsername(selectedPembelian.username);
        setProduct(selectedPembelian.product);
        setSubTotal(selectedPembelian.sub_total);
      }
    }
  }, [pembelian, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePembelian({ id, username, product, sub_total });
    navigate('/Pembelian');
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <TextInput
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextInput
        label="Product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        required
      />
      <TextInput
        label="Total"
        value={sub_total}
        onChange={(e) => setSubTotal(e.target.value)}
        required
      />
      <Button type="submit" variant="gradient">Simpan Perubahan</Button>
    </form>
  );
};

export default EditPembelian;
