import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@styles/elementor.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@pages/customer/HomePage";
import AuthPage from "@pages/customer/AuthPage";
import CustomerMainLayout from "@layout/customer/CustomerMainLayout";
import {
  ProductsPage, 
  ProductsDetailPage, 
  ProductsCollectionPage
} from "@pages/customer/products";
import MerchantsPage from "@pages/customer/merchants/MerchantsPage";
import BecomeMerchant from "@pages/customer/merchants/BecomeMerchant";
import EmailConfirmed from "@pages/customer/merchants/EmailConfirmed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        path: "/auth/customer",
        element: <AuthPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
