import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useGetUsersQuery } from "../redux/services/UserApi";

const User = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  console.log('Data User:', data);

  // loading state 
  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  // error state 
  if(error) {
    console.error('Error fetching user:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }
}



export function Home() {
  return (
    <div className="ml-3 p-5">
      {/* Baris pertama dengan kartu yang berbeda panjang */}
      <div className="flex mb-4">
        {/* Kartu sebelah kiri lebih panjang */}
        <Card className="flex-1 mr-4">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Master
            </Typography>
            <Typography>
              isi smua nya 
            </Typography>
          </CardBody>
        </Card>

        {/* Kartu sebelah kanan lebih pendek */}
        <Card className="flex-[0.40]">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              User
            </Typography>
            <Typography variant="h1" className="text-center">
              10
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Baris kedua dengan kartu yang sama panjang */}
      <div className="flex mb-4">
        {/* Kartu pertama */}
        <Card className="flex-1 mr-4">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Total Pembelian
            </Typography>
            <Typography variant="h1">
              IDR 1M
            </Typography>
            <Typography variant="h6">
              <span color="green">+ IDR 2M</span> last mount
            </Typography>
          </CardBody>
        </Card>

        {/* Kartu kedua */}
        <Card className="flex-1">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Pengiriman
            </Typography>
            <Typography>
             ada 2 nanti di sini
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Baris ketiga dengan satu kartu yang lebar menyesuaikan panjang dua kartu di atasnya */}
      <div className="flex">
        <Card className="w-full">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Laporan
            </Typography>
            <Typography>
              isi laporan di sini
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
