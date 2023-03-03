import { CustomerModel } from '@backend/models/customer-models/customer';
import { CustomerDetails } from '@backend/models/customer-models/customerDetails';
import { SearchResultCustomer } from '@backend/models/customer-models/searchResultCustomer';
import { EmployeeModel } from '@backend/models/employees-models/employee';
import { EmployeeDetails } from '@backend/models/employees-models/employeeDetails';
import { OrderModel } from '@backend/models/order-models/order';
import { OrderDetails } from '@backend/models/order-models/orderDetails';
import { ProductModel } from '@backend/models/product-models/product';
import { ProductDetails } from '@backend/models/product-models/productDetails';
import { SearchResultProduct } from '@backend/models/product-models/searchResultProduct';
import { GetAllDto } from '@backend/models/response/getAllResponse';
import { GetOneDto } from '@backend/models/response/response';
import { SupplierModel } from '@backend/models/supplier-models/supplier';
import { SupplierDetails } from '@backend/models/supplier-models/supplierDetails';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://047amgofnf.execute-api.us-east-1.amazonaws.com/dev',
});

export const getSuppliers = () => httpClient.get<GetAllDto<SupplierModel>>('/suppliers');
export const getSupplierById = (id: number) => httpClient.get<GetOneDto<SupplierDetails>>(`/supplier?id=${id}`);

export const getProducts = () => httpClient.get<GetAllDto<ProductModel>>('/products');
export const getProductById = (id: number) => httpClient.get<GetOneDto<ProductDetails>>(`/product?id=${id}`);

export const getOrders = () => httpClient.get<GetAllDto<OrderModel>>('/orders');
export const getOrderById = (id: number) => httpClient.get<GetOneDto<OrderDetails>>(`/order?id=${id}`);

export const getEmployees = () => httpClient.get<GetAllDto<EmployeeModel>>('/employees');
export const getEmployeeById = (id: number) => httpClient.get<GetOneDto<EmployeeDetails>>(`/employee?id=${id}`);

export const getCustomers = () => httpClient.get<GetAllDto<CustomerModel>>('/customers');
export const getCustomerById = (id: string) => httpClient.get<GetOneDto<CustomerDetails>>(`/customer?id=${id}`);

export const searchProducts = (pattern: string) => httpClient.get<GetAllDto<SearchResultProduct>>(`/search?type=Products&pattern=${pattern}`);
export const searchCustomers = (pattern: string) => httpClient.get<GetAllDto<SearchResultCustomer>>(`/search?type=Customers&pattern=${pattern}`);
