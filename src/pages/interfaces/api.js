import axios from "axios";

// Define la URL base para localhost y para el entorno en línea
const LOCAL_API_BASE_URL = "http://localhost:3000/api";
//const ONLINE_API_BASE_URL = "https://vivemas-py.onrender.com/py";
const ONLINE_API_BASE_URL = "https://vps-aff6ee56.vps.ovh.ca/vivemas-api/api";

// Determina si la aplicación está en ejecución local o en línea
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// Selecciona la URL base según la condición
export const API_BASE_URL = isLocalhost ? LOCAL_API_BASE_URL : ONLINE_API_BASE_URL;

const SECRET_KEY = "secreto998877"; // Reemplaza esto con tu clave secreta

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authenticatedApi = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    /* headers: {
      "X-API-Key": SECRET_KEY,
    },
    */
  });

  return instance;
};

export default api;
