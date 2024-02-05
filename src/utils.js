import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("loggedin");
  if (!JSON.parse(isLoggedIn)) {
    const message = "You must login first.";
    console.log("Not logged In");
    const response = redirect(
      `/login?message=${message}&redirectUrl=${pathname}`
    );
    console.log(response);
    try {
      response.body = true;
    } catch (err) {
      console.log(err.message);
    }
    return response;
  }
  return null;
}
