import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function VanDetail() {
  const params = useParams();
  const [vanDetail, setVanDetail] = useState({});
  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((response) => response.json())
      .then((data) => setVanDetail(data.vans));
  }, [params.id]);

  console.log(params);
  return (
    <>
      <div className="van-detail-container">
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
