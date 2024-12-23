import { useNavigate, useParams } from "react-router-dom";
import { useGetRekeningQuery } from "../../../redux/services/RekeningApi";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = [], error, isLoading } = useGetRekeningQuery(id);

  const rekening = data[0]; // Mengakses elemen pertama dari array


  // Debugging untuk memeriksa data
  console.log('Data API:', data); // Cek data yang diterima
  console.log('Error API:', error); // Cek apakah ada error
  console.log('Loading:', isLoading); // Cek status loading

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) {
    console.error('Error fetching product:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  if (!data) {
    return <div className="text-center p-4 text-red-600">Data tidak ditemukan.</div>;
  }

  // Cek struktur data
  console.log('Struktur data product:', data);

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  return (
    <div className="ml-3 p-5 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-5">
        <Button variant="text" onClick={() => navigate('/master/rekening')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Detail Rekening</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>

      <div className="flex flex-col space-y-5">
      <Card className="w-full max-w-[78rem] flex-row">
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          Rekening
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
        {rekening?.payment_method}
        </Typography>
      </CardBody>
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={rekening?.payment_master_image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
    </Card>
      </div>
    </div>
  );
};

export default DetailProduct;
