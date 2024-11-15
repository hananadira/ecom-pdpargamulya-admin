import React, { useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import { useGetProductsQuery, useDeleteProductMutation } from '../../../redux/services/ProductApi';
import { Card, Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debugging untuk melihat state
  console.log('Data Product:', data);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin Anda ingin menghapus data?")) {
      try {
        await deleteProduct(id);
        console.log('Data berhasil dihapus');
      } catch (err) {
        console.error('Error saat menghapus:', err);
      }
    }
  };

  // Loading state
  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  // Cek jika ada error
  if (error) {
    console.error('Error fetching product:', error);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProduct = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Render the table
  return (
    <div className="container mx-auto p-8">
      <Card className="overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray">
            Data Product
          </Typography>
          <Button variant="gradient" size="sm" onClick={() => navigate('/master/produk/create')}>
            Tambah Data
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">Nama Produk</th>
              <th className="px-4 py-2 border-b">Deskripsi</th>
              <th className="px-4 py-2 border-b">Harga</th>
              <th className="px-4 py-2 border-b">Stok</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProduct.length > 0 ? (
              currentProduct.map((product, index) => (
                <tr key={product.id} className="even:bg-blue-gray-50/50 hover:bg-blue-gray-100 transition-colors">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{product.name_product}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="max-w-xs break-words">{product.description}</div>
                  </td>
                  <td className="px-4 py-2 border-b">{product.price}</td>
                  <td className="px-4 py-2 border-b">{product.stock}</td>
                  <td className="px-4 py-2 border-b">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="blue-gray" className="flex items-center">
                          <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/master/produk/detail/${product.id}`)}>Detail</MenuItem>
                        <MenuItem onClick={() => navigate(`/master/produk/edit/${product.id}`)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(product.id)}>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
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
      </Card>
    </div>
  );
};

export default Product;
