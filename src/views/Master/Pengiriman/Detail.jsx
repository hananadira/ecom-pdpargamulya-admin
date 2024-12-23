import { useNavigate, useParams } from "react-router-dom";
import { useGetMasterPengirimanQuery } from "../../../redux/services/PengirimanApi";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const DetailPengiriman = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMasterPengirimanQuery(id);

  // Debugging untuk memeriksa data
  console.log('Data API:', data); // Cek data yang diterima
  console.log('Error API:', error); // Cek apakah ada error
  console.log('Loading:', isLoading); // Cek status loading

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) {
    console.error('Error fetching data:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  if (!data) {
    return <div className="text-center p-4 text-red-600">Data tidak ditemukan.</div>;
  }

  // Cek struktur data pengiriman
  console.log('Struktur data pengiriman:', data);

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="ml-3 p-5 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-5">
        <Button variant="text" onClick={() => navigate('/master/pengiriman')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Detail Pengiriman</Typography>
        <Typography className="ml-auto text-gray-500">
          {formatDate(data.shipping_date)} {/* Menampilkan tanggal pengiriman */}
        </Typography>
      </div>

      <div className="flex flex-col space-y-5">
        <Card className="w-full max-w-[78rem] flex-row">
          <CardBody>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              Pengiriman
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2 ml-3">
              Kota: {data.cost ? `${data.city}` : 'Kota Tidak Tersedia'}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2 ml-3">
              Biaya Pengiriman: {data.cost ? `Rp ${data.cost}` : 'Biaya tidak tersedia'}
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DetailPengiriman;
