import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard";
import Upload from "../components/Upload";
import Read from "../components/Read";
const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/upload",
      element: <Upload />,
    },
    {
      path: "/read/:id",
      element: <Read />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
