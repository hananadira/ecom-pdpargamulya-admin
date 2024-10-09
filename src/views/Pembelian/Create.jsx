// src/components/TambahPembelian.js
import React, { useState } from 'react';
import { useCreatePembelianMutation } from '../../redux/services/PembelianApi';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from '@material-tailwind/react';

const TambahPembelian = () => {
  const [username, setUsername] = useState('');
  const [product, setProduct] = useState('');
  const [sub_total, setSubTotal] = useState('');
  const navigate = useNavigate();
  const [createPembelian] = useCreatePembelianMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPembelian({ username, product, sub_total });
    navigate('/pembelian'); // Kembali ke daftar setelah menambah data
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <TextInput
        label="Username"
        value={order_id.user.username}
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
      <Button type="submit" variant="gradient">Tambah Data</Button>
    </form>
  );
};

export default TambahPembelian;
