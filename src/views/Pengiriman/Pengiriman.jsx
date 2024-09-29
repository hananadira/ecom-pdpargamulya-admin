import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPengirimanQuery, useDeleteProductMutation } from '../../redux/services/PengirimanApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

const Pengiriman = () => {
  const { data: pengirimanData, error, isLoading } = useGetPengirimanQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      await deleteProduct(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mr-8 p-8">
      <Card className="h-full w-full overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Pengiriman
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => navigate('/pengiriman/create')}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pengirimanData.map((item) => (
              <tr key={item.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.user}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">
                  <Menu>
                    <MenuHandler>
                      <Button variant="text" color="blue-gray" className="flex items-center">
                        <span className="material-icons">more_vert</span>
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={() => navigate(`/pengiriman/detail/${item.id}`)}>Detail</MenuItem>
                      <MenuItem onClick={() => navigate(`/pengiriman/edit/${item.id}`)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(item.id)}>Hapus</MenuItem>
                    </MenuList>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Pengiriman;
