import axios from "axios";

const cliente = axios.create();

// cliente.interceptors.request.use(
//   (config) => {
//     if (localStorage.getItem("key")) {
//       const sid = localStorage.getItem("key");
//       config.headers["session-id"] = sid;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// cliente.interceptors.response.use(
//   (response) => {
//     const sid = response.headers["session-id"];
//     if (sid) {
//       localStorage.setItem("key", sid);
//       cliente.defaults.headers["session-id"] = sid;
//     }

//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status == 401) {
//       if (window != "undefined" && !!window?.location) {
//         window.location.href = "/login";
//       }
//       localStorage.removeItem("session");
//     }
//     return Promise.reject(error);
//   }
// );

cliente.defaults.headers["Content-Type"] = "application/json";
//cliente.defaults.headers["session-id"] = null;

//equipments and categories

export const GetCategories = () =>
  cliente.get("http://localhost:5029/api/category").then((t) => t.data);

export const GetEquipmentByCategory = (id) =>
  cliente
    .get(`http://localhost:5029/api/equipment/category/${id}`)
    .then((t) => t.data);

export const GetEquipment = (params) =>
  cliente
    .get("http://localhost:5029/api/equipment", { params })
    .then((t) => t.data);

export const AddEquipment = (data) =>
  cliente
    .post("http://localhost:5029/api/equipment", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((t) => t.data);
export const EditEquipment = (data) =>
  cliente
    .put(`http://localhost:5029/api/equipment/${data?.equipmentId}`, data)
    .then((t) => t.data);

export const AddCategory = (data) =>
  cliente.post("http://localhost:5029/api/category", data).then((t) => t.data);
export const SearchEquipmentByName = (name) =>
  cliente
    .get("http://localhost:5029/api/equipment/search/name", {
      params: { name }
    })
    .then((t) => t.data);
//loans

export const GetLoans = (params) =>
  cliente.get("http://localhost:5026/api/loan", { params }).then((t) => t.data);

export const GetLoansById = (id) =>
  cliente.get(`http://localhost:5026/api/loan/user/${id}`).then((t) => t.data);
export const PostLoan = (data) =>
  cliente.post("http://localhost:5026/api/loan", data).then((t) => t.data);

export const PutLoan = (id) =>
  cliente.put(`http://localhost:5026/api/loan/${id}`).then((t) => t.data);

//users
export const LoginUser = (body) =>
  cliente
    .post(`http://localhost:5028/api/users/${body?.email}/login`, body)
    .then((t) => t.data);
export const RegisterUser = (body) =>
  cliente.post(`http://localhost:5028/api/users`, body).then((t) => t.data);

export const GetUsers = () =>
  cliente.get("http://localhost:5027/api/users").then((t) => t.data);

export const GetUserById = (id) =>
  cliente.get(`http://localhost:5027/api/users/${id}`).then((t) => t.data);

export const PutUser = (data) =>
  cliente
    .put(`http://localhost:5027/api/users/${data?.userId}`, data)
    .then((t) => t.data);
export const SearchUsersByName = (name) =>
  cliente
    .get("http://localhost:5027/api/user/search/name", { params: { name } })
    .then((t) => t.data);
//role

export const GetRoles = () =>
  cliente.get("http://localhost:5027/api/userRole").then((t) => t.data);

export const GetActiveInactiveEquipments = () =>
  cliente
    .get("http://localhost:5029/api/activeInactiveEquipments")
    .then((t) => t.data);
export const GetActiveInactiveLoans = () =>
  cliente.get("/activeInactiveLoans").then((t) => t.data);
export const GetActiveInactiveUsers = () =>
  cliente.get("/activeInactiveUsers").then((t) => t.data);
