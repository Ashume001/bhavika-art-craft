import { useEffect, useState } from "react";
import api from "../services/api";
import AdminProducts from "./AdminProducts";
import AdminProductList from "./AdminProductList";
import AdminOrders from "./AdminOrders";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigate = useNavigate()
  
  const handleLogout = () => {
  localStorage.clear()
  navigate("/admin/login" , { replace: true });
}

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard");
        setStats(data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchStats();
  }, []);

  const menuItem = (tab, label) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full text-left px-5 py-3 rounded-lg transition-all duration-300 
        ${
          activeTab === tab
            ? "bg-rose-500 text-white shadow-lg"
            : "hover:bg-gray-200 text-gray-700"
        }`}
    >
      {label}
    </button>
  );

 return (
  <div className="min-h-screen bg-gray-50 flex">

    {/* 🔥 Sidebar */}
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col justify-between shadow-2xl">

      <div>
        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          Admin Panel
        </h2>

        <div className="space-y-3">
          {menuItem("dashboard", " Dashboard")}
          {menuItem("addProduct", " Add Product")}
          {menuItem("products", " Products")}
          {menuItem("orders", " Orders")}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-rose-500 hover:bg-rose-600 
                   py-3 rounded-xl transition-all duration-300 
                   font-semibold shadow-lg"
      >
        🚪 Logout
      </button>
    </div>

    {/* 🔥 Main Section */}
    <div className="flex-1 flex flex-col">

      {/* Top Navbar */}
      <div className="bg-white shadow px-10 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {activeTab === "dashboard" && "Dashboard Overview"}
          {activeTab === "addProduct" && "Add Product"}
          {activeTab === "products" && "Product Management"}
          {activeTab === "orders" && "Order Management"}
        </h1>

        <div className="text-gray-500 font-medium">
          Welcome, Admin 👋
        </div>
      </div>

      {/* Content */}
      <div className="p-10">

        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <p className="text-gray-500">Products</p>
              <h3 className="text-3xl font-bold mt-2">
                {stats.totalProducts || 0}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <p className="text-gray-500">Orders</p>
              <h3 className="text-3xl font-bold mt-2">
                {stats.totalOrders || 0}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <p className="text-gray-500">Users</p>
              <h3 className="text-3xl font-bold mt-2">
                {stats.totalUsers || 0}
              </h3>
            </div>

          </div>
        )}

        {activeTab === "addProduct" && (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <AdminProducts />
          </div>
        )}

        {activeTab === "products" && (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <AdminProductList />
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <AdminOrders />
          </div>
        )}

      </div>
    </div>
  </div>
);
};

export default AdminDashboard;