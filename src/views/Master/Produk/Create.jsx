import { useState } from 'react';
import { useCreateProductMutation, useGetKategoriesQuery } from '../../../redux/services/ProductApi';
import { Button, Input, Select, Option, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    category_name: '',
    price: '',
    description: '',
    name_product: '',
    age: '',
    weight: '',
    stock: '',
    photo_product: null,
  });
  const [createProduct] = useCreateProductMutation();
  const { data: categories = [], isLoading } = useGetKategoriesQuery();
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input teks dan dropdown
  const handleChange = (e, fieldName = null) => {
    if (e?.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else if (fieldName) {
      setFormData({ ...formData, [fieldName]: e });
    }
  };

  // Fungsi untuk menangani perubahan input file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (validTypes.includes(file.type)) {
        setFormData({ ...formData, photo_product: file });
      } else {
        alert('Tipe file tidak valid. Harap unggah file gambar (jpeg, png, jpg, svg, gif).');
      }
    }
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    const requiredFields = ['category_name', 'price', 'description', 'name_product', 'stock', 'photo_product'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Field berikut wajib diisi: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const productPayload = new FormData();
      productPayload.append('category_name', formData.category_name);
      productPayload.append('price', formData.price);
      productPayload.append('description', formData.description);
      productPayload.append('name_product', formData.name_product);
      productPayload.append('age', formData.age);
      productPayload.append('weight', formData.weight);
      productPayload.append('stock', formData.stock);
      productPayload.append('photo_product', formData.photo_product);

      await createProduct(productPayload).unwrap();
      navigate('/master/produk');
    } catch (err) {
      console.error('Error saat menambah data:', err);
      alert('Terjadi kesalahan saat menambah data. Silakan periksa kembali input Anda.');
    }
  };

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="flex items-center mb-5">
        <Button variant="text" onClick={() => navigate('/master/product')} className="material-icons mr-2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Typography variant="h5" className="font-bold">Tambah Produk</Typography>
        <Typography className="ml-auto text-gray-500">
          {formatDate()}
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Kolom kiri */}
        <div className="space-y-4">
          {/* Category */}
          <div>
            <label htmlFor="category_name" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <div className="w-72">
              <Select
                name="category_name"
                onChange={(value) => handleChange(value, 'category_name')}
                value={formData.category_name}
                required
              >
                {isLoading ? (
                  <Option>Loading...</Option>
                ) : (
                  categories.map((category) => (
                    <Option key={category.id} value={category.name_category}>
                      {category.name_category}
                    </Option>
                  ))
                )}
              </Select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Harga <span className="text-red-500">*</span>
            </label>
            <Input
              id="price"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Masukan harga"
              className="w-full"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <Input
              id="age"
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Masukan usia"
              className="w-full"
            />
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Weight <span className="text-red-500">*</span>
            </label>
            <Input
              id="weight"
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Masukan berat domba"
              className="w-full"
            />
          </div>


          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukan deskripsi produk"
              className="w-full border rounded-md p-2"
              rows="4"
            />
          </div>
        </div>

        {/* Kolom kanan */}
        <div className="space-y-4">
          {/* Nama Produk */}
          <div>
            <label htmlFor="name_product" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <Input
              id="name_product"
              type="text"
              name="name_product"
              value={formData.name_product}
              onChange={handleChange}
              placeholder="Masukan nama produk"
              className="w-full"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stok <span className="text-red-500">*</span>
            </label>
            <Input
              id="stock"
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Masukan jumlah stok"
              className="w-full"
            />
          </div>

          {/* Gambar */}
          <div>
            <label htmlFor="photo_product" className="block text-sm font-medium text-gray-700 mb-1">
              Gambar <span className="text-red-500">*</span>
            </label>
            <input
              id="photo_product"
              type="file"
              name="photo_product"
              onChange={handleFileChange}
              className="w-full"
            />
            <div className="mt-4 bg-gray-100 h-40 w-full flex items-center justify-center">
              {formData.photo_product ? (
                <img
                  src={URL.createObjectURL(formData.photo_product)}
                  alt="Preview"
                  className="max-h-full max-w-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Preview Gambar</span>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Submit */}
        <div className="col-span-2 text-right">
          <Button type="submit" variant="gradient" className="px-8 py-2">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
