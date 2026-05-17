import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";
import ErrorTestButton from "./components/error-boundary/error-test-button";
import "./index.css";
import AboutPage from "./pages/about/about-page";
import DetailsPage from "./pages/details/details-page";
import App from "./pages/home/App";
import NotFoundPage from "./pages/not-found/not-found-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "details/:detailsId",
        element: <DetailsPage />,
      },
    ],
  },
  { path: "/about", element: <AboutPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />

      <ErrorTestButton />
    </ErrorBoundary>
  </StrictMode>,
);
