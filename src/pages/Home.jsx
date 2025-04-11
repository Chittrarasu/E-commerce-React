import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-center text-gray-700 flex items-center justify-center gap-2">
          🛍️ E-Commerce Store
        </h1>
        {user && (
          <Button
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <ProductList />
        </div>
        <div className="w-full md:w-1/3">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Home;
