import { MessageDialog, Header, Footer } from "@components";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@context/AppContext";

const CustomerMainLayout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { state } = useAppContext();

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
              state.cart.map(item => (
                <div key={item.id} className="p-4 border-b flex justify-between items-center">
                  <div style={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <h3 className="font-semibold" title={item.product.product_name}>{item.product.product_name}</h3>
                    <p className="text-xs text-gray-400">{item.color} - {item.size}</p>
                    <p className="text-sm text-gray-500">{item.product.product_price}</p>
                  </div>
                  <div>
                    <button className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                    <span className="px-3">{item.quantity}</span>
                    <button className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-500 font-body text-sm">Cart is empty.</div>
            )}
          </div>
        </div>

        <div className="bottom-0 px-4 relative py-4">
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
