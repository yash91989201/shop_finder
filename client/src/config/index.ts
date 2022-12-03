const api_baseurl =
  process.env.NODE_ENV === "production"
    ? "http://localhost:80/api/v1"
    : "http://localhost:3000/api/v1";

export { api_baseurl };
