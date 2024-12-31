import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useGetUsersQuery } from "../redux/services/UserApi";
import { useGetProductsQuery, useGetKategoriesQuery } from "../redux/services/ProductApi";
import { useGetRekeningsQuery } from "../redux/services/RekeningApi";
import { useGetPembeliansQuery } from "../redux/services/PembelianApi";
import { useGetPengirimanSelesaiQuery } from "../redux/services/PengirimanApi";
import { CreditCard, Package, Users } from "lucide-react";

const Home = () => {
  const { data: userData, error: userError, isLoading: userLoading } = useGetUsersQuery();
  const { data: produkData, error: produkError, isLoading: produkLoading } = useGetProductsQuery();
  const { data: kategoriData, error: kategoriError, isLoading: kategoriLoading } = useGetKategoriesQuery();
  const { data: rekeningData, error: rekeningError, isLoading: rekeningLoading } = useGetRekeningsQuery();
  const { data: pengirimanSelesaiData, error: pengirimanSelesaiError, isLoading: pengirimanSelesaiLoading } = useGetPengirimanSelesaiQuery();
  const { data: pembelianData, error: pembelianError, isLoading: pembelianLoading } = useGetPembeliansQuery();

  const navigate = useNavigate();

  // 
  console.log('Data Pengiriman:', pengirimanSelesaiData);

     // Pagination state
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 10;

  // loading state
  if (userLoading || produkLoading || kategoriLoading || rekeningLoading || pengirimanSelesaiLoading || pembelianLoading)
    return <div className="text-center p-4">Loading...</div>;

  // error state
  if (userError || produkError || kategoriError || rekeningError || pengirimanSelesaiError || pembelianError) {
    console.error("Error fetching data:", { userError, pembelianError });
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

 

  // Hitung jumlah user
  const userCount = userData?.length || 0;
  const produkCount = produkData?.length || 0;
  const kategoriCount = kategoriData?.length || 0;
  const rekeningCount = rekeningData?.length || 0;

  // Hitung total pembelian
  const totalPembelian = pembelianData?.reduce((acc, pembelian) => {
    // Totalkan sub_total di setiap order_detail
    const orderDetailTotal = pembelian.order.reduce((detailAcc, detail) => {
      return detailAcc + parseInt(detail.total_amount.replace(/\./g, ""), 10); // Konversi dari string ke angka
    }, 0);
  
    return acc + orderDetailTotal;
  }, 0) || 0;

  const indexOfLastPengiriman = currentPage * itemsPerPage;
  const indexOfFirstPengiriman = indexOfLastPengiriman - itemsPerPage;
  const currentPengiriman = pengirimanSelesaiData && pengirimanSelesaiData.length > 0
    ? pengirimanSelesaiData.slice(indexOfFirstPengiriman, indexOfLastPengiriman)
    : [];
  
  const totalPages = pengirimanSelesaiData ? Math.ceil(pengirimanSelesaiData.length / itemsPerPage) : 0;


  return (
    <div className="ml-3 p-5">
      {/* Baris pertama dengan 4 kartu */}
      <div className="flex mb-4 space-x-4">
          {/* Kartu pertama */}
          <Card className="flex-1">
            <CardBody>
              <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                      <Users size={26} />
                  </div>
                  <p className="card-title">Total Customers</p>
              </div>
              <Typography variant="h1" className="text-center">
              {userCount}
              </Typography >
            </CardBody>
          </Card>

          {/* Kartu kedua */}
          <Card className="flex-1">
            <CardBody>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                  <Package size={26} />
                </div>
                  <p>Total Products</p>
              </div>
              <Typography variant="h1" className="text-center text-4xl font-bold">
                {produkCount}
              </Typography>
            </CardBody>
          </Card>

          {/* Kartu ketiga */}
          <Card className="flex-1">
            <CardBody>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                  <Package size={26} />
                </div>
                  <p>Kategori</p>
              </div>
              <Typography variant="h1" className="text-center">
                {kategoriCount}
              </Typography>
            </CardBody>
          </Card>

          {/* Kartu keempat */}
          <Card className="flex-1">
            <CardBody>
            <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                  <CreditCard size={26} />
                </div>
                <p className="card-title">Sales</p>
              </div>
              <Typography variant="h1" className="text-center">
                {rekeningCount}
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
            <Typography>
            <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-gray-100">
                  <th className="px-4 py-2 border-b">No</th>
                  <th className="px-4 py-2 border-b">No. Ref</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  {/* <th className="px-4 py-2 border-b">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                  {currentPengiriman.map((pengiriman, index) => (
                    <tr key={pengiriman.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td className="px-4 py-2 border-b">{pengiriman.order.no_ref_order}</td>
                      <td className="px-4 py-2 border-b">{pengiriman.shipping_status}</td>
                    </tr>
                  
                ))}
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
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Baris ketiga dengan satu kartu yang lebar menyesuaikan panjang dua kartu di atasnya */}
      {/* <div className="flex">
        <Card className="w-full">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Laporan
            </Typography>
            <Typography>isi laporan di sini</Typography>
          </CardBody>
        </Card>
      </div> */}
    </div>
  );
};

export default Home;
