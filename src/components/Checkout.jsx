import useCartStore from "../store/useCartStore.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Collect checkout details
    const checkoutDetails = {
      email,
      phoneNumber,
      address,
      items: cart.map((item) => ({ name: item.title, price: item.price })), // Using title as name
      totalPrice: totalPrice.toFixed(2),
    };

    // Display details in an alert (for demo purposes)
    alert(
      `Checkout Details:\n\nEmail: ${email}\nPhone: ${phoneNumber}\nAddress: ${address}\nItems: ${cart
        .map((item) => `${item.title} - $${item.price}`)
        .join("\n")}\nTotal: $${totalPrice.toFixed(2)}`
    );

    // Clear cart and navigate back to home
    clearCart();
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Checkout
      </h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-6">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>{" "}
                  {/* Added product name */}
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xl font-semibold text-gray-900 text-right">
            Total:{" "}
            <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full p-2 border border-gray-300 rounded-lg h-24"
              required
            />
          </div>

          {/* Go Back Button */}
          <button
            type="button"
            onClick={handleGoBack}
            className="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition-transform hover:scale-105"
          >
            Go Back
          </button>

          {/* Proceed to Pay Button */}
          <button
            type="submit"
            className="mt-2 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-transform hover:scale-105"
          >
            Proceed to Pay
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
