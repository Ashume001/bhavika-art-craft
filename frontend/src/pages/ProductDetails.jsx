import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  // 🔥 NEW STATE
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);

        setProduct(data);
        setMainImage(`https://bhavikaartandcraft.com${data.images[0]}`);

        // 🔥 DEFAULT SIZE SELECT
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // Related products
        const { data: related } = await api.get(
          `/products?category=${data.category}&exclude=${id}`
        );
        setRelatedProducts(related.products || related);

        setLoading(false);
      } catch (err) {
        console.log(err.response?.data || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

  // 🔥 UPDATED ADD TO CART
  const handleAddToCart = () => {
    if (!selectedSize) return;

    dispatch(
      addToCart({
        ...product,
        selectedSize,
        price: selectedSize.price,
        quantity,
        cartId: product._id + selectedSize.label,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-14">

          {/* IMAGE SECTION */}
          <div className="flex flex-col gap-6">
            <div className="w-full h-[520px] bg-white/70 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden flex items-center justify-center">
              <img
                src={mainImage}
                alt={product.name}
                className="max-h-full object-contain hover:scale-105 transition duration-500"
              />
            </div>

            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`https://bhavikaartandcraft.com${img}`}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setMainImage(`https://bhavikaartandcraft.com${img}`)}
                  className={`w-24 h-24 object-cover rounded-xl cursor-pointer border-2 transition ${
                    mainImage === `https://bhavikaartandcraft.com${img}`
                      ? "border-rose-500 scale-105"
                      : "border-gray-300 hover:border-rose-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-6">

            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              {product.name}
            </h1>

            {/* 🔥 UPDATED PRICE */}
            <p className="text-3xl font-bold text-rose-500">
              ₹ {selectedSize?.price}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* 🔥 SIZE SELECTOR */}
            {product.sizes && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Select Size:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border transition ${
                        selectedSize?.label === size.label
                          ? "bg-rose-500 text-white border-rose-500"
                          : "border-gray-300 hover:border-rose-400"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Emotional Text */}
            <p className="text-gray-500 text-sm">
              ✨ Each piece is handcrafted with love and attention to detail
            </p>

            {/* Stock */}
            <div>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center border rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(q => Math.min(product.stock, q + 1))
                    }
                    className="px-4 py-2 bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* 🔥 ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full mt-6 py-4 rounded-full text-lg font-semibold text-white ${
                product.stock === 0
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-rose-500 to-amber-400"
              }`}
            >
              Add to Cart 🛒
            </button>

            <p className="text-gray-400 mt-4 text-sm">
              Category: {product.category}
            </p>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              You May Also Like
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <Link
                  key={p._id}
                  to={`/products/${p._id}`}
                  className="group bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <img
                    src={`https://bhavikaartandcraft.com${p.images[0]}`}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">
                      {p.name}
                    </h3>
                    <p className="text-rose-500 font-bold mt-1">
                      ₹ {p.sizes?.[0]?.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;