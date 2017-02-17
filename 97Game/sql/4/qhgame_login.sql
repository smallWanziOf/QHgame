/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : qhgame

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-17 18:04:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `qhgame_login`
-- ----------------------------
DROP TABLE IF EXISTS `qhgame_login`;
CREATE TABLE `qhgame_login` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT NULL,
  `user_pwd` varchar(100) DEFAULT NULL,
  `user_money` int(200) DEFAULT NULL,
  `user_gmoney` int(200) DEFAULT NULL,
  `user_v` varchar(20) DEFAULT NULL,
  `user_title` varchar(100) DEFAULT NULL,
  `user_power` int(100) DEFAULT NULL,
  `user_combat` int(200) DEFAULT NULL,
  `user_chapter` int(200) DEFAULT NULL,
  `carid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qhgame_login
-- ----------------------------
