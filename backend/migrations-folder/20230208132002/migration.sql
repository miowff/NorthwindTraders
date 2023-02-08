CREATE TABLE `Categories` (
	`CategoryID` int PRIMARY KEY NOT NULL,
	`CategoryName` varchar(50) NOT NULL,
	`Description` varchar(256)
);

CREATE TABLE `Customers` (
	`CustomerID` serial PRIMARY KEY NOT NULL,
	`CompanyName` varchar(60) NOT NULL,
	`ContactName` varchar(60) NOT NULL,
	`ContactTitle` varchar(60) NOT NULL,
	`Address` varchar(60),
	`City` varchar(60),
	`Region` varchar(25),
	`PostalCode` varchar(60),
	`Country` varchar(60),
	`Phone` varchar(60),
	`Fax` varchar(60)
);

CREATE TABLE `Employees` (
	`EmployeeID` int PRIMARY KEY NOT NULL,
	`LastName` varchar(60) NOT NULL,
	`FirstName` varchar(60) NOT NULL,
	`Title` varchar(60),
	`TitleOfCourtesy` varchar(10),
	`BirthDate` date,
	`HireDate` date,
	`Address` varchar(60),
	`City` varchar(60),
	`Region` varchar(60),
	`PostalCode` varchar(60),
	`Country` varchar(60),
	`HomePhone` varchar(60),
	`Extension` varchar(60),
	`Notes` varchar(60),
	`ReportsTo` varchar(60)
);

CREATE TABLE `EmployeeTerritories` (
	`EmployeeID` int NOT NULL,
	`TerritoryID` int NOT NULL
);

CREATE TABLE `OrderDetails` (
	`OrderID` int NOT NULL,
	`ProductID` int NOT NULL,
	`UnitPrice` float NOT NULL,
	`Quantity` int NOT NULL,
	`Discount` float NOT NULL
);

CREATE TABLE `Orders` (
	`OrderID` int PRIMARY KEY NOT NULL,
	`CustomerID` serial,
	`EmployeeID` int,
	`OrderDate` datetime,
	`RequiredDate` datetime,
	`ShippedDate` datetime,
	`ShipVia` int,
	`Freight` float,
	`ShipName` varchar(60),
	`ShipAddress` varchar(60),
	`ShipCity` varchar(60),
	`ShipRegion` varchar(60),
	`ShipPostalCode` varchar(60),
	`ShipCountry` varchar(60)
);

CREATE TABLE `Products` (
	`ProductID` int PRIMARY KEY NOT NULL,
	`ProductName` varchar(60) NOT NULL,
	`QuantityPerUnit` varchar(60) NOT NULL,
	`UnitPrice` smallint NOT NULL,
	`UnitsInStock` smallint NOT NULL,
	`UnitsOnOrder` smallint NOT NULL,
	`ReorderLevel` smallint NOT NULL,
	`Discontinued` tinyint NOT NULL,
	`SupplierID` int NOT NULL,
	`CategoryID` int NOT NULL
);

CREATE TABLE `Regions` (
	`RegionID` int PRIMARY KEY NOT NULL,
	`RegionDescription` varchar(256) NOT NULL
);

CREATE TABLE `Shippers` (
	`ShipperID` int PRIMARY KEY NOT NULL,
	`CompanyName` varchar(60),
	`Phone` varchar(60)
);

CREATE TABLE `Suppliers` (
	`SupplierID` int PRIMARY KEY NOT NULL,
	`CompanyName` varchar(60) NOT NULL,
	`ContactName` varchar(60),
	`ContactTitle` varchar(60),
	`Address` varchar(60),
	`City` varchar(60),
	`Region` varchar(60),
	`PostalCode` varchar(60),
	`Country` varchar(60),
	`Phone` varchar(60),
	`Fax` varchar(60),
	`HomePage` varchar(60)
);

CREATE TABLE `Territories` (
	`TerritoryID` int PRIMARY KEY NOT NULL,
	`TerritoryDescription` varchar(60) NOT NULL,
	`RegionID` int NOT NULL
);

ALTER TABLE EmployeeTerritories ADD CONSTRAINT EmployeeTerritories_EmployeeID_Employees_EmployeeID_fk FOREIGN KEY (`EmployeeID`) REFERENCES Employees(`EmployeeID`) ;
ALTER TABLE EmployeeTerritories ADD CONSTRAINT EmployeeTerritories_TerritoryID_Territories_TerritoryID_fk FOREIGN KEY (`TerritoryID`) REFERENCES Territories(`TerritoryID`) ;
ALTER TABLE OrderDetails ADD CONSTRAINT OrderDetails_OrderID_Orders_OrderID_fk FOREIGN KEY (`OrderID`) REFERENCES Orders(`OrderID`) ;
ALTER TABLE OrderDetails ADD CONSTRAINT OrderDetails_ProductID_Products_ProductID_fk FOREIGN KEY (`ProductID`) REFERENCES Products(`ProductID`) ;
ALTER TABLE Orders ADD CONSTRAINT Orders_CustomerID_Customers_CustomerID_fk FOREIGN KEY (`CustomerID`) REFERENCES Customers(`CustomerID`) ;
ALTER TABLE Orders ADD CONSTRAINT Orders_EmployeeID_Employees_EmployeeID_fk FOREIGN KEY (`EmployeeID`) REFERENCES Employees(`EmployeeID`) ;
ALTER TABLE Orders ADD CONSTRAINT Orders_ShipVia_Shippers_ShipperID_fk FOREIGN KEY (`ShipVia`) REFERENCES Shippers(`ShipperID`) ;
ALTER TABLE Products ADD CONSTRAINT Products_SupplierID_Suppliers_SupplierID_fk FOREIGN KEY (`SupplierID`) REFERENCES Suppliers(`SupplierID`) ;
ALTER TABLE Products ADD CONSTRAINT Products_CategoryID_Categories_CategoryID_fk FOREIGN KEY (`CategoryID`) REFERENCES Categories(`CategoryID`) ;
ALTER TABLE Territories ADD CONSTRAINT Territories_RegionID_Regions_RegionID_fk FOREIGN KEY (`RegionID`) REFERENCES Regions(`RegionID`) ;