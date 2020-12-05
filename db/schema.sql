DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE wishes_db;

CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  burger_name VARCHAR(30),
  devoured BOOLEAN,
  PRIMARY KEY(Id)
)

insert info wishes