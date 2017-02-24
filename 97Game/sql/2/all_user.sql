/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : qhgame

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-24 18:35:01
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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of all_user
-- ----------------------------
INSERT INTO `all_user` VALUES ('39', 'tang', '2', '\"RYO SAKAZAKI\"', '90', '55', '733', '2', '500', '1');
INSERT INTO `all_user` VALUES ('40', '德玛西亚', '3', '\"YURI SAKAZAKI\"', '92', '51', '577', '0', '490', '1');
INSERT INTO `all_user` VALUES ('41', 'tang', '6', '\"GORO DAIMEN\"', '82', '58', '604', '0', '1431', '1');
INSERT INTO `all_user` VALUES ('42', 'tang', '10', '\"CLARK\"', '88', '50', '610', '2', '3433', '1');
INSERT INTO `all_user` VALUES ('43', 'tang12', '1', '\"ANDY BOGARD\"', '164', '80', '1061', '8', '853', '1');
INSERT INTO `all_user` VALUES ('44', 'tang12', '2', '\"RYO SAKAZAKI\"', '83', '50', '660', null, '450', '0');
INSERT INTO `all_user` VALUES ('45', 'tang12', '3', '\"YURI SAKAZAKI\"', '85', '47', '530', null, '450', '0');
INSERT INTO `all_user` VALUES ('46', 'tang12', '4', '\"CHOI BOUNGE\"', '88', '43', '530', null, '450', '0');
INSERT INTO `all_user` VALUES ('47', 'tang12', '5', '\"CHANG KOEHAN\"', '76', '56', '580', null, '1350', '0');
INSERT INTO `all_user` VALUES ('48', 'tang', '1', '\"ANDY BOGARD\"', '87', '43', '560', '1', '450', '0');
INSERT INTO `all_user` VALUES ('49', '你们都是菜鸡', '4', '\"CHOI BOUNGE\"', '88', '43', '530', null, '450', '1');
INSERT INTO `all_user` VALUES ('50', '你们都是菜鸡', '2', '\"RYO SAKAZAKI\"', '83', '50', '660', null, '450', '1');
INSERT INTO `all_user` VALUES ('51', '你们都是菜鸡', '9', '\"KING\"', '83', '44', '540', null, '3150', '1');
INSERT INTO `all_user` VALUES ('52', '大门五郎', '6', '\"GORO DAIMEN\"', '78', '55', '1570', null, '1350', '1');
INSERT INTO `all_user` VALUES ('53', '东丈', '7', '\"JOE HIGASHI\"', '86', '48', '1530', null, '1350', '1');
INSERT INTO `all_user` VALUES ('54', '金家潘', '8', '\"KIM KAPHWAN\"', '80', '45', '1550', null, '1350', '1');
INSERT INTO `all_user` VALUES ('55', 'KING', '9', '\"KING\"', '83', '44', '540', null, '3150', '1');
INSERT INTO `all_user` VALUES ('56', '克拉克', '10', '\"CLARK\"', '81', '46', '1560', null, '3150', '1');
INSERT INTO `all_user` VALUES ('57', '拉尔夫', '11', '\"RALF\"', '83', '45', '1540', null, '3150', '1');
INSERT INTO `all_user` VALUES ('58', '陈国汉', '5', '\"CHANG KOEHAN\"', '76', '56', '1580', null, '1350', '1');
INSERT INTO `all_user` VALUES ('59', '莉安娜', '12', '\"LEONA\"', '84', '40', '1560', null, '3150', '1');
INSERT INTO `all_user` VALUES ('60', '麻宫雅典娜', '13', '\"ATHENA ASAMIYA\"', '88', '39', '1510', null, '4800', '1');
INSERT INTO `all_user` VALUES ('61', '玛丽', '14', '\"BIUE MARY\"', '84', '35', '500', null, '4800', '1');
INSERT INTO `all_user` VALUES ('62', '特瑞', '15', '\"TEERY BOGARD\"', '83', '46', '1540', null, '4800', '1');
INSERT INTO `all_user` VALUES ('63', '镇元斋', '16', '\"CHIN GENTSAI\"', '90', '40', '1520', null, '4800', '1');
INSERT INTO `all_user` VALUES ('64', '罗伯特', '17', '\"ROBERT GARCIA\"', '86', '55', '1650', null, '6300', '1');
INSERT INTO `all_user` VALUES ('65', '神乐千鹤', '18', '\"CHIZURU KAGURA\"', '85', '52', '1530', null, '6300', '1');
INSERT INTO `all_user` VALUES ('66', '不知火舞', '19', '\"MAI SHIRANUI\"', '98', '80', '1880', '2', '6300', '1');
INSERT INTO `all_user` VALUES ('67', '椎拳崇', '20', '\"SIE KENSOU\"', '99', '78', '1000', '2', '6300', '1');
