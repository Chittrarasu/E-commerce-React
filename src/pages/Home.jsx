import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-6 flex items-center justify-center gap-2">
        🛍️ E-Commerce Store
      </h1>

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
