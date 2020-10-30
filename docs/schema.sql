##Schema
DROP DATABASE IF EXISTS ecommerce_db;
CREATE DATABASE ecommerce_db;

CREATE TABLE product (
    id int NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    decription VARCHER(60) NOT NULL,
    price FLOAT NOT NULL,
    stock INT NOT NULL,
    category VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE bid (
    id int NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    min_bid FLOAT NOT NULL,
    max_bid FLOAT NULL,
    max_bid_user_id INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE cart (
    id int not null AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    product_price float not null,
    product_amount int not null,
    PRIMARY KEY(id)
);