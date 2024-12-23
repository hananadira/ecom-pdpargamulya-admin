import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPengirimansQuery, useDeletePengirimanMutation, 
        useGetPengirimanQuery, useUpdateStatusKirimMutation, useUpdateStatusSampaiMutation
      } from '../../redux/services/PengirimanApi';
import { Card, CardHeader, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const Pengiriman = () => {
  const { data: pengirimansData, error: pengirimansError, isLoading: isPengirimansLoading } = useGetPengirimansQuery();
  const { data: pengirimanData, error: pengirimanError, isLoading: isPengirimanLoading } = useGetPengirimanQuery();
  const [deletePengiriman] = useDeletePengirimanMutation();
  const [updateStatusKirim] = useUpdateStatusKirimMutation();
  const [updateStatusSampai] = useUpdateStatusSampaiMutation();

  const navigate = useNavigate();

  // Debugging untuk melihat state
  console.log('Data Pengiriman:', pengirimansData);

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

  // Fungsi handleNavigation untuk navigasi halaman
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Contoh penggunaan data dan error masing-masing
  if (isPengirimansLoading || isPengirimanLoading) {
    return <p>Loading...</p>;
  }

  if (pengirimansError) {
    console.error("Error in pengirimans:", pengirimansError);
  }

  if (pengirimanError) {
    console.error("Error in pengiriman:", pengirimanError);
  }

  const getButtonText = (status) => {
    switch (status) {
      case '-':
        return 'Disiapkan';
      case 'disiapkan':
        return 'Dalam Perjalanan';
      case 'dalam perjalanan':
        return 'Sudah Sampai';
      default:
        return 'Update Status';
    }
  };

  const handleButtonClick = async (id, status) => {
    try {
      let newStatus = '';
  
      // Tentukan status baru berdasarkan status saat ini
      if (status === '-') newStatus = 'disiapkan';
      else if (status === 'disiapkan') newStatus = 'dalam perjalanan';
      else if (status === 'dalam perjalanan') newStatus = 'sudah sampai';
  
      if (newStatus) {
        console.log('Updating status to:', newStatus);
  
        // Update status sesuai dengan status yang diubah
        let response;
        if (newStatus === 'disiapkan') {
          // Panggil updateStatusKirim jika status yang diubah adalah disiapkan atau dalam perjalanan
          response = await updateStatusKirim({ id, updatedStatusKirim: newStatus }).unwrap();
        } else if (newStatus === 'dalam perjalanan' || newStatus === 'sudah sampai') {
          // Panggil updateStatusSampai jika status yang diubah adalah sudah sampai
          response = await updateStatusSampai({ id, updateStatusSampai: newStatus }).unwrap();
        }
  
        console.log('Response:', response);
  
        // Validasi apakah update berhasil
        if (response?.success) {
          alert('Status berhasil diperbarui!');
        } else {
          throw new Error('Update status gagal di backend');
        }
      } else {
        alert('Status tidak valid.');
      }
    } catch (error) {
      console.error('Gagal memperbarui status:', error);
      alert('Terjadi kesalahan saat memperbarui status.');
    }
  };
  

  const indexOfLastPengiriman = currentPage * itemsPerPage;
  const indexOfFirstPengiriman = indexOfLastPengiriman - itemsPerPage;
  const currentPengiriman = pengirimansData && pengirimansData.length > 0
    ? pengirimansData.slice(indexOfFirstPengiriman, indexOfLastPengiriman)
    : [];
  
  const totalPages = pengirimansData ? Math.ceil(pengirimansData.length / itemsPerPage) : 0;

  // Render the table
  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <CardHeader floated={false} shadow={false} className="rounded-none mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <div>
              <Typography variant="h5" color="blue-gray">
                Pengiriman List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all pengiriman
              </Typography>
            </div>
          </div>

          {/* Mengganti Tabs dengan tombol untuk navigasi */}
          <div className="flex gap-4 mt-6">
            {/* <Button onClick={() => handleNavigation("/pengiriman")} size="sm">
              Data
            </Button> */}
            {/* <Button onClick={() => handleNavigation("/pengiriman/selesai")} size="sm" className="bg-green-500">
              Selesai
            </Button> */}
          </div>
        </CardHeader>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">No. Ref</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPengiriman.length > 0 ? (
              currentPengiriman
                .filter((pengiriman) => pengiriman.shipping?.shipping_status !== 'sudah sampai') // Menyaring data dengan status 'sudah sampai'
                .map((pengiriman, index) => (
                  <tr key={pengiriman.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{pengiriman.no_ref_order}</td>
                    <td className="px-4 py-2 border-b">{pengiriman.shipping?.shipping_status}</td>
                    <td className="px-4 py-2 border-b">
                      <Menu>
                        <MenuHandler>
                          <Button variant="text" color="blue-gray" className="flex items-center">
                            <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
                          </Button>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem>
                            <Button 
                              color="blue" 
                              onClick={() => handleButtonClick(pengiriman.id, pengiriman.shipping?.shipping_status)}
                            >
                              {getButtonText(pengiriman.shipping?.shipping_status)}
                            </Button>
                          </MenuItem>
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
