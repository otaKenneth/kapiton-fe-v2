import { MessageDialog, Header, Footer, useMessageDialog } from "@components";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@context/AppContext";
import { formatPeso } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import { updateProductInCart } from "@api";

type Cart = {
  id: number;
  product_name: string;
  product_price: number;
  discounted_price?: number;
  product_discount: number;
}

const CustomerMainLayout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const { state, setState } = useAppContext();
  const { showMessage } = useMessageDialog();

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

  React.useEffect(() => {
    let newSubtotal = 0;
    state.cart.forEach(item => {
      const price = item.product.product_discount > 0 ? item.product.discounted_price : item.product.product_price;
      newSubtotal += price * item.quantity;
    });
    setSubtotal(newSubtotal);
  }, [state.cart]);

  return (
    <div className="bg-primaryBackground overflow-x-hidden">
      <Header onCartClick={() => setCartOpen(true)} />
      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 flex flex-col justify-between bg-white shadow-lg z-[100] transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ maxWidth: '90vw' }}
      >
        <div>
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-semibold font-primary">Your Cart</h2>
            <button onClick={() => setCartOpen(false)} className="text-xl font-bold">&times;</button>
          </div>
          <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            {state.cart?.length > 0 ? (
              state.cart.map(item => {
                let price = item.product.product_discount > 0 ? item.product.discounted_price : item.product.product_price;
                
                return (
                  <div key={item.id} className="p-4 border-b flex justify-between items-center">
                    <div style={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <h3 className="font-semibold" title={item.product.product_name}>{item.product.product_name}</h3>
                      <p className="text-xs text-gray-400">{item.color} - {item.size}</p>
                      <div className="flex items-center gap-x-2">
                        <p className="text-sm text-gray-900 font-semibold">
                          {formatPeso(price)}
                        </p>
                        {item.product.product_discount > 0 && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPeso(item.product.product_price)}
                          </span>
                        )}
                      </div>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          Total: <span className="font-semibold">{formatPeso(price * item.quantity)}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <button className="px-2 py-1 bg-gray-200 rounded-l" onClick={(e) => handleDecrease(item)}> - </button>
                      <span className="px-3">{item.quantity}</span>
                      <button className="px-2 py-1 bg-gray-200 rounded-r" onClick={(e) => handleIncrease(item)}> + </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-4 text-gray-500 font-body text-sm">Cart is empty.</div>
            )}
          </div>
        </div>

        <div className="bottom-0 px-4 relative border-t py-4">
          <p className="text-sm text-gray-600 pb-5">Subtotal: <span className="font-semibold">{formatPeso(subtotal)}</span></p>
          <button className="bg-primaryContrast text-white font-primary font-semibold text-sm w-full py-2 rounded-full">Checkout</button>
        </div>
      </div>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[99]"
          onClick={() => setCartOpen(false)}
        />
      )}
      <main className="bg-primaryBackground mt-[5rem] md:mt-[9rem]">
        <Outlet />
      </main>
      <Footer />
      <MessageDialog />
    </div>
  );
};

export default CustomerMainLayout;
