/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : qhgame

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-23 18:27:17
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
  `user_v` varchar(20) DEFAULT NULL,
  `user_title` varchar(100) DEFAULT NULL,
  `user_power` int(100) DEFAULT NULL,
  `user_combat` int(200) DEFAULT NULL,
  `user_chapter` int(200) DEFAULT NULL,
  `carid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qhgame_login
-- ----------------------------
INSERT INTO `qhgame_login` VALUES ('98', 'tang', '123456', '37440', null, null, '70', '3060', '1', ',2,6,10,1');
INSERT INTO `qhgame_login` VALUES ('99', '德玛西亚', '123456', '18', null, null, '100', '720', null, ',3');
INSERT INTO `qhgame_login` VALUES ('100', 'tang12', '123456', '12404', null, null, '40', '4133', '1', ',1,2,3,4,5');
INSERT INTO `qhgame_login` VALUES ('101', '你们都是菜鸡', '123456', '40200', null, null, '100', '2121', null, ',4,2,9');
