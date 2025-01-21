const mode = "prod";
let baseUrl = "";

baseUrl = mode === "prod" ? "https://dashboard-q1qd.onrender.com" : "http://localhost:4000";

export default baseUrl;
