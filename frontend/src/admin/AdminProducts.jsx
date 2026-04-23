import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    stock: "",
  });

  const [sizes, setSizes] = useState([
    { label: "16x24", price: "" },
    { label: "16x16", price: "" },
    { label: "14x21", price: "" },
    { label: "12x18", price: "" },
    { label: "10x15", price: "" },
    { label: "8x12", price: "" },
  ]);

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, value) => {
    const updated = [...sizes];
    updated[index].price = value;
    setSizes(updated);
  };

  // 🔥 IMAGE SELECT + PREVIEW
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview((prev) => [...prev, ...previewUrls]);
  };

  // 🔥 REMOVE IMAGE
  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreview = [...preview];

    updatedImages.splice(index, 1);
    updatedPreview.splice(index, 1);

    setImages(updatedImages);
    setPreview(updatedPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Select image");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("sizes", JSON.stringify(sizes));

    images.forEach((img) => {
      formData.append("images", img);
    });

    await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Product Added!");
    navigate("/admin/products/list");
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-8">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" placeholder="Product Name" onChange={handleChange} className="w-full border p-3 rounded" />

        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-3 rounded"></textarea>

        <input name="category" placeholder="Category" onChange={handleChange} className="w-full border p-3 rounded" />

        <input name="stock" type="number" placeholder="Stock" onChange={handleChange} className="w-full border p-3 rounded" />

        {/* SIZE */}
        <div>
          <h3 className="font-bold mb-2">Size Prices</h3>
          {sizes.map((s, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <span className="w-20">{s.label}</span>
              <input
                type="number"
                placeholder="Price"
                value={s.price}
                onChange={(e) => handleSizeChange(i, e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
        </div>

        {/* 🔥 IMAGE INPUT */}
        <input type="file" multiple onChange={handleImageChange} />

        {/* 🔥 PREVIEW */}
        <div className="flex gap-3 flex-wrap">
          {preview.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 text-xs"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button className="bg-rose-500 text-white px-6 py-3 rounded">
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AdminProducts;