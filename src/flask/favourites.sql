CREATE DATABASE favourites;
USE favourites;

CREATE TABLE user_favourites (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	jwt_string VARCHAR(500),
	favourite INT
)
