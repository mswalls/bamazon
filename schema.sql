DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL
PRIMARY KEY(item_id)
);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES
("uncharted 4", "Video Games", 49.95, 150),
("Destiny 2", "Video Games", 49.99, 100),
("banana", "Produce", .35, 1000),
("apple", "Produce", .50, 800),
("Bath Towel", "Home Living", 8.50, 25),
("10pc silverware set", "Kitchen", 11.99, 150),
("Fender Stratocaster", "Music", 1899.99, 12),
("Table", "Home Decor", 350.00, 4),
("Television", "Electronics", 499.99, 130),
("Eggs(dz)", "Grocery", 1.39, 200)

