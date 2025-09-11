import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@styles/elementor.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "@context/AppContext";
import HomePage from "@pages/customer/HomePage";
import AuthPage from "@pages/customer/AuthPage";
import ForgotPassword from "@pages/customer/ForgotPassword";
import CustomerMainLayout from "@layout/customer/CustomerMainLayout";
import {
  ProductsPage, 
  ProductsDetailPage, 
  ProductsCollectionPage
} from "@pages/customer/products";
import {
  Cart
} from "@pages/customer/checkout";
import {
  MerchantsPage,
  BecomeMerchant,
  EmailConfirmed
} from "@pages/customer/merchants";
import {
  UserPage, Profile, DeliveryAddresses,
  ChangePassword, OrdersList, Wishlist, Chats
} from '@pages/customer/user_account';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// localStorage.removeItem('token');
// localStorage.removeItem('user');

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerMainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/products",
        element: <ProductsPage />,
        children: [
          {
            path: ":collectType/:collectionId",
            element: <ProductsCollectionPage />,
          },
          {
            path: ":id",
            element: <ProductsDetailPage />,
          },
        ],
      },
      {
        path: "/merchants",
        element: <MerchantsPage />
      },
      {
        path: "/vendor/confirm/:code",
        element: <EmailConfirmed />
      },
      {
        path: "/become-merchant",
        element: <BecomeMerchant />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: "/auth/customer",
        children: [
          {
            path: '',
            element: <AuthPage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          }
        ]
      },
      {
        path: '/user',
        element: <UserPage />,
        children: [
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'delivery-addresses',
            element: <DeliveryAddresses />
          },
          {
            path: 'change-password',
            element: <ChangePassword />
          },
          {
            path: 'orders',
            element: <OrdersList />
          },
          {
            path: 'wishlist',
            element: <Wishlist />
          },
          {
            path: 'chats',
            element: <Chats />
          },
        ]
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);
