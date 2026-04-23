import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (currentPage = 1) => {
  const { data } = await api.get(
    `/products?page=${currentPage}&limit=6`
  );

  setProducts(data.products);
  setTotalPages(data.totalPages);
};

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-8">All Products</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow rounded-lg p-4">
            
            <img
              src={`https://bhavikaartandcraft.com${product.images[0]}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="mt-4 font-semibold">{product.name}</h3>
            <p>₹ {product.sizes?.[0]?.price}</p>
            <p>Stock: {product.stock}</p>

            <div className="flex gap-2 mt-4">
              <Link
                  to={`/admin/products/edit/${product._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
      {/* Pagination */}
<div className="flex justify-center gap-3 mt-10">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setPage(index + 1)}
      className={`px-4 py-2 rounded ${
        page === index + 1
          ? "bg-rose-500 text-white"
          : "bg-gray-200"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
  );
};

export default AdminProductList;