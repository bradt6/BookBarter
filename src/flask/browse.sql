CREATE DATABASE browse;
USE browse;

CREATE TABLE catalogue (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) UNIQUE,
	description VARCHAR(200),
	author VARCHAR(50),
	publisher VARCHAR(50),
	picture VARCHAR(10000)
)
