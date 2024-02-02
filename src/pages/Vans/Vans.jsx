// import { useState, useEffect } from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
  // throw new Error("failed to get data!");
  return getVans();
}

export default function Vans() {
  // const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const vans = useLoaderData();
  console.log(vans);

  const displayVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;

  const vanElements = displayVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={`${van.id}`}
        state={{ search: searchParams.toString(), type: typeFilter }}
      >
        <img src={van.imageUrl} alt={van.id + "_image"} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            {van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParam) => {
      if (value === null) {
        prevParam.delete(key);
      } else {
        prevParam.set(key, value);
      }
      return prevParam;
    });
  }
  return (
    <>
      <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
          <button
            type="button"
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            }`}
            onClick={() => handleFilterChange("type", "simple")}
          >
            Simple
          </button>
          <button
            type="button"
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            }`}
            onClick={() => handleFilterChange("type", "rugged")}
          >
            Rugged
          </button>

          <button
            type="button"
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            }`}
            onClick={() => handleFilterChange("type", "luxury")}
          >
            Luxury
          </button>

          {typeFilter && (
            <button
              type="button"
              className="van-type clear-filters"
              onClick={() => handleFilterChange("type", null)}
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="van-list">{vanElements}</div>
        <br />
      </div>
    </>
  );
}
