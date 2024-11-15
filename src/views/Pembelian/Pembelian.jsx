import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPembeliansQuery, useDeletePembelianMutation } from '../../redux/services/PembelianApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Pembelian = () => {
  const { data, error, isLoading } = useGetPembeliansQuery();
  const [deletePembelian] = useDeletePembelianMutation();
  const navigate = useNavigate();

  console.log('Data Pembelian:', data); 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      try {
        await deletePembelian(id);
        console.log('Data berhasil dihapus');
      } catch (err) {
        console.error('Error saat menghapus:', err);
      }
    }
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  if (error) {
    console.error('Error fetching pembelian:', error); 
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  const indexOfLastPembelian = currentPage * itemsPerPage;
  const indexOfFirstPembelian = indexOfLastPembelian - itemsPerPage;
  const currentPembelian = data.slice(indexOfFirstPembelian, indexOfLastPembelian);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Pembelian
          </Typography>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Produk</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPembelian.length > 0 ? (
              currentPembelian.map((pembelian, index) =>
                pembelian.order_detail.map((detail, detailIndex) => (
                  <tr key={detail.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                    <td className="px-4 py-2 border-b">{index * itemsPerPage + detailIndex + 1}</td>
                    <td className="px-4 py-2 border-b">{pembelian.user?.username || 'N/A'}</td>
                    <td className="px-4 py-2 border-b">{detail.product?.name_product || 'N/A'}</td>
                    <td className="px-4 py-2 border-b">{detail.sub_total || 'N/A'}</td>
                    <td className="px-4 py-2 border-b">
                      <Menu>
                        <MenuHandler>
                          <Button variant="text" color="blue-gray" className="flex items-center">
                            <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
                          </Button>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem onClick={() => navigate(`/pembelian/detail/${detail.id}`)}>Detail</MenuItem>
                          <MenuItem onClick={() => handleDelete(detail.id)}>Delete</MenuItem>
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                ))
              )
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

export default Pembelian;
