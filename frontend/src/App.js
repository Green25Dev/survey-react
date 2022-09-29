import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout'
import Home from "./components/pages/Home";
import Survey from "./components/pages/Survey";
import End from "./components/pages/End";
import ErrorPage from "./components/Errorpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/survey",
    element: <Survey />,
  },
  {
    path: "/end",
    element: <End />,
  },
]);

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
