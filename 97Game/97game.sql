SET NAMES utf8;

DROP DATABASE IF EXISTS QHgame;
CREATE DATABASE QHGame CHARSET=UTF8;
USE QHGame;

CREATE TABLE IF NOT EXISTS `QHGame_login`(
	`user_id` int(11) PRIMARY KEY AUTO_INCREMENT,
	`user_name` varchar(100),
	`user_pwd` varchar(100)
);
