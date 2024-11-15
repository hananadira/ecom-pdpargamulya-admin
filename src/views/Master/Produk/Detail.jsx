import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../../redux/services/ProductApi";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductQuery(id);

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
        <Button variant="text" onClick={() => navigate('/master/produk')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Detail Produk</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>

      <div className="flex flex-col space-y-5">
      <Card className="w-full max-w-[78rem] flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={data.photo_product}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          Description
        </Typography>
        {/* <Typography variant="h4" color="blue-gray" className="mb-2">
          Lyft launching cross-platform service this week
        </Typography> */}
        <Typography color="gray" className="mb-8 font-normal">
          {data.description}
        </Typography>
        {/* <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a> */}
      </CardBody>
    </Card>

    {/* <Card className="w-full"> */}
          {/* <CardBody> */}
            <Typography variant="h5" color="blue-gray" className="mb-2 ml-3">
              {data.name_product}
            </Typography>
           {/* </CardBody> */}
    {/* </Card> */}

    <Card className="w-full">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {data.price}
            </Typography>
          </CardBody>
    </Card>
      </div>
    </div>
  );
};

export default DetailProduct;
