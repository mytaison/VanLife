/* eslint-disable react-refresh/only-export-components */
// import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return getHostVans();
}

export default function HostVans() {
  //   const [vans, setVans] = useState([]);
  //   useEffect(() => {
  //     fetch(`/api/host/vans`)
  //       .then((res) => res.json())
  //       .then((data) => setVans(data.vans))
  //       .catch((err) => console.log(err));
  //   }, []);
  const vans = useLoaderData();
  console.log(vans);

  const hostVansEles = vans.map((van) => {
    return (
      <Link to={`${van.id}`} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single">
          <img src={van.imageUrl} alt={`photo-van-${van.id}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <section>
      <h1 className="host-vans-title">Your Listed Vans</h1>
      <div className="host-vans-list">
        {/* {vans.length > 0 ? ( */}
        <section>{hostVansEles}</section>
        {/* ) : (
          <h2>Loading...</h2>
        )} */}
      </div>
    </section>
  );
}
