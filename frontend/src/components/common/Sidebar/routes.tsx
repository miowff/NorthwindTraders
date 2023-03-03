import {
  Badge,
  DisplaySettings,
  Group,
  Home,
  Inventory,
  ProductionQuantityLimits,
  Search,
  ShoppingCart,
} from '@mui/icons-material';
import React, { ReactNode } from 'react';

export interface Route {
  name: string,
  path: string,
  icon: ReactNode | null,
}

const routes = {
  home: {
    name: 'Home',
    path: '/',
    icon: <Home />,
  } as Route,
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DisplaySettings />,
  } as Route,
  suppliers: {
    name: 'Suppliers',
    path: '/suppliers',
    icon: <Inventory />,
  } as Route,
  products: {
    name: 'Products',
    path: '/products',
    icon: <ProductionQuantityLimits />,
  } as Route,
  orders: {
    name: 'Orders',
    path: '/orders',
    icon: <ShoppingCart />,
  } as Route,
  employees: {
    name: 'Employees',
    path: '/employees',
    icon: <Badge />,
  } as Route,
  customers: {
    name: 'Customers',
    path: '/customers',
    icon: <Group />,
  } as Route,
  search: {
    name: 'Search',
    path: '/search',
    icon: <Search />,
  } as Route,
};

export default routes as { [key in keyof typeof routes]: Route };
