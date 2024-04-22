import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, Landing, Register, Error } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
  },

  {
    path: "landing",
    element: <Landing />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
