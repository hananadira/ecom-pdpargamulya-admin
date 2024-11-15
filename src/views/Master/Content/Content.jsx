import { useNavigate } from "react-router-dom";
import { useGetContentsQuery, useDeleteContentMutation } from '../../../redux/services/TampilanApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

const Content = () => {
  const { data, error, isLoading } = useGetContentsQuery();
  const [deleteContent] = useDeleteContentMutation();
  const navigate = useNavigate();

  // Debugging untuk melihat state
  console.log('Data Content:', data); // Memeriksa data

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      try {
        await deleteContent(id);
        console.log('Data berhasil dihapus');
      } catch (err) {
        console.error('Error saat menghapus:', err);
      }
    }
  };

  // Loading state
  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  // Cek jika ada error
  if (error) {
    console.error('Error fetching pembelian:', error); // Menangani error
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  // Render the table
  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Content
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => navigate('/pembelian/create')}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data && data.data.length > 0 ? (
              data.data.map((content) => (
                <tr key={content.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{content.id}</td>
                  <td className="px-4 py-2 border-b">{content.title}</td>
                  <td className="px-4 py-2 border-b max-w-xs whitespace-normal">{content.description}</td> {/* Update here */}
                  <td className="px-4 py-2 border-b">{content.status}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <span className="material-icons">more_vert</span>
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/pembelian/detail/${content.id}`)}>Detail</MenuItem>
                        <MenuItem onClick={() => handleDelete(content.id)}>Delete</MenuItem>
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

export default Content;
