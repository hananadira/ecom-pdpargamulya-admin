import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../../redux/services/ProductApi";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductQuery(id);

  // Debugging untuk memeriksa data
  console.log("Data API:", data); // Cek data yang diterima
  console.log("Error API:", error); // Cek apakah ada error
  console.log("Loading:", isLoading); // Cek status loading

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="text-center p-4 text-red-600">
        Terjadi kesalahan saat mengambil data.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-4 text-red-600">Data tidak ditemukan.</div>
    );
  }

  
  // Cek struktur data
  console.log("Struktur data product:", data);

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  return (
    // <div className="p-10 bg-gray-100 min-h-screen flex justify-center">
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

      <div className="p-10 bg-gray-100 min-h-screen flex justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader shadow={false} floated={false} className="p-0">
          <img
            src={data.photo_product}
            alt="Product"
            className="h-64 w-full object-cover"
          />
        </CardHeader>
        <CardBody className="p-8 flex flex-col items-center">
          <Typography variant="h3" className="text-gray-800 font-bold mb-2">
            {data.name_product}
          </Typography>
          <Typography variant="h4" className="text-gray-800 font-bold mb-2">
            Rp. {data.price}
          </Typography>
          {/* <Typography className="text-gray-600 text-sm mb-4 text-center">
            {data.description}
          </Typography> */}
        </CardBody>
      </Card>



      <Card color="gray" variant="gradient" className="w-full max-w-[30rem] p-8">
      {/* <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
          standard
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-4xl">$</span>29{" "}
          <span className="self-end text-4xl">/mo</span>
        </Typography>
      </CardHeader> */}
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              {/* <CheckIcon /> */}
            </span>
            <Typography className="font-normal">{data.description}</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              {/* <CheckIcon /> */}
            </span>
            <Typography className="font-normal">{data.health_status}</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              {/* <CheckIcon /> */}
            </span>
            <Typography className="font-normal">{data.age} tahun</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              {/* <CheckIcon /> */}
            </span>
            <Typography className="font-normal">{data.weight} kg</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              {/* <CheckIcon /> */}
            </span>
            <Typography className="font-normal">
              Life time technical support
            </Typography>
          </li>
        </ul>
      </CardBody>
    </Card>
      </div>
    </div>
  );
};

export default DetailProduct;
