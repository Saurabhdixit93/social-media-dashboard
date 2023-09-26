import jsCookie from "js-cookie";
import jwt_decode from "jwt-decode";

export const getTokenCookie = () => {
  return jsCookie.get("USER_SESSION_COOKIE");
};

// get-userid from token
export const getUserFromToken = (token) => {
  try {
    const decodedToken = jwt_decode(token);

    const user = {
      userId: decodedToken.userId || null,
    };

    return user;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
