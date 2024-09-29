import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../api';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

export default function Produk() {
  const [Produk, setProduk] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Jumlah data per halaman
  const navigate = useNavigate();

  // Fetch Data Produk
  const fetchDataProduk = async () => {
    try {
      const response = await api.get('/api/products');
      console.log(response.data);
      if (response.data.success) {
        setProduk(response.data.data); // Use response.data.data to set state
      }
    } catch (error) {
      console.error("Error fetching Produk data:", error);
    }
  };

  useEffect(() => {
    fetchDataProduk();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Produk.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Produk.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      // Call your delete API method here using id
      console.log("Delete item with id:", id);
      // After deletion, you may want to refetch the data
      fetchDataProduk();
    }
  };

  return (
    <div className="container mr-8 p-8">
      <Card className="h-full w-full overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Produk
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => console.log("Add Data Clicked")}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  No
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  Produk
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  Deskripsi 
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  Price 
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              const { id, name_product, description, price } = item;

              return (
                <tr key={id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {index + 1 + indexOfFirstItem}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {name_product}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {description}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {price}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <span className="material-icons">more_vert</span>
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/Produk/detail/${id}`)}>Detail</MenuItem>
                        <MenuItem onClick={() => navigate(`/Produk/edit/${id}`)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(id)}>Hapus</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
