/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : qhgame

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-23 18:26:57
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of all_user
-- ----------------------------
INSERT INTO `all_user` VALUES ('39', 'tang', '2', '\"RYO SAKAZAKI\"', '90', '55', '733', '2', '500', '1');
INSERT INTO `all_user` VALUES ('40', '德玛西亚', '3', '\"YURI SAKAZAKI\"', '92', '51', '577', '0', '490', '1');
INSERT INTO `all_user` VALUES ('41', 'tang', '6', '\"GORO DAIMEN\"', '82', '58', '604', '0', '1431', '1');
INSERT INTO `all_user` VALUES ('42', 'tang', '10', '\"CLARK\"', '88', '50', '610', '0', '3433', '1');
INSERT INTO `all_user` VALUES ('43', 'tang12', '1', '\"ANDY BOGARD\"', '164', '80', '1061', '6', '853', '1');
INSERT INTO `all_user` VALUES ('44', 'tang12', '2', '\"RYO SAKAZAKI\"', '83', '50', '660', null, '450', '0');
INSERT INTO `all_user` VALUES ('45', 'tang12', '3', '\"YURI SAKAZAKI\"', '85', '47', '530', null, '450', '0');
INSERT INTO `all_user` VALUES ('46', 'tang12', '4', '\"CHOI BOUNGE\"', '88', '43', '530', null, '450', '0');
INSERT INTO `all_user` VALUES ('47', 'tang12', '5', '\"CHANG KOEHAN\"', '76', '56', '580', null, '1350', '0');
INSERT INTO `all_user` VALUES ('48', 'tang', '1', '\"ANDY BOGARD\"', '87', '43', '560', null, '450', '0');
INSERT INTO `all_user` VALUES ('49', '你们都是菜鸡', '4', '\"CHOI BOUNGE\"', '88', '43', '530', null, '450', '1');
INSERT INTO `all_user` VALUES ('50', '你们都是菜鸡', '2', '\"RYO SAKAZAKI\"', '83', '50', '660', null, '450', '1');
INSERT INTO `all_user` VALUES ('51', '你们都是菜鸡', '9', '\"KING\"', '83', '44', '540', null, '3150', '1');
