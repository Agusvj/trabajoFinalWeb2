import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setShowToast(true);
    }, 3000);
    setTimeout(() => {
      setShowToast(false);
      setIsProcessing(false);
      clearCart();
    }, 5000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">
          Tu carrito está vacío
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-wood-600 text-white px-6 py-2 rounded-sm hover:bg-wood-700"
        >
          Continuar comprando
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      {showToast && (
        <div className="fixed bottom-40 right-4 bg-green-500 text-white px-6 py-3 rounded-sm shadow-lg z-50">
          ¡Compra realizada con éxito!
        </div>
      )}

      <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-serif font-semibold mb-4">
            Información de envío
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-sm px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Código postal
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
            </div>

            <h3 className="text-lg font-serif font-semibold mt-6 mb-4">
              Información de pago
            </h3>

            <div>
              <label className="block text-sm font-medium mb-1">
                Número de tarjeta
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-sm px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fecha de vencimiento
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 rounded-sm mt-6 ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-wood-700 hover:bg-wood-600"
              } text-white font-sans`}
            >
              {isProcessing ? "Procesando..." : "Finalizar compra"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold mb-4">
            Resumen del pedido
          </h2>
          <div className="p-4 rounded-sm">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <img
                    src={`http://161.35.104.211:8000${item.product.pictures[0]}`}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-sm"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.title}</h3>
                    <p className="text-sm text-gray-600">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${item.product.price * 1000 * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${getCartTotal() * 1000}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
