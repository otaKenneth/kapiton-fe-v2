import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@pages/customer/HomePage";
import MerchantsPage from "@pages/customer/merchants/MerchantsPage";
import ProductsPage from "@pages/customer/products/ProductsPage";
import AuthPage from "@pages/customer/AuthPage";
import ProductsDetailPage from "@pages/customer/products/ProductsDetailPage";
import MerchantsDetailsPage from "@pages/customer/merchants/MerchantsDetailsPage";
import CustomerMainLayout from "@layout/customer/CustomerMainLayout";
import ProductsCollectionPage from "@pages/customer/products/ProductCollectionPage";
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
            path: "collections/:collectionId",
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
        element: <MerchantsPage />,
        children: [
          {
            path: ":id",
            element: <MerchantsDetailsPage />,
          },
        ],
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
