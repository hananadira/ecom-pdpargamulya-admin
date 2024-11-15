import { useNavigate, useParams } from "react-router-dom";
import { useGetKategoriQuery } from "../../../redux/services/ProductApi";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const DetailKategori = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetKategoriQuery(id);

  // Debugging untuk memeriksa data
  console.log('Data API:', data); // Cek data yang diterima
  console.log('Error API:', error); // Cek apakah ada error
  console.log('Loading:', isLoading); // Cek status loading

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) {
    console.error('Error fetching user:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  if (!data) {
    return <div className="text-center p-4 text-red-600">Data tidak ditemukan.</div>;
  }

  // Cek struktur data
  console.log('Struktur data user:', data);

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  return (
    <div className="ml-3 p-5 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-5">
        <Button variant="text" onClick={() => navigate('/master/kategori')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Detail Kategori</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>

      <div className="flex flex-col space-y-5">
        <Card className="w-full">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Information
            </Typography>

            <div className="flex items-center mb-2">
              <div className="flex-1">
                <Typography>Name</Typography>
                <Typography className='font-bold'>{data.name_category || "Unknown"}</Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DetailKategori;
