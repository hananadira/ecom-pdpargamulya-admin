import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useGetUsersQuery } from "../redux/services/UserApi";
import { useGetPembeliansQuery } from "../redux/services/PembelianApi";

const Home = () => {
  const { data: userData, error: userError, isLoading: userLoading } = useGetUsersQuery();
  const { data: pembelianData, error: pembelianError, isLoading: pembelianLoading } = useGetPembeliansQuery();

  const navigate = useNavigate();

  // loading state
  if (userLoading || pembelianLoading)
    return <div className="text-center p-4">Loading...</div>;

  // error state
  if (userError || pembelianError) {
    console.error("Error fetching data:", { userError, pembelianError });
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  // Hitung jumlah user
  const userCount = userData?.length || 0;

  // Hitung total pembelian
  const totalPembelian = pembelianData?.reduce((acc, pembelian) => {
    // Totalkan sub_total di setiap order_detail
    const orderDetailTotal = pembelian.order.reduce((detailAcc, detail) => {
      return detailAcc + parseInt(detail.total_amount.replace(/\./g, ""), 10); // Konversi dari string ke angka
    }, 0);
  
    return acc + orderDetailTotal;
  }, 0) || 0;

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
            <Typography>isi smua nya</Typography>
          </CardBody>
        </Card>

        {/* Kartu sebelah kanan lebih pendek */}
        <Card className="flex-[0.40]">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              User
            </Typography>
            <Typography variant="h1" className="text-center">
              {userCount}
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
            <Typography variant="h1">IDR {totalPembelian.toLocaleString()}</Typography>
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
            <Typography>ada 2 nanti di sini</Typography>
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
            <Typography>isi laporan di sini</Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Home;
