import axios from "axios";

const cliente = axios.create();


cliente.defaults.baseURL = import.meta.env.VITE_API_URL;
cliente.defaults.headers["Content-Type"] = "application/json";
console.log("cliente.defaults.baseURL",cliente.defaults.baseURL)


//equipments and categories

export const GetCategories = () =>
  cliente.get("/category").then((t) => t.data);

export const GetEquipment = (params) =>
  cliente.get("/equipment", { params }).then((t) => t.data);

