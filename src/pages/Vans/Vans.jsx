/* eslint-disable react-refresh/only-export-components */
// import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";
import { Suspense } from "react";

export async function loader() {
  const vansPromise = getVans();
  console.log(vansPromise);
  return defer({
    vans: await vansPromise,
  });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const vansDataPromise = useLoaderData();
  console.log(vansDataPromise);

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

  const renderDeferredVans = (vans) => {
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
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <div className="van-list-container">
        <h1>Explore our van options</h1>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Await resolve={vansDataPromise.vans}>{renderDeferredVans}</Await>
        </Suspense>
      </div>
    </>
  );
}
