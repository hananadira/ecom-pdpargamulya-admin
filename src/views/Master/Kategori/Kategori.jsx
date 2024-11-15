import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetKategoriesQuery, useDeleteKategoriMutation } from '../../../redux/services/ProductApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Kategori = () => {
  const { data, error, isLoading } = useGetKategoriesQuery();
  const [deleteKategori, { isLoading: isDeleting }] = useDeleteKategoriMutation();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      try {
        await deleteKategori(id).unwrap();
        console.log('Data berhasil dihapus');
      } catch (err) {
        console.error('Error saat menghapus:', err);
        if (err.data) {
          console.error('Detail error dari server:', err.data.message || "Error detail tidak tersedia");
          alert(`Gagal menghapus data: ${err.data.message || "Error detail tidak tersedia"}`);
        } else {
          alert("Gagal menghapus data. Silakan coba lagi.");
        }
      }
    }
  };

  // Loading state
  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  // Cek jika ada error
  if (error) {
    console.error('Error fetching categories:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  const indexOfLastKategori = currentPage * itemsPerPage;
  const indexOfFirstKategori = indexOfLastKategori - itemsPerPage;
  const currentKategori = data.slice(indexOfFirstKategori, indexOfLastKategori);
  const totalPages = Math.ceil(data.length / itemsPerPage);


  // Render the table
  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Kategori
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => navigate('/master/kategori/create')}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">Nama Kategori</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentKategori.length > 0 ? (
              currentKategori.map((category, index) => (
                <tr key={category.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{category.name_category}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/master/kategori/detail/${category.id}`)}>Detail</MenuItem>
                        <MenuItem onClick={() => navigate(`/master/kategori/edit/${category.id}`)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(category.id)} disabled={isDeleting}>
                          Delete
                        </MenuItem>
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

export default Kategori;
