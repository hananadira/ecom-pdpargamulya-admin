import { useParams, useLocation } from 'react-router-dom';
import { useLazyGetReportQuery } from "../../redux/services/LaporanApi";
import { useEffect, useState } from "react";
import { Typography, Spinner, Table, TableHead, TableRow, TableCell, TableBody } from "@material-tailwind/react";

const ReportPage = () => {
  const { reportType } = useParams();
  const { search } = useLocation();  // Get query parameters from the URL
  const [getReport, { data, isFetching, error }] = useLazyGetReportQuery();

  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(search); // Get query parameters
    const startDateParam = params.get('start_date');
    const endDateParam = params.get('end_date');

    if (startDateParam && endDateParam) {
      setStartDate(startDateParam);
      setEndDate(endDateParam);
    }

    if (reportType && start_date && end_date) {
      getReport({ reportType, start_date, end_date });
    }
  }, [reportType, search, start_date, end_date, getReport]);

  if (isFetching) return <Spinner className="mx-auto mt-10" />;
  if (error) return <Typography className="text-red-500">Error fetching data.</Typography>;

  const renderTable = () => {
    if (!data || !data.data || !Array.isArray(data.data)) return <Typography>No data available.</Typography>;

    // Kolom dan baris berdasarkan jenis laporan
    switch (reportType) {
      case "sales-report":
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No Ref Order</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.no_ref_order}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.fullname || "-"}</TableCell>
                  <TableCell>{row.total_amount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "sheep-stock-report":
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nama Produk</TableCell>
                <TableCell>Kategori</TableCell>
                <TableCell>Usia</TableCell>
                <TableCell>Berat</TableCell>
                <TableCell>Harga</TableCell>
                <TableCell>Stok</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name_product}</TableCell>
                  <TableCell>{row.name_category}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "payment-report":
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No Ref Order</TableCell>
                <TableCell>ID Pembayaran</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Metode Pembayaran</TableCell>
                <TableCell>Jumlah</TableCell>
                <TableCell>Nama Akun</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.no_ref_order}</TableCell>
                  <TableCell>{row.id_payment}</TableCell>
                  <TableCell>{row.updated_at}</TableCell>
                  <TableCell>{row.payment_method}</TableCell>
                  <TableCell>{row.payment_amount}</TableCell>
                  <TableCell>{row.account_name || "-"}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "shipping-report":
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No Ref Order</TableCell>
                <TableCell>ID Pengiriman</TableCell>
                <TableCell>Tanggal Pengiriman</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell>Status Pengiriman</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.no_ref_order}</TableCell>
                  <TableCell>{row.id_shipping}</TableCell>
                  <TableCell>{row.shipping_date}</TableCell>
                  <TableCell>{row.fullname}</TableCell>
                  <TableCell>{row.shipping_address}</TableCell>
                  <TableCell>{row.shipping_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      default:
        return <Typography>Jenis laporan tidak dikenal.</Typography>;
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <Typography variant="h5" className="font-bold mb-5 capitalize">
        {reportType.replace("-", " ")}
      </Typography>
      {renderTable()}
    </div>
  );
};

export default ReportPage;
