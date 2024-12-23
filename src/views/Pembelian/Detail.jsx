import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import dispatch
import { useGetPembelianQuery } from "../../redux/services/PembelianApi"; // Import hook untuk mengambil data pembelian
import { useGetPaymentQuery } from "../../redux/services/PaymentApi"; // Hook untuk data pembayaran
import { useSetLaporansSetujuMutation, useSetLaporansTolakMutation } from "../../redux/services/LaporanApi";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { removePembelianData } from '../../redux/slice/PembelianSlice'; // Import aksi penghapusan

const DetailPembelian = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Menggunakan dispatch dari Redux
  const { data, error, isLoading } = useGetPembelianQuery(id);
  const { data: paymentData, error: paymentError, isLoading: isLoadingPayment } = useGetPaymentQuery(id);
  const [setStatusBerhasil] = useSetLaporansSetujuMutation();  
  const [setStatusGagal] = useSetLaporansTolakMutation();  

  // Debugging untuk memeriksa data
  console.log('Data Pembelian:', data);
  console.log('Data Pembayaran:', paymentData);

  // Handling loading, error, dan tidak ada data
  if (isLoading || isLoadingPayment) return <div className="text-center p-4">Loading...</div>;
  if (error || paymentError) {
    console.error('Error fetching data:', error || paymentError);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  if (!data || !paymentData) {
    return <div className="text-center p-4 text-red-600">Data tidak ditemukan.</div>;
  }

  // Fungsi format tanggal
  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  // Fungsi untuk menghapus data dan mengarahkan halaman berdasarkan Accepted
  const handleAccepted = async (id) => {
    try {
      await setStatusBerhasil(id).unwrap();
      dispatch(removePembelianData(id)); // Hapus data di Redux
      navigate('/pengiriman');
      setTimeout(() => {
        navigate('/laporan/konfirmasi');
      }, 800);
    } catch (error) {
      console.error('Gagal mengupdate status:', error);
      alert('Terjadi kesalahan saat mengupdate status.');
    }
  };

  const handleRejected = async (id) => {
    try {
      await setStatusGagal(id).unwrap();
      dispatch(removePembelianData(id)); // Hapus data di Redux
      navigate('/pengiriman');
      setTimeout(() => {
        navigate('/laporan/batalkan');
      }, 800);
    } catch (error) {
      console.error('Gagal mengupdate status:', error);
      alert('Terjadi kesalahan saat mengupdate status.');
    }
  };

  return (
    <div className="ml-3 p-5 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-5">
        <Button
          variant="text"
          onClick={() => navigate('/pembelian')}
          className="material-icons mr-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">
          Detail Pembelian
        </Typography>
        <Typography className="ml-auto text-gray-500">
          {formatDate()}
        </Typography>
      </div>

      <div className="flex flex-col space-y-5">
        <Card className="w-full">
          <CardBody className="flex items-center">
            <img
              src={data.user.image}
              alt="Profile"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {data.user.username}
              </Typography>
              <Typography>{data.user.role}</Typography>
            </div>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Detail Produk
            </Typography>

            {data.order_detail.map((detail, index) => (
              <div key={detail.id} className="mb-6 border-b pb-4">
                <Typography variant="h6" className="font-bold mb-2">
                  Produk #{index + 1}
                </Typography>

                <div className="flex items-center mb-4">
                  <img
                    src={detail.product?.photo_product || "https://via.placeholder.com/150"}
                    alt={detail.product?.name_product || "Produk"}
                    className="w-20 h-20 rounded-lg mr-4"
                  />
                  <div>
                    <Typography variant="h6">{detail.product?.name_product || "Produk Tidak Diketahui"}</Typography>
                    <Typography>Deskripsi: {detail.product?.description || "Tidak Ada Deskripsi"}</Typography>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Typography className="text-gray-500">Jumlah</Typography>
                    <Typography className="font-bold">{detail.quantity}</Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-500">Harga Satuan</Typography>
                    <Typography className="font-bold">Rp{Number(detail.price_unit).toLocaleString('id-ID')}</Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-500">Total Harga</Typography>
                    <Typography className="font-bold">Rp{Number(detail.sub_total).toLocaleString('id-ID')}</Typography>
                  </div>
                  <div>
                    <Typography className="text-gray-500">Bukti Pembayaran</Typography>
                    <img
                      src={paymentData.payment_image || "https://via.placeholder.com/150"}
                      alt="Bukti Pembayaran"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button color="green" onClick={() => handleAccepted(id)}>Accepted</Button>
          <Button color="red" onClick={() => handleRejected(id)}>Rejected</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPembelian;
