import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRekeningsQuery, useDeleteRekeningMutation } from '../../../redux/services/RekeningApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Rekening = () => {
  const { data, error, isLoading } = useGetRekeningsQuery();
  const [deleteRekening] = useDeleteRekeningMutation();
  const navigate = useNavigate();

  // State lokal untuk menyimpan data rekening
  const [rekeningList, setRekeningList] = useState([]);

  // Mengupdate state rekeningList ketika data dari API tersedia
  useEffect(() => {
    if (data) {
      setRekeningList(data.data); // Assuming data.data contains the array
    }
  }, [data]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      try {
        await deleteRekening(id);
        // Mengupdate state lokal dengan menyaring rekening yang sudah dihapus
        setRekeningList((prevList) => prevList.filter((rekening) => rekening.id !== id));
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
    console.error('Error fetching rekening:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  // Pagination logic
  const indexOfLastRekening = currentPage * itemsPerPage;
  const indexOfFirstRekening = indexOfLastRekening - itemsPerPage;
  const currentRekening = rekeningList.slice(indexOfFirstRekening, indexOfLastRekening);
  const totalPages = Math.ceil(rekeningList.length / itemsPerPage);

  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Rekening
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => navigate('/master/rekening/create')}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">Metode</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRekening.length > 0 ? (
              currentRekening.map((rekening, index) => (
                <tr key={rekening.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{indexOfFirstRekening + index + 1}</td>
                  <td className="px-4 py-2 border-b">{rekening.payment_method}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                  <div className="flex flex-row items-center">
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center p-1"
                        onClick={() => navigate(`/master/rekening/detail/${rekening.id}`)}
                      >
                        <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center p-4"
                        onClick={() => navigate(`/master/rekening/edit/${rekening.id}`)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center p-1"
                        onClick={() => handleDelete(rekening.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                      </Button>
                    </div>
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

export default Rekening;
