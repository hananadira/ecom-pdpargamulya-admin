import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPembelianQuery, useDeleteProductMutation } from '../../redux/services/PembelianApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

const Pembelian = () => {
  // Fetching data pembelian
  const { data: pembelianData = [], error, isLoading } = useGetPembelianQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  // Handling error state
  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  // Handling delete action
  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      await deleteProduct(id);
    }
  };

  // Loading state
  if (isLoading) return <div className="text-center p-4">Loading...</div>;

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
              <th className="px-4 py-2 border-b">Product</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pembelianData.length > 0 ? (
              pembelianData.map((item) => (
                <tr key={item.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.username}</td>
                  <td className="px-4 py-2 border-b">{item.product}</td>
                  <td className="px-4 py-2 border-b">{item.sub_total}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <span className="material-icons">more_vert</span>
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/Pembelian/detail/${item.id}`)}>Detail</MenuItem>
                        <MenuItem onClick={() => navigate(`/Pembelian/edit/${item.id}`)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(item.id)}>Hapus</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">Tidak ada data pembelian.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Pembelian;
