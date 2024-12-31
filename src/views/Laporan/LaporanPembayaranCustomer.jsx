import { useParams, useLocation } from "react-router-dom";
import { useLazyGetReportQuery } from "../../redux/services/LaporanApi";
import { useEffect, useState } from "react";
import { Typography, Spinner, Button } from "@material-tailwind/react";
import  exportToExcel from "../../utils/exportToExcel"; // Pastikan Anda sudah menambahkan fungsi ini di utils

const ReportPage = () => {
  const { reportType } = useParams();
  const { search } = useLocation();
  const [getReport, { data, isFetching, isError, error }] = useLazyGetReportQuery();

  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const startDateParam = params.get("start_date");
    const endDateParam = params.get("end_date");

    if (startDateParam && endDateParam) {
      setStartDate(startDateParam);
      setEndDate(endDateParam);
    } else {
      console.error("Parameter tanggal tidak lengkap");
    }
  }, [search]);

  useEffect(() => {
    if (reportType && start_date && end_date) {
      getReport({ reportType, start_date, end_date });
    }
  }, [reportType, start_date, end_date, getReport]);

  if (isFetching) {
    return <Spinner className="mx-auto mt-10" />;
  }

  if (isError) {
    return (
      <Typography className="text-red-500">
        Terjadi kesalahan saat mengambil data: {error?.message || "Unknown Error"}
      </Typography>
    );
  }

  const getExportData = () => {
    if (!data?.data || !Array.isArray(data.data)) {
      return [];
    }

    switch (reportType) {
      case "sales-report":
        return data.data.map(({ no_ref_order, created_at, fullname, total_amount, status }) => ({
          "No Ref Order": no_ref_order,
          "Tanggal": created_at,
          "Nama": fullname || "-",
          "Total": total_amount,
          "Status": status,
        }));
      case "sheep-stock-report":
        return data.data.map(({ id, name_product, name_category, age, weight, price, stock, status }) => ({
          "ID": id,
          "Nama Produk": name_product,
          "Kategori": name_category,
          "Usia": age,
          "Berat": weight,
          "Harga": price,
          "Stok": stock,
          "Status": status,
        }));
      case "payment-report":
        return data.data.map(({ no_ref_order, account_name, payment_method, payment_amount, status }) => ({
          "No Ref Order": no_ref_order,
          "Nama": account_name || "-",
          "Metode Pembayaran": payment_method,
          "Total Pembayaran": payment_amount || "-",
          "Status": status,
        }));
      case "shipping-report":
        return data.data.map(({ no_ref_order, fullname, shipping_date, shipping_address, shipping_status }) => ({
          "No Ref Order": no_ref_order,
          "Nama": fullname || "-",
          "Tanggal Pengiriman": shipping_date || "-",
          "Alamat Pengiriman": shipping_address,
          "Status Pengiriman": shipping_status || "-",
        }));
      default:
        return [];
    }
  };

  const renderTable = () => {
    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) {
      return <Typography>Tidak ada data yang tersedia.</Typography>;
    }

    const formatDate = () => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
      return new Date().toLocaleDateString('id-ID', options);
    };

    switch (reportType) {
      case "sales-report":
        return (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th>No Ref Order</th>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.no_ref_order}</td>
                  <td>{row.created_at}</td>
                  <td>{row.fullname || "-"}</td>
                  <td>{row.total_amount}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "sheep-stock-report":
        return (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Usia</th>
                <th>Berat</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name_product}</td>
                  <td>{row.name_category}</td>
                  <td>{row.age}</td>
                  <td>{row.weight}</td>
                  <td>{row.price}</td>
                  <td>{row.stock}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
        
      case "payment-report":
        return (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th>No Ref</th>
                <th>Nama</th>
                <th>Metode Pembayaran</th>
                <th>Total Pembayaran</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.no_ref_order}</td>
                  <td>{row.account_name}</td>
                  <td>{row.payment_method}</td>
                  <td>{row.payment_amount}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "shipping-report":
        return (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th>No Ref</th>
                <th>Nama</th>
                <th>Tanggal Pengiriman</th>
                <th>Alamat Pengiriman</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.no_ref_order}</td>
                  <td>{row.fullname}</td>
                  <td>{row.shipping_date}</td>
                  <td>{row.shipping_address}</td>
                  <td>{row.shipping_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );


      default:
        return <Typography>Jenis laporan tidak dikenal.</Typography>;
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between mb-5">
        <Typography variant="h5" className="font-bold capitalize">
          {reportType.replace("-", " ")}
        </Typography>
        <Button
          color="blue"
          onClick={() => exportToExcel(getExportData(), `${reportType}.xlsx`)}
        >
          Export to Excel
        </Button>
      </div>

      {renderTable()}
    </div>
  );
};

export default ReportPage;
