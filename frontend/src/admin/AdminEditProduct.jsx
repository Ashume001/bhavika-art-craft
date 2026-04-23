import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminEditProduct = () => {
  const { id } = useParams();
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

  const [existingImages, setExistingImages] = useState([]);

  // 🔥 NEW IMAGES
  const [newImages, setNewImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // ✅ FETCH
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);

      setForm({
        name: data.name || "",
        description: data.description || "",
        category: data.category || "",
        stock: data.stock || "",
      });

      if (data.sizes?.length) {
        setSizes(data.sizes);
      }

      setExistingImages(data.images || []);
    };

    fetchProduct();
  }, [id]);

  // ✅ FORM CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SIZE CHANGE
  const handleSizeChange = (index, value) => {
    const updated = [...sizes];
    updated[index].price = value;
    setSizes(updated);
  };

  // 🔥 REMOVE EXISTING IMAGE
  const removeExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  // 🔥 SELECT NEW IMAGES + PREVIEW
  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);

    setNewImages((prev) => [...prev, ...files]);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview((prev) => [...prev, ...previewUrls]);
  };

  // 🔥 REMOVE NEW IMAGE
  const removeNewImage = (index) => {
    const updatedImages = [...newImages];
    const updatedPreview = [...preview];

    updatedImages.splice(index, 1);
    updatedPreview.splice(index, 1);

    setNewImages(updatedImages);
    setPreview(updatedPreview);
  };

  // ✅ UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("stock", form.stock);

    formData.append("sizes", JSON.stringify(sizes));
    formData.append("existingImages", JSON.stringify(existingImages));

    newImages.forEach((img) => {
      formData.append("images", img);
    });

    await api.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Product Updated!");
    navigate("/admin/products/list");
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-8">Edit Product</h2>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3 rounded"
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-3 rounded"
        />

        {/* SIZE */}
        <div>
          <h3 className="font-bold mb-2">Size Prices</h3>
          {sizes.map((s, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <span className="w-20">{s.label}</span>
              <input
                type="number"
                value={s.price}
                onChange={(e) => handleSizeChange(i, e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
        </div>

        {/* EXISTING IMAGES */}
        <div>
          <h3 className="font-bold mb-2">Existing Images</h3>
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(i)}
                  className="absolute top-0 right-0 bg-red-500 text-white px-2 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* NEW IMAGE INPUT */}
        <input type="file" multiple onChange={handleNewImages} />

        {/* NEW IMAGE PREVIEW */}
        <div className="flex gap-3 flex-wrap">
          {preview.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-24 h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeNewImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 text-xs"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button className="bg-green-500 text-white px-6 py-3 rounded">
          Update Product
        </button>

      </form>
    </div>
  );
};

export default AdminEditProduct;