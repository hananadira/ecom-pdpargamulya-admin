import React, { useState } from "react"; // Add useState here
import { useNavigate } from "react-router-dom";
import { useGetMasterPengirimansQuery, useDeleteMasterPengirimanMutation } from '../../../redux/services/PengirimanApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Pengiriman = () => {
  const { data, error, isLoading } = useGetMasterPengirimansQuery();
  const [deletePengiriman] = useDeleteMasterPengirimanMutation();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debugging untuk melihat state
  console.log('Data User:', data);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data?")) {
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
    console.error('Error fetching masterPengiriman:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Master Pengiriman
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => navigate('/master/pengiriman/create')}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">Nama Kota</th>
              <th className="px-4 py-2 border-b">Biaya</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((masterPengiriman, index) => (
                <tr key={masterPengiriman.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{indexOfFirstUser + index + 1}</td>
                  <td className="px-4 py-2 border-b">{masterPengiriman.city}</td>
                  <td className="px-4 py-2 border-b">{masterPengiriman.cost}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/master/pengiriman/detail/${masterPengiriman.id}`)}>Detail</MenuItem>
                        <MenuItem onClick={() => navigate(`/master/pengiriman/edit/${masterPengiriman.id}`)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(masterPengiriman.id)}>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
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
