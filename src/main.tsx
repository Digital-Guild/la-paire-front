import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "./styles/initialyse.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
