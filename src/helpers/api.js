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


//loans

export const GetLoans =(id) =>
cliente.get(`loan/user/${id}`).then((t) => t.data);


//users

export const GetUsers = () =>
  cliente.get("/user").then((t) => t.data);

export const GetUserById = (id) =>
  cliente.get(`/users/${id}`).then((t) => t.data);

export const PutUser = (data) =>
  cliente.put(`/users/${data?.userId}`, data).then((t) => t.data);

