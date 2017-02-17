/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : qhgame

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-17 18:04:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `all_user`
-- ----------------------------
DROP TABLE IF EXISTS `all_user`;
CREATE TABLE `all_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) DEFAULT NULL,
  `roleid` int(20) DEFAULT NULL,
  `rolename` varchar(200) DEFAULT NULL,
  `roleattack` int(200) DEFAULT NULL,
  `roledefense` int(200) DEFAULT NULL,
  `rolelife` int(200) DEFAULT NULL,
  `rolechip` int(200) DEFAULT NULL,
  `tradeprice` int(200) DEFAULT NULL,
  `pk` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of all_user
-- ----------------------------
