import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../redux/services/UserApi";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const DetailUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserQuery(id);

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
        <Button variant="text" onClick={() => navigate('/master/user')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Detail User</Typography>
        <Typography className="ml-auto text-gray-500"> 
          {formatDate()} 
        </Typography>
      </div>

      <div className="flex flex-col space-y-5">
        <Card className="w-full">
          <CardBody className="flex items-center">
            <img 
              src={data.image || "https://via.placeholder.com/50"}
              alt="Profile"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {data.username || "Unknown User"}
              </Typography>
              <Typography>
                {data.fullname || "No Fullname Available"}
              </Typography>
            </div>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Personal Information
            </Typography>

            <div className="flex items-center mb-2">
              <div className="flex-1">
                <Typography>Username</Typography>
                <Typography className='font-bold'>{data.username || "Unknown"}</Typography>
              </div>
              <div className="flex-1">
                <Typography>Fullname</Typography>
                <Typography className='font-bold'>{data.fullname || "No Name"}</Typography>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1">
                <Typography>Email</Typography>
                <Typography className='font-bold'>{data.email || "No Email"}</Typography>
              </div>
              <div className="flex-1">
                <Typography>Phone</Typography>
                <Typography className='font-bold'>{data.phone_number || "No Phone"}</Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardBody>
          {/* <div>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {data.address || "Unknown User"}
              </Typography>
            </div> */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Address
            </Typography>
            <Typography>Country</Typography>
            <Typography className='mb-5 font-bold'>{data.address || "No Address"}</Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DetailUser;
