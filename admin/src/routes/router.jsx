import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import SecureLayout from "../layout/SecureLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <SecureLayout />,
      },
    ],
  },
]);

export default router;
