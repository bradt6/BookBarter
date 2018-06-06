CREATE DATABASE checkout;
USE checkout;

CREATE TABLE user_cart (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	jwt_string VARCHAR(500),
	book INT
)
