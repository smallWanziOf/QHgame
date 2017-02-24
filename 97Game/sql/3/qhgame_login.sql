/*
Navicat MySQL Data Transfer

Source Server         : locast_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : qhgame

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-02-25 01:59:06
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
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qhgame_login
-- ----------------------------
INSERT INTO `qhgame_login` VALUES ('98', 'tang', '123456', '36830', null, null, '70', '3060', '1', ',2,6,10,1');
INSERT INTO `qhgame_login` VALUES ('99', '德玛西亚', '123456', '18', null, null, '100', '720', null, ',3');
INSERT INTO `qhgame_login` VALUES ('100', 'tang12', '123456', '12404', null, null, '40', '4133', '1', ',1,2,3,4,5');
INSERT INTO `qhgame_login` VALUES ('101', '你们都是菜鸡', '123456', '40200', null, null, '100', '2121', null, ',4,2,9');
INSERT INTO `qhgame_login` VALUES ('102', '大门五郎', '123456', '7538', null, null, '100', '703', null, ',6');
INSERT INTO `qhgame_login` VALUES ('103', '东丈', '123456', '7538', null, null, '100', '664', null, ',7');
INSERT INTO `qhgame_login` VALUES ('104', '金家潘', '123456', '7538', null, null, '100', '675', null, ',8');
INSERT INTO `qhgame_login` VALUES ('105', 'KING', '123456', '5738', null, null, '100', '667', null, ',9');
INSERT INTO `qhgame_login` VALUES ('106', '克拉克', '123456', '5738', null, null, '100', '687', null, ',10');
INSERT INTO `qhgame_login` VALUES ('107', '拉尔夫', '123456', '5738', null, null, '100', '668', null, ',11');
INSERT INTO `qhgame_login` VALUES ('108', '陈国汉', '123456', '7538', null, null, '100', '712', null, ',5');
INSERT INTO `qhgame_login` VALUES ('109', '莉安娜', '123456', '5738', null, null, '100', '684', null, ',12');
INSERT INTO `qhgame_login` VALUES ('110', '麻宫雅典娜', '123456', '4088', null, null, '100', '637', null, ',13');
INSERT INTO `qhgame_login` VALUES ('111', '玛丽', '123456', '4085', null, null, '100', '619', null, ',14');
INSERT INTO `qhgame_login` VALUES ('112', '特瑞', '123456', '4085', null, null, '100', '669', null, ',15');
INSERT INTO `qhgame_login` VALUES ('113', '镇元斋', '123456', '4081', null, null, '100', '650', null, ',16');
INSERT INTO `qhgame_login` VALUES ('114', '罗伯特', '123456', '2581', null, null, '100', '791', null, ',17');
INSERT INTO `qhgame_login` VALUES ('115', '神乐千鹤', '123456', '2583', null, null, '100', '667', null, ',18');
INSERT INTO `qhgame_login` VALUES ('116', '不知火舞', '123456', '2584', null, null, '100', '1058', null, ',19');
INSERT INTO `qhgame_login` VALUES ('117', '椎拳崇', '123456', '2581', null, null, '100', '1177', null, ',20');
INSERT INTO `qhgame_login` VALUES ('118', '草稚京', '123456', '1088', null, null, '100', '1350', null, ',21');
INSERT INTO `qhgame_login` VALUES ('119', '红丸', '123456', '1088', null, null, '100', '1130', null, ',22');
INSERT INTO `qhgame_login` VALUES ('120', '八神', '123456', '1088', null, null, '100', '1350', null, ',23');
INSERT INTO `qhgame_login` VALUES ('121', '七枷社', '123456', '1088', null, null, '100', '1390', null, ',24');
INSERT INTO `qhgame_login` VALUES ('122', '山崎龙二', '123456', '1088', null, null, '100', '1189', null, ',25');
INSERT INTO `qhgame_login` VALUES ('123', '比利', '123456', '1088', null, null, '100', '1026', null, ',26');
INSERT INTO `qhgame_login` VALUES ('124', '克里斯', '123456', '56888', null, null, '100', '1680', null, ',27');
INSERT INTO `qhgame_login` VALUES ('125', '大蛇', '123456', '8800000', null, null, '100', '11443', null, ',28');
