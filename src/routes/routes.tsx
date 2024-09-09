import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main";
import DetailsProduct from "../pages/DetailsProduct";
import Home from "../pages/Home";
import Root from "./root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <Main>
            <Home />
          </Main>
        ),
      },
      {
        path: "/product/:slug",
        element: (
          <Main>
            <DetailsProduct />
          </Main>
        ),
      },
    ],
  },
]);
