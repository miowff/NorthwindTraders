import React from 'react';
import { Route, Routes } from 'react-router';
import styled from 'styled-components';

import Customers from '@/components/Customers';
import CustomerDetail from '@/components/Customers/CustomerDetail';
import Employees from '@/components/Employees';
import EmployeeDetail from '@/components/Employees/EmployeeDetail';
import Orders from '@/components/Orders';
import OrderDetail from '@/components/Orders/OrderDetail';
import Products from '@/components/Products';
import ProductDetail from '@/components/Products/ProductDetail';
import Search from '@/components/Search';
import SupplierDetail from '@/components/Suppliers/SupplierDetail';

import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import routes from './components/common/Sidebar/routes';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Suppliers from './components/Suppliers';

const App: React.FC = () => {
  return (
    <GridContainer>
      <StyledSidebar />
      <StyledHeader />
      <StyledContent>
        <Routes>
          <Route path={routes.home.path} element={<Home />} />
          <Route path={routes.dashboard.path} element={<Dashboard />} />
          <Route path={routes.suppliers.path} element={<Suppliers />} />
          <Route path={`${routes.suppliers.path}/:supplierId`} element={<SupplierDetail />} />
          <Route path={routes.orders.path} element={<Orders />} />
          <Route path={`${routes.orders.path}/:orderId`} element={<OrderDetail />} />
          <Route path={routes.products.path} element={<Products />} />
          <Route path={`${routes.products.path}/:productId`} element={<ProductDetail />} />
          <Route path={routes.employees.path} element={<Employees />} />
          <Route path={`${routes.employees.path}/:employeeId`} element={<EmployeeDetail />} />
          <Route path={routes.customers.path} element={<Customers />} />
          <Route path={`${routes.customers.path}/:customerId`} element={<CustomerDetail />} />
          <Route path={routes.search.path} element={<Search />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </StyledContent>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-areas:
          "sidebar header"
          "sidebar content";
  grid-template-columns: 300px auto;
  grid-template-rows: 70px auto;
`;

const StyledSidebar = styled(Sidebar)`
  grid-area: sidebar;
`;

const StyledHeader = styled(Header)`
  grid-area: header;
`;

const StyledContent = styled.div`
  grid-area: content;
  overflow: auto;
`;

export default App;
