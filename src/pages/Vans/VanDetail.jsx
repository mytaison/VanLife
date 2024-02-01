import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
export default function VanDetail() {
  const params = useParams();
  const [vanDetail, setVanDetail] = useState({});
  const location = useLocation();
  console.log(location);
  const searchQuery = "?" + location.state?.search || "";
  const typeFilter = location.state?.type || "all";

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((response) => response.json())
      .then((data) => setVanDetail(data.vans));
  }, [params.id]);

  console.log(params);
  return (
    <>
      <div className="van-detail-container">
        <Link to={`..${searchQuery}`} relative="path" className="back-button">
          &larr; <span>Back to {typeFilter} vans</span>
        </Link>
        {vanDetail ? (
          <div className="van-detail">
            <img
              src={vanDetail.imageUrl}
              alt={`van-${vanDetail.id}-${vanDetail.name}`}
            />
            <i className={`van-type ${vanDetail.type} selected`}>
              {vanDetail.type}
            </i>
            <h2>{vanDetail.name}</h2>
            <p className="van-price">
              <span>{vanDetail.price}</span>/day
            </p>
            <p>{vanDetail.description}</p>
            <button type="button" className="link-button">
              Rent this van
            </button>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}
