import React from "react";
import { useAppContext } from "@context/AppContext";
import { formatPeso } from "@lib/utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { selectDeliveryAddress } from "@api";

export default () => {  
  const { state } = useAppContext();
  const cartItems = state.cart;
  const couponDetails = state.couponDetails || {
    couponAmount: 0
  };
  const subtotal = state.cart_subtotal
  const total_qty = cartItems.reduce(
    (sum, item) => sum += item.quantity,
    0
  );
  const [methods, setMethods] = React.useState({
    'shipping': {
      charges: 0,
      type: ''
    },
    'payment': {
      type: 'paymongo',
      charges: subtotal - couponDetails.couponAmount
    }
  })

  const deliveryComputeMutation = useMutation({
    mutationFn: (data) => selectDeliveryAddress(state.token, data),
    onSuccess: (resp: any) => {
      setMethods(prev => ({
        ...prev,
        shipping: {
          type: resp.data.method.type,
          charges: resp.data.charges
        }
      }))
    }
  })

  const handleSelectShipping = (e) => {
    if (typeof state.user.defaultAddress !== 'undefined') {
      const data = {
        guest_token: state.guest_token,
        method: e.target.value,
        cart: cartItems,
        total_qty: total_qty,
        total_amount: subtotal - couponDetails.couponAmount,
        delivery_address: state.user.defaultAddress
      }
      deliveryComputeMutation.mutate(data)
    }
  }

  return (
    <div className="w-[80vw] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {/* Layout: Cart list on the left, promo and address on the right */}
      <div className="grid grid-cols-12 mt-8 gap-4">
        {/* Left: Cart List */}
        <div className="bg-white shadow col-span-7 rounded-lg p-4 flex-[2]" style={{ 'height': 'max-content' }}>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className={[
                  "grid items-center border-b py-4 last:border-b-0 w-full lg:w-[40vw] gap-2",
                  item.is_valid_for_coupon ? 'grid-cols-7' : 'grid-cols-6'
                ].join(" ")}
              >
                {/* Product Image */}
                <div className="col-span-1 flex justify-center">
                  <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                  />
                </div>
                {/* Product Info */}
                <div className="col-span-4 flex flex-col">
                  <div className="font-semibold">{item.product.product_name}</div>
                  <div className="text-gray-500">{item.color} - {item.size}</div>
                  <div className="text-gray-500">
                    {item.product.product_discount > 0 ? 
                      formatPeso(item.product.discounted_price) : 
                      formatPeso(item.product.product_price)
                    } x {item.quantity}
                  </div>
                </div>
                {item.is_valid_for_coupon && (
                  <div className="col-span-1 text-green-500 text-sm mt-1">
                    Coupon Applied
                  </div>
                )}
                {/* Total Price */}
                <div className="col-span-1 font-bold text-lg flex justify-end">
                  {formatPeso(item.product.product_price * item.quantity)}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Right: Promo Code and Delivery Address */}
        <div className="w-full lg:w-96 flex flex-col gap-6 flex-[1]">
          {/* Delivery Address Card */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="font-semibold mb-2">Delivery Address</div>
            {/* Replace with actual address from user profile/context */}
            <div className="text-gray-700">
              {state.user?.defaultAddress ? (
                <>
                  <div className="font-semibold">{state.user.defaultAddress.name}</div>
                  <div className="text-gray-500 text-sm underline">{state.user.defaultAddress.mobile}</div>
                  <div>{state.user.defaultAddress.address}</div>
                  <div>
                    {state.user.defaultAddress.city}, {state.user.defaultAddress.state}, {state.user.defaultAddress.country}, {state.user.defaultAddress.pincode}
                  </div>
                </>
              ) : (
                <div className="text-gray-400">No default address set.</div>
              )}
            </div>
            <button
              className="mt-3 text-primary underline text-sm"
              type="button"
            >
              Change Address
            </button>
          </div>
          {/* Promo Code Input */}
          <div className="bg-white shadow rounded-lg p-4">
            <label  className="font-semibold mb-2" htmlFor="promo">
              Payment method
            </label>
            <div className="flex items-center gap-2">
              <input
                id="default"
                type="radio"
                name="payment_gateway"
                className="border rounded focus:outline-none"
                defaultChecked
              />
              <label htmlFor="default" className="text-sm">Paymongo</label>
            </div>
          </div>
          {/* Promo Code Input */}
          <div className="bg-white shadow rounded-lg p-4">
            <label  className="font-semibold mb-2" htmlFor="promo">
              Shipping Method
            </label>
            <div className="flex items-center gap-2">
              <input
                id="default"
                type="radio"
                name="shipping_method"
                className="border rounded focus:outline-none"
                value="lalamove"
                checked={methods.shipping.type==='lalamove'}
                onChange={handleSelectShipping}
              />
              <label htmlFor="default" className="text-sm">Lalamove</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="default"
                type="radio"
                name="shipping_method"
                className="border rounded focus:outline-none"
                value="ninjavan"
                checked={methods.shipping.type==='ninjavan'}
                onChange={handleSelectShipping}
              />
              <label htmlFor="default" className="text-sm">NinjaVan</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="default"
                type="radio"
                name="shipping_method"
                className="border rounded focus:outline-none"
                value="pickup"
                checked={methods.shipping.type==='pickup'}
                onChange={handleSelectShipping}
              />
              <label htmlFor="default" className="text-sm">Pick up at De La Salle University - Manila</label>
            </div>
          </div>
          {/* Cart Summary */}
          <div className="bg-gray-50 rounded p-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatPeso(subtotal)}</span>
            </div>
            {couponDetails.couponAmount > 0 && (
              <>
                <div className="flex justify-between mb-2 text-blue-600">
                    <span>Promo Eligible Items Total</span>
                  <span>{formatPeso(couponDetails.total_amount_with_coupon_discount)}</span>
                </div>
                <div className="flex justify-between mb-2 text-red-800">
                  <span>Coupon Discount</span>
                  <span>{formatPeso(couponDetails.couponAmount)}</span>
                </div>
              </>
            )}
            {methods.shipping.charges > 0 && (
              <>
                <div className="flex justify-between mb-2 text-blue-600">
                  <span>Shipping Charges</span>
                  <span>{formatPeso(methods.shipping.charges)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatPeso(subtotal - couponDetails.couponAmount + methods.shipping.charges)}</span>
            </div>
            {cartItems.length > 0 && (
              <button
                className="w-full mt-6 bg-primary text-black py-3 rounded hover:font-semibold transition"
                type="button"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 