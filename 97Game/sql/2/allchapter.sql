/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : qhgame

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-24 18:35:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `allchapter`
-- ----------------------------
DROP TABLE IF EXISTS `allchapter`;
CREATE TABLE `allchapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapterid` int(100) DEFAULT NULL,
  `chapterrole` varchar(100) DEFAULT NULL,
  `chaptername` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of allchapter
-- ----------------------------
INSERT INTO `allchapter` VALUES ('1', '1', '1', '第一章');
INSERT INTO `allchapter` VALUES ('17', '2', '2', '第二章');
INSERT INTO `allchapter` VALUES ('18', '3', '3', '第三章');
INSERT INTO `allchapter` VALUES ('19', '4', '4', '第四章');
INSERT INTO `allchapter` VALUES ('20', '5', '5', '第五章');
INSERT INTO `allchapter` VALUES ('21', '6', '6', '第六章');
INSERT INTO `allchapter` VALUES ('22', '7', '7', '第七章');
INSERT INTO `allchapter` VALUES ('23', '8', '8', '第八章');
INSERT INTO `allchapter` VALUES ('24', '9', '9', '第九章');
INSERT INTO `allchapter` VALUES ('25', '10', '10', '第十章');
INSERT INTO `allchapter` VALUES ('26', '11', '11', '第十一章');
INSERT INTO `allchapter` VALUES ('27', '12', '12', '第十二章');
INSERT INTO `allchapter` VALUES ('28', '13', '13', '第十三章');
INSERT INTO `allchapter` VALUES ('29', '14', '14', '第十四章');
INSERT INTO `allchapter` VALUES ('30', '15', '15', '第十五章');
INSERT INTO `allchapter` VALUES ('31', '16', '16', '第十六章');
INSERT INTO `allchapter` VALUES ('32', '17', '1,2', '第十七章');
INSERT INTO `allchapter` VALUES ('33', '18', '1,3', '第十八章');
INSERT INTO `allchapter` VALUES ('34', '19', '1,2,3', '第十九章');
