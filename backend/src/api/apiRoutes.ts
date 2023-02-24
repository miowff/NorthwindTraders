import axios from "axios";

export const getAllEmployess = async (): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/employees`);
  return response.data;
};

export const getAllCustomers = async (): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/customers`);
  return response.data;
};

export const getAllSuppliers = async (): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/suppliers`);
  return response.data;
};

export const getAllOrders = async (): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/orders`);
  return response.data;
};

export const getAllProducts = async (): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/products`);
  return response.data;
};

export const getCustomerById = async (id: string): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/customer`, {
    params: { id: id },
  });
  return response.data;
};

export const getEmployeeById = async (id: number): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/employee`, {
    params: { id: id },
  });
  return response.data;
};

export const getOrderById = async (id: number): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/order`, {
    params: { id: id },
  });
  return response.data;
};
export const getProductById = async (id: number): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/product`, {
    params: { id: id },
  });
  return response.data;
};
export const getSupplierById = async (id: number): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/supplier`, {
    params: { id: id },
  });
  return response.data;
};

//entity = "customers" | "products" other values cause an error
export const search = async (entity: string, pattern: string): Promise<any> => {
  const response = await axios.get(`${process.env.API_ENDPOINT}/dev/search`, {
    params: { type: entity, pattern: pattern },
  });
  return response.data;
};
