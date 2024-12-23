import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Option, Input, Button, Typography } from "@material-tailwind/react";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    reportType: '',
    start_date: '',
    end_date: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { reportType, start_date, end_date } = formData;
  
    if (!reportType || !start_date || !end_date) {
      alert("Semua field wajib diisi!");
      return;
    }
  
    if (new Date(start_date) > new Date(end_date)) {
      alert("Tanggal Mulai tidak boleh lebih dari Tanggal Akhir.");
      return;
    }
  
    // Navigasi ke halaman laporan dengan state yang mengandung tanggal
    navigate(`/reports/${reportType}?start_date=${start_date}&end_date=${end_date}`);
  };
  
  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <Typography variant="h5" className="font-bold mb-5">Form Laporan</Typography>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dropdown Jenis Laporan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jenis Laporan <span className="text-red-500">*</span>
          </label>
          <Select
            name="reportType"
            value={formData.reportType}
            onChange={(value) => setFormData({ ...formData, reportType: value })}
            required
          >
            <Option value="sales-report">Sales Report</Option>
            <Option value="sheep-stock-report">Sheep Stock Report</Option>
            <Option value="payment-report">Payment Report</Option>
            <Option value="shipping-report">Shipping Report</Option>
          </Select>
        </div>

        {/* Input Tanggal Mulai */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Mulai <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Input Tanggal Akhir */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Akhir <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tombol Submit */}
        <div className="text-right">
          <Button type="submit" variant="gradient">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
