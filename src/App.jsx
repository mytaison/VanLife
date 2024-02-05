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
import VanDetail, {
  loader as vanDetailLoader,
} from "./pages/Vans/VanDetail.jsx";
import Layout from "./components/Layout.jsx";
import HostLayout from "./components/HostLayout.jsx";
import Dashboard from "./pages/Hosts/Dashboard.jsx";
import HostIncome from "./pages/Hosts/HostIncome.jsx";
import HostReview from "./pages/Hosts/HostReview.jsx";
import HostVans, {
  loader as hostVansLoader,
} from "./pages/Hosts/Vans/HostVans.jsx";
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/Hosts/Vans/HostVanDetail.jsx";
import HostVanPhotos from "./pages/Hosts/Vans/HostVanPhotos.jsx";
import HostVanPricing from "./pages/Hosts/Vans/HostVanPricing.jsx";
import HostVanInfo from "./pages/Hosts/Vans/HostVanInfo.jsx";
import NotFound404 from "./pages/404NotFound.jsx";
import Error from "./components/Error.jsx";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login.jsx";
import { requireAuth } from "./utils.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route path="vans" element={<Vans />} loader={vansLoader} />
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />
      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="income"
          element={<HostIncome />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="reviews"
          element={<HostReview />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
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
