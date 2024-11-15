import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import dispatch
import { useGetPembelianQuery } from "../../redux/services/PembelianApi"; // Import hook untuk mengambil data pembelian
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { removePembelianData } from '../../redux/slice/PembelianSlice'; // Import aksi penghapusan

const DetailPembelian = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Menggunakan dispatch dari Redux
  const { data, error, isLoading } = useGetPembelianQuery(id);

  // Debugging untuk memeriksa data
  console.log('Data API:', data);
  console.log('Error API:', error);
  console.log('Loading:', isLoading);

  // Handling loading, error, dan tidak ada data
  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) {
    console.error('Error fetching user:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  if (!data) {
    return <div className="text-center p-4 text-red-600">Data tidak ditemukan.</div>;
  }

  // Fungsi format tanggal
  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  // Fungsi untuk menghapus data dan mengarahkan halaman berdasarkan Accepted
  const handleAccepted = () => {
    dispatch(removePembelianData(id));

    navigate('/pengiriman');
    setTimeout(() => {
      navigate('/laporan/konfirmasi');
    }, 1000);
  };

  // Fungsi untuk menghapus data dan mengarahkan halaman berdasarkan Rejected
  const handleRejected = () => {
    dispatch(removePembelianData(id));

    setTimeout(() => {
      navigate('/laporan/batalkan');
    }, 1000);
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
        {/* Card 1 */}
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

        {/* Card 2 */}
        <Card className="w-full">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Shipping Information
            </Typography>

            <div className="flex mb-2">
              <div className="flex-1">
                <Typography>Product</Typography>
                <Typography className="font-bold">{data.order_detail[0]?.product?.name_product}</Typography>
              </div>
              <div className="flex-1">
                <Typography>Category</Typography>
                <Typography className="font-bold mb-5">{data.order_detail[0]?.product?.category_id}</Typography>
                <Typography>Bukti Transaksi</Typography>
                <Typography className="font-bold">{data.order_detail[0]?.product?.description}</Typography>
              </div>
            </div>

            <div>
              <div className="flex-1">
                <Typography>Total Product</Typography>
                <Typography className="font-bold mb-5">{data.order_detail.quantity}</Typography>
              </div>
              <div className="flex-1">
                <Typography>Harga Produk</Typography>
                <Typography className="font-bold mb-5">{data.order_detail[0]?.product?.price}</Typography>
              </div>
              <div className="flex-1">
                <Typography>Total Harga</Typography>
                <Typography className="font-bold mb-5">{data.order_detail.sub_total}</Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button color="green" onClick={handleAccepted}>Accepted</Button>
          <Button color="red" onClick={handleRejected}>Rejected</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPembelian;
