import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans.jsx";
import VanDetail from "./pages/Vans/VanDetail.jsx";
import Layout from "./components/Layout.jsx";
import HostLayout from "./components/HostLayout.jsx";
import Dashboard from "./pages/Hosts/Dashboard.jsx";
import HostIncome from "./pages/Hosts/HostIncome.jsx";
import HostReview from "./pages/Hosts/HostReview.jsx";
import HostVans from "./pages/Hosts/Vans/HostVans.jsx";
import HostVanDetail from "./pages/Hosts/Vans/HostVanDetail.jsx";
import HostVanPhotos from "./pages/Hosts/Vans/HostVanPhotos.jsx";
import HostVanPricing from "./pages/Hosts/Vans/HostVanPricing.jsx";
import HostVanInfo from "./pages/Hosts/Vans/HostVanInfo.jsx";
import NotFound404 from "./pages/404NotFound.jsx";
import Error from "./components/Error.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} loader={vansLoader} />
      <Route path="vans/:id" element={<VanDetail />} />
      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<HostIncome />} />
        <Route path="reviews" element={<HostReview />} />
        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVanDetail />}>
          <Route index element={<HostVanInfo />} />
          <Route path="pricing" element={<HostVanPricing />} />
          <Route path="photos" element={<HostVanPhotos />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
