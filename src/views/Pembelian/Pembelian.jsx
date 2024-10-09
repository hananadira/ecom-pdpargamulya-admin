// src/components/Pembelian.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPembelianQuery, useDeletePembelianMutation } from '../../redux/services/PembelianApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

const Pembelian = () => {
  const { data: pembelianApi = [], error, isLoading } = useGetPembelianQuery();
  const [deletePembelian] = useDeletePembelianMutation();
  const navigate = useNavigate();

  // Debugging untuk melihat state
  useEffect(() => {
    dispatch(useGetPembelianQuery());
  }, [dispatch]);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      await deletePembelian(id);
    }
  };

  // Loading state
  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  // Cek jika ada error
  if (error) {
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  // Render the table
  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Pembelian
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => navigate('/Pembelian/create')}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Produk</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pembelianApi.length > 0 ? (
              pembelianApi.map((item) => (
                <tr key={item.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.order_id}</td>
                  <td className="px-4 py-2 border-b">{item.product_id}</td>
                  <td className="px-4 py-2 border-b">{item.sub_total}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <span className="material-icons">more_vert</span>
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/Pembelian/edit/${item.id}`)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(item.id)}>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Pembelian;
