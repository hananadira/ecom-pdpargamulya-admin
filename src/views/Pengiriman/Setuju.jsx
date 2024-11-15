import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPengirimansQuery, useDeletePengirimanMutation } from '../../redux/services/PengirimanApi';
import { Card, CardHeader, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'; // Import ikon yang benar
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const Pengiriman = () => {
  const { data, error, isLoading } = useGetPengirimansQuery();
  const [deletePengiriman] = useDeletePengirimanMutation();
  const navigate = useNavigate();

  // Debugging untuk melihat state
  console.log('Data Pengiriman:', data); // Memeriksa data

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      try {
        await deletePengiriman(id);
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
    console.error('Error fetching pengiriman:', error); // Menangani error
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  const indexOfLastPengiriman = currentPage * itemsPerPage;
  const indexOfFirstPengiriman = indexOfLastPengiriman - itemsPerPage;
  const currentPengiriman = data.slice(indexOfFirstPengiriman, indexOfLastPengiriman);
  const totalPages = Math.ceil(data.length / itemsPerPage);


  // Render the table
  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
      <CardHeader floated={false} shadow={false} className="rounded-none mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              View All
            </Button>
            <Button className="flex items-center gap-2" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Member
            </Button>
          </div>
        </div>

        {/* Mengganti Tabs dengan tombol untuk navigasi */}
        <div className="flex gap-4 mt-6">
          <Button onClick={() => handleNavigation("pengiriman")} variant="outlined" size="sm">
            Data
          </Button>
          <Button onClick={() => handleNavigation("pengiriman/selesai")} variant="outlined" size="sm">
            Selesai
          </Button>
        </div>
      </CardHeader>

        {/* <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Pengiriman
          </Typography>
          {/* <Button variant="gradient" size="sm" onClick={() => navigate('/pengiriman/create')}>
            Tambah Data
          </Button> 
        </div> */}
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPengiriman.length > 0 ? (
              currentPengiriman.map((pengiriman, index) => (
                <tr key={pengiriman.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{pengiriman.username}</td>
                  <td className="px-4 py-2 border-b">{pengiriman.status}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" /> {/* Gunakan FontAwesomeIcon */}
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/pengiriman/detail/${pengiriman.id}`)}>Detail</MenuItem>
                        <MenuItem onClick={() => handleDelete(pengiriman.id)}>Delete</MenuItem>
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
        <div className="flex justify-between items-center mt-4">
          <Button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            Sebelumnya
          </Button>
          <Typography>{`Halaman ${currentPage} dari ${totalPages}`}</Typography>
          <Button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            Berikutnya
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Pengiriman;
