import React from "react";
import { useMessageDialog } from "@components";
import { useAppContext } from "@context/AppContext";
import { formatPeso } from "@lib/utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateProductInCart, deliveryAddresses, checkPromoCode } from "@api";

type Cart = {
  id: number;
  product_name: string;
  product_price: number;
  discounted_price?: number;
  product_discount: number;
}

const Cart: React.FC = () => {
  const { state, setState } = useAppContext();
  const { showMessage } = useMessageDialog();
  const [coupon, setCoupon] = React.useState('');
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [couponDetails, setCouponDetails] = React.useState({
    'couponAmount': 0,
    'total_amount_with_coupon_discount': 0,
    'grand_total': 0
  });
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.product_discount > 0 ? item.product.discounted_price : item.product.product_price) * item.quantity,
    0
  );

  const deliveryAddressesQuery = useQuery({
    queryKey: ['deliveryAddresses', state.token],
    queryFn: () => deliveryAddresses(state.token),
    select: (data : any) => data.data,
  });

  const checkPromoCodeMutation = useMutation({
    mutationFn: (data : object) => checkPromoCode(state.token, data),
    onSuccess: (resp : any) => {
      setCartItems(resp.data);
      setCouponDetails({
        couponAmount: resp.couponAmount,
        total_amount_with_coupon_discount: resp.total_amount_with_coupon_discount,
        grand_total: resp.grand_total
      });
      showMessage({
        open: true,
        title: 'Success',
        message: resp.message,
        type: 'success'
      })
    },
    onError: (error) => {
      setCartItems(state.cart);
      setCouponDetails({
        couponAmount: 0,
        total_amount_with_coupon_discount: subtotal,
        grand_total: subtotal
      });
      showMessage({
        open: true,
        title: 'Invalid Coupon',
        message: error.message,
        type: 'error'
      })
    }
  });

  const updateCartItemQuantityMutation = useMutation({
    mutationFn: (data : object) => updateProductInCart(state.token, data),
    onSuccess: (resp : any) => {
      showMessage({
        open: true,
        title: 'Success',
        message: resp.message,
        type: 'success'
      })
      setState(prev => ({
        ...prev,
        cart: resp.data
      }))
    },
    onError: (error) => {
      showMessage({
        open: true,
        title: 'Error',
        message: error.message,
        type: 'error'
      })
    }
  })

  const handleDecrease = (cart : Cart) => {
    showMessage({
      open: true,
      title: 'Info',
      message: 'Sending update request...',
      type: 'info'
    })
    let data = {
      ...cart,
      action: 'decrement',
      guest_token: state.guest_token
    }
    updateCartItemQuantityMutation.mutate(data);
  }

  const handleIncrease = (cart : Cart) => {
    showMessage({
      open: true,
      title: 'Info',
      message: 'Sending update request...',
      type: 'info'
    })
    let data = {
      ...cart,
      action: 'increment',
      guest_token: state.guest_token
    }
    updateCartItemQuantityMutation.mutate(data);
  }

  const handleCheckPromoCode = () => {
    checkPromoCodeMutation.mutate({ guest_token: state.guest_token, code: coupon });
  }

  React.useEffect(() => {
    if (deliveryAddressesQuery.isFetched && deliveryAddressesQuery.data) {
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user,
          defaultAddress: deliveryAddressesQuery.data[0],
          deliveryAddresses: deliveryAddressesQuery.data
        }
      }))
    }
  }, [deliveryAddressesQuery.isFetched])

  React.useEffect(() => {
    setCartItems(state.cart);
  }, [state.cart])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {/* Layout: Cart list on the left, promo and address on the right */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Left: Cart List */}
        <div className="bg-white shadow rounded-lg p-4 flex-[2]">
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
                <div className="col-span-3 flex flex-col">
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
                {/* Quantity Controls */}
                <div className="col-span-1 flex items-center justify-center">
                  <button className="px-2 py-1 bg-gray-200 rounded-l" onClick={() => handleDecrease(item)}> - </button>
                  <span className="px-3">{item.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 rounded-r" onClick={() => handleIncrease(item)}> + </button>
                </div>
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
            <label className="block text-sm font-medium mb-2" htmlFor="promo">
              Promo Code
            </label>
            <div className="flex">
              <input
                id="promo"
                type="text"
                className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
                placeholder="Enter promo code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                className="bg-primary text-black px-4 py-2 rounded-r hover:font-semibold transition"
                type="button"
                onClick={handleCheckPromoCode}
              >
                Apply
              </button>
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
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatPeso(subtotal - couponDetails.couponAmount)}</span>
            </div>
            <button
              className="w-full mt-6 bg-primary text-black py-3 rounded hover:font-semibold transition"
              type="button"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
