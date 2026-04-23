import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { Link, useNavigate } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, totalPages } = useSelector(
    (state) => state.products
  );

  const safeProducts = Array.isArray(products) ? products : [];

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 6 }));
  }, [dispatch, page]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-amber-400 text-xl font-semibold">
          Loading Products...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-16">

      {/* HEADER */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Explore Products
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover premium handcrafted products with elegant design
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10">

        {safeProducts.map((product) => {
          const price = product.sizes?.[0]?.price || 0;
          const originalPrice = price + 500;

          return (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={`https://bhavikaartandcraft.com${product.images?.[0]}`}
                  alt={product.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Discount badge */}
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                  {product.name}
                </h3>

                {/* PRICE */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xl font-bold text-black">
                    ₹ {price}
                  </span>

                  <span className="text-gray-400 line-through text-sm">
                    ₹ {originalPrice}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between items-center mt-5">

                  {/* View */}
                  <Link
                    to={`/products/${product._id}`}
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    View Details →
                  </Link>

                  {/* BUY NOW (FIXED) */}
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-amber-500 hover:text-black transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION (FIXED) */}
      <div className="flex justify-center gap-3 mt-16 flex-wrap">

        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-white shadow rounded disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(totalPages || 1)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded ${
              page === index + 1
                ? "bg-black text-white"
                : "bg-white shadow"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-white shadow rounded disabled:opacity-40"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Shop;