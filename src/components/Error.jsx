import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const styles = { textAlign: "center" };
  const error = useRouteError();
  //   console.log(error);
  let errorEl = null;
  if (error.message && error.statusText && error.status) {
    errorEl = (
      <>
        <h1>{error.message}</h1>
        <pre>
          {error.status} - {error.statusText}
        </pre>
      </>
    );
  } else errorEl = <h1>Error Occured!</h1>;
  return (
    <>
      <header>
        <Link className="site-logo" to={"/"}>
          #VANLIFE
        </Link>
      </header>
      <section className="van-list-container" style={styles}>
        {errorEl}
      </section>
    </>
  );
}
