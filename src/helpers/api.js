import axios from "axios";

const cliente = axios.create();

cliente.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("key")) {
      const sid = localStorage.getItem("key");
      config.headers["session-id"] = sid;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

cliente.interceptors.response.use(
  (response) => {
    const sid = response.headers["session-id"];
    if (sid) {
      localStorage.setItem("key", sid);
      cliente.defaults.headers["session-id"] = sid;
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      if (window != "undefined" && !!window?.location) {
        window.location.href = "/login";
      }
      localStorage.removeItem("session");
    }
    return Promise.reject(error);
  }
);

cliente.defaults.baseURL = import.meta.env.VITE_API_URL;
cliente.defaults.headers["Content-Type"] = "application/json";
cliente.defaults.headers["session-id"] = null;

//equipments and categories

export const GetCategories = () => cliente.get("/category").then((t) => t.data);

export const GetEquipment = (params) =>
  cliente.get("/equipment", { params }).then((t) => t.data);

export const AddEquipment = (data) =>
  cliente
    .post("/equipment", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((t) => t.data);
export const EditEquipment = (data) =>
  cliente.put(`/equipment/${data?.equipmentId}`, data).then((t) => t.data);

//loans

export const GetLoans = (params) =>
  cliente.get("/loan", { params }).then((t) => t.data);

export const GetLoansById = (id) =>
  cliente.get(`loan/user/${id}`).then((t) => t.data);
export const PostLoan = (data) =>
  cliente.post("/loan", data).then((t) => t.data);
export const GetLoans = () => cliente.get("/loan").then((t) => t.data);

export const PutLoan = (id) => cliente.put(`/loan/${id}`).then((t) => t.data);

//users
export const LoginUser = (body) =>
  cliente.post(`/users/${body?.email}/login`, body).then((t) => t.data);
export const RegisterUser = (body) =>
  cliente.post(`/users`, body).then((t) => t.data);

export const GetUsers = () => cliente.get("/users").then((t) => t.data);

export const GetUserById = (id) =>
  cliente.get(`/users/${id}`).then((t) => t.data);

export const PutUser = (data) =>
  cliente.put(`/users/${data?.userId}`, data).then((t) => t.data);

//role

export const GetRoles = () => cliente.get("/userRole").then((t) => t.data);

export const GetActiveInactiveEquipments = () =>
  cliente.get("/activeInactiveEquipments").then((t) => t.data);
export const GetActiveInactiveLoans = () =>
  cliente.get("/activeInactiveLoans").then((t) => t.data);
export const GetActiveInactiveUsers = () =>
  cliente.get("/activeInactiveUsers").then((t) => t.data);
