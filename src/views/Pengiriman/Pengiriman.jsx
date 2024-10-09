// src/components/Pengiriman.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPengirimanQuery, useDeletePengirimanMutation } from '../../redux/services/PengirimanApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

const Pengiriman = () => {
  const { data: pengirimanApi = [], error, isLoading } = useGetPengirimanQuery();
  const [deletePengiriman] = useDeletePengirimanMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      await deletePengiriman(id);
    }
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Pengiriman
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => navigate('/Pengiriman/create')}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Alamat</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pengirimanApi.length > 0 ? (
              pengirimanApi.map((item) => (
                <tr key={item.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.username}</td>
                  <td className="px-4 py-2 border-b">{item.alamat}</td>
                  <td className="px-4 py-2 border-b">{item.status}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <span className="material-icons">more_vert</span>
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/Pengiriman/edit/${item.id}`)}>Edit</MenuItem>
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

export default Pengiriman;
