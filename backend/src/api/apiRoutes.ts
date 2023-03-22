import axios from "axios";
import getEnv from "src/services/utils/getEnv";

const API_ENDPOINT = getEnv("API_ENDPOINT");

export const getAllEmployees = async (): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/employees`);
  return response;
};

export const getAllCustomers = async (): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/customers`);
  return response;
};

export const getAllSuppliers = async (): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/suppliers`);
  return response;
};

export const getAllOrders = async (): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/orders`);
  return response;
};

export const getAllProducts = async (): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/products`);
  return response;
};

export const getCustomerById = async (id: string): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/customer`, {
    params: { id: id },
  });
  return response;
};

export const getEmployeeById = async (id: number): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/employee`, {
    params: { id: id },
  });
  return response;
};

export const getOrderById = async (id: number): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/order`, {
    params: { id: id },
  });
  return response;
};
export const getProductById = async (id: number): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/product`, {
    params: { id: id },
  });
  return response;
};
export const getSupplierById = async (id: number): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/supplier`, {
    params: { id: id },
  });
  return response;
};

//entity = "Customers" | "Products" other values cause an error
export const search = async (entity: string, pattern: string): Promise<any> => {
  const { data: response } = await axios.get(`${API_ENDPOINT}/dev/search`, {
    params: { type: entity, pattern: pattern },
  });
  return response;
};
