const HOST_IP = window.location.host.split(":")[0];
const PORT = process.env.NODE_ENV === "production" ? "80" : "3000";

const api_baseurl = `http://${HOST_IP}:${PORT}/api/v1`;

export { api_baseurl };
