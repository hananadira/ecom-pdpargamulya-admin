import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useGetLaporansSetujuQuery, useDeleteLaporanMutation } from "../../redux/services/LaporanApi";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LaporanSetuju = () => {
  const { data, error, isLoading } = useGetLaporansSetujuQuery();
  const [deleteLaporan] = useDeleteLaporanMutation();
  const navigate = useNavigate();

  // Debugging untuk melihat state
  console.log('Data Laporan:', data); // Memeriksa data

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      try {
        await deleteLaporan(id);
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
    console.error('Error fetching laporan:', error); // Menangani error
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  // Pastikan data adalah array sebelum memanggil slice
  const laporanData = Array.isArray(data) ? data : [];
  const indexOfLastLaporan = currentPage * itemsPerPage;
  const indexOfFirstLaporan = indexOfLastLaporan - itemsPerPage;
  const currentLaporan = laporanData.slice(indexOfFirstLaporan, indexOfLastLaporan);
  const totalPages = Math.ceil(laporanData.length / itemsPerPage);

  return (
    <Card className="container mx-auto p-6 md:p-8">
      <CardHeader floated={false} shadow={false} className="rounded-none mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Laporan List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about report received
            </Typography>
          </div>
          {/* <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              View All
            </Button>
            <Button className="flex items-center gap-2" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Member
            </Button>
          </div> */}
        </div>

        {/* Mengganti Tabs dengan tombol untuk navigasi */}
        <div className="flex gap-4 mt-6">
          <Button onClick={() => navigate("/laporan")} size="sm">
            Laporan
          </Button>
          <Button onClick={() => navigate("/laporan/konfirmasi")}  size="sm" className="bg-green-500">
            Konfirmasi
          </Button>
          <Button onClick={() => navigate("/laporan/batalkan")} size="sm" className="bg-red-500">
            Batalkan
          </Button>
        </div>
      </CardHeader>

      {/* Tabel untuk menampilkan data berdasarkan tab */}
      <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-gray-100">
            <th className="px-4 py-2 border-b">No</th>
            <th className="px-4 py-2 border-b">Username</th>
            <th className="px-4 py-2 border-b">No Order</th>
            <th className="px-4 py-2 border-b">Total</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLaporan.length > 0 ? (
            currentLaporan.map((data, index) => (
              <tr key={data.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                <td className="px-4 py-2 border-b">{indexOfFirstLaporan + index + 1}</td>
                <td className="px-4 py-2 border-b">{data.user.username}</td>
                <td className="px-4 py-2 border-b">{data.no_ref_order}</td>
                <td className="px-4 py-2 border-b">{data.total_amount}</td>
                <td className="px-4 py-2 border-b">
                  <Menu>
                    <MenuHandler>
                      <Button variant="text" color="blue-gray" className="flex items-center">
                        <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={() => navigate(`/laporan/detail/${data.id}`)}>Detail</MenuItem>
                      <MenuItem onClick={() => handleDelete(data.id)}>Delete</MenuItem>
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
  );
};

export default LaporanSetuju;
