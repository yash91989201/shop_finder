const api_baseurl =
  process.env.NODE_ENV === "production"
    ? "http://127.0.0.1:80/api/v1"
    : "http://127.0.0.1:3000/api/v1";

export { api_baseurl };
