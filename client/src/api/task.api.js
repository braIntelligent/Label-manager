import axios from "axios";

const labelApi = axios.create({
  baseURL: "http://localhost:8000/labels/api/v1/labels",
});

export const getAllLabels = () => labelApi.get("/");
export const getLabel = (id) => labelApi.get(`/${id}/`)
export const createLabel = (label) => labelApi.post("/", label);
export const deleteLabel = (id) => labelApi.delete(`/${id}/`);
export const updateLabel = (id, task) => labelApi.put(`/${id}/`, task)