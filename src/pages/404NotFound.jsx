import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <div className="not-found-container">
      <h1>Sorry, the page you are looking for was not found.</h1>
      <Link to="/" className="link-button">
        Return to Home
      </Link>
    </div>
  );
}
