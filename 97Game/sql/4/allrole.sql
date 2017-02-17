/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : qhgame

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-17 18:04:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `allrole`
-- ----------------------------
DROP TABLE IF EXISTS `allrole`;
CREATE TABLE `allrole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleid` int(10) DEFAULT NULL,
  `rolename` varchar(100) DEFAULT NULL,
  `roleattack` int(250) DEFAULT NULL,
  `roledefense` int(250) DEFAULT NULL,
  `rolelife` int(250) DEFAULT NULL COMMENT '所有角色的属性',
  `tradeprice` int(11) DEFAULT NULL,
  `rolestory` text,
  `roler` varchar(100) DEFAULT NULL,
  `scalea` float(100,1) DEFAULT NULL,
  `scaled` float(100,1) DEFAULT NULL,
  `scalel` float(100,1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of allrole
-- ----------------------------
INSERT INTO `allrole` VALUES ('1', '1', 'ANDY BOGARD', '87', '43', '560', '450', '安迪·伯格 从小和特瑞生活在孤儿院，虽然没有血缘关系，但由于2人感情很好，一直以兄弟相称。10岁那年2人一起被杰夫收养，度过了一段快乐的时光。不久之后杰夫被吉斯杀害，兄弟2人为报仇一起投入糖胡芦门下，在修行过程中由于体质的差异，安迪感到八极正拳并不适合自己修炼，于是告别特瑞前往日本，临行前和特瑞约定10年后回到南镇为父报仇', '飞翔流星拳:连续造成三次打击每次为总攻击力的45%', '1.2', '1.1', '1.1');
INSERT INTO `allrole` VALUES ('2', '2', 'RYO SAKAZAKI', '83', '50', '660', '450', '坂崎良 极限流道场的门下生，有着「无敌之龙」的称号，与Robert Garcia合称“龙虎”。虽然他一直希望能够与父亲坂崎琢磨比试，但有传言说他的实力已经超越其父亲。不过，坂崎良是一个除了空手道之外便一无所知的人，常常被其妹妹Yuri称为\"笨蛋\"。', '天地霸王拳:敌人防御降低50%并且本次必定暴击', '1.3', '1.2', '1.0');
INSERT INTO `allrole` VALUES ('3', '3', 'YURI SAKAZAKI', '85', '47', '530', '450', '坂崎由莉 龙虎之拳初登场时，还是一个什么武术都不会的普通女大学生。在琢磨离家的这段期间一直受哥哥亮和其好友罗伯特的照顾，和两人之间的关系也很融洽。不料当时南镇的黑帮领袖Mr.Big为了自己势力扩张而绑架她希望让极限流纳入自己的旗下，几经波折，Yuri才被哥哥亮和好友罗伯特救出及跟父亲重逢。', '飞燕烈孔:无效敌人的攻击并且自己恢复10%当前的生命值', '1.1', '1.3', '1.2');
INSERT INTO `allrole` VALUES ('4', '4', 'CHOI BOUNGE', '88', '43', '530', '450', '蔡宝健 蔡宝健,俗称monkey(猴子），是整个拳皇中体积最小身法最灵活的角色。因为体积小，有了许多“特权”，很多招式对别人管用却打不着他。蔡宝健跳得相当高，在空战中的优势是不言而喻的。空中所有招式给人印象最深的便是跳重拳，逆向可能性堪称拳皇第一，明明跳过去了，却能扎到人，落地还可以连连连。此外，空中超重击也是很强的。特殊技“二段斩”没什么意思。但是到了99换成“骸突”，一击破防接超杀，BT之程度让所有人发指', '真！超绝龙卷疾风斩:迅速的攻击让敌人无法防御，造成120%的真实伤害', '1.2', '1.1', '1.2');
INSERT INTO `allrole` VALUES ('5', '5', 'CHANG KOEHAN', '76', '56', '580', '1350', '陈国汉 陈国汉原本是个犯罪分子，被金家藩领回家中强迫练武，并承诺在净化心灵的同时彻底改变身材上的缺陷。因为始终没有实现，因此心中憎恨师父，但却不敢表露出来！陈国汉因为多次伤人和破坏公物而在监狱服刑。在狱中结识蔡建宝，在狱中和蔡建宝密谋越狱，陈国汉用原本用来束缚自己的铁球砸坏监狱的墙壁，2人逃了出来。监狱方面向当时的跆拳道宗师金求助，在金的协助下，2人被重新抓获。这时金认为与其惩罚他们，不如通过自己的教育更正让2人改过自新，得到监狱长同意后，金将2人带回自己的道馆并收2人为徒，开始实施自己的教育更正计划，由于金过于严厉的训练，2人时刻想着要逃走，甚至求监狱长让他们继续回去服刑。在金多年的教育更正下，2人残忍暴虐的性格也得到了改善', '铁球大暴走:擦擦手中的铁球并且可爱的跳起舞蹈(本轮暂停攻击)立即对敌人造成300%的伤害', '1.4', '1.2', '1.4');
INSERT INTO `allrole` VALUES ('6', '6', 'GORO DAIMEN', '78', '55', '570', '1350', '大门五郎 使用豪爽投掷技的柔道家，基本上不说话，连胜利的时候都是使用动作来示意。大门和京一样，没有弱过。这个怪物恐怕让所有拳皇玩家茫然过吧。 肌肉男97已经很牛了，98威力更胜一筹。拳脚长，威力大，对空对地都强，贴身战更狠，这是对大门的评价。铲腿似乎短一点，也只是相对而言的。轻脚不但踢得远，还必须下防，还可以接当身技，牵制对手堪称天下第一。比轻脚更远的是重拳重脚，占着身高体壮，对空对前一并打了。空中重脚对地能力超强，可以踩掉许多对空强招。整一个BT，我想多数人都吃过大门亏吧', '续·天地返:大门愤怒的捶击地面眩晕敌方一回合并且造成150%的伤害', '1.3', '1.5', '1.3');
INSERT INTO `allrole` VALUES ('7', '7', 'JOE HIGASHI', '86', '48', '530', '1350', '东丈 泰国人，外号泰拳王，但只能在泰国称王，到了拳皇就只有跑龙套的份。和泰利兄弟是哥们，很能搞笑，竟还以脱裤子来挑衅。在11代因为要参加泰拳争霸战而放弃拳皇大赛。在《饿狼传说》引进的角色之中，他的形象变化是最大的。在kof94的胜利姿势中、本来预备将其设定为缺了牙齿的形象。并且基本已经完成，效果也都还不错，但是考虑到东丈的Fans可能会有反对意见，便推翻了原来的设计，重新加上了牙齿。', '爆烈飓风猛虎踢:利用泰拳的冲击与爆发本次攻击提高50%的并且必定暴击', '1.4', '1.2', '1.2');
INSERT INTO `allrole` VALUES ('8', '8', 'KIM KAPHWAN', '80', '45', '550', '1350', '金家藩 被描绘成一个对罪恶绝对不宽恕的正义感的男人。有两个曾经是恶棍的徒弟陈可汉名陈国汉和蔡宝健，在于KOF94时找不到队友组队的金家藩看到新闻画面破坏监狱逃离的陈国汉后赶到现场制服，并在半路上顺便制服袭击他的变态伤人魔-蔡建宝，为了导正他们的观念便实施地狱般的磨练并强行带他们参加KOF(因为效果不错，监狱方面也就同意将这2人交由金就近看管。)。', '凤凰脚:本轮防御提高50%并且对敌人造成180%的伤害', '1.3', '1.4', '1.3');
INSERT INTO `allrole` VALUES ('9', '9', 'KING', '83', '44', '540', '3150', 'KING 女性格斗家，格斗技是泰拳，曾经女扮男装在泰拳大赛中获得冠军，但由于她的弟弟身上患有一种病，行动不方便而且手术费极为昂贵，而King参加泰拳大赛未果，所以亟需用钱的King带着弟弟来到了全世界最多格斗比赛的地方——南镇，King希望在南镇的格斗比赛中得胜赚取奖金，作为弟弟的手术费。后来到了南镇后，因为不满当地Jack为首的流氓集团而出手教训他们,怎知反而遭Jack以她弟弟作威胁加入其组织过。没多久Jack屈服于Mr.BIG的手下，而King也因此\"转会\"到Mr.BIG手下工作，负责打理组织里的酒吧生意。在这段经历中，King一直是以男性的形象示人的。后来，坂崎良为了救出被Mr.BIG绑架的妹妹而找到了这间 酒吧，与King大打出手，并在击败King后发现了她的女性身份。事后King将百合的行踪告诉了良和Robert，良也告诉King说他一定会打败Mr.BIG，希望她改邪归正。King被良的诚意打动，决定脱离组织，帮助良寻回妹妹。之后，良在获得了一届KOF比赛冠军后，将全部奖金用来给King的弟弟做了手术，King对良也渐渐产生了好感。后来King在Robert的资助下在南镇开了一间名为“幻影”的酒吧，这里也成为了南镇众格斗家聚会常去的场所。在之后KOF的剧情里，还提到King在英国也开了一家分店，可见经营状况还是很不错的。酒吧里雇有一对双胞胎服务生，分别名为莎莉和伊莉莎白。在KOF剧情中，King和舞都是女性格斗家队的元老人物，在队中就像大姐姐一样照顾各位年轻的女格斗家。在KOF XI中，由于坂崎琢磨的安排，King与良、Yuri一起组队参加了KOF，在结局动画中，可以看出King和良的感情又有了新的进展。', '沉默闪光:无视敌人对自身造成的伤害并且转击敌人100%的伤害', '1.5', '1.4', '1.4');
INSERT INTO `allrole` VALUES ('10', '10', 'CLARK', '81', '46', '560', '3150', '克拉克 克拉克在海顿上校的佣兵部队服役，与他一起的，还有他的好兄弟拉尔夫，以及莉安娜。面对克拉克羞涩的Whip在Whip未加入希顿上校的佣兵部队以前，克拉克还是挺羡慕他的兄弟拉尔夫的，虽然莉安娜对拉尔夫没什么感觉，但是拉尔夫还是对莉安娜穷追不舍。这种锲而不舍的精神，真是值得每个男人学习啊！ Whip的加入，使克拉克不得不对她产生一种莫名的感觉，他甚至产生以后不必在孤独作战的想法。当然，这里所说的孤独作战，并非没人与他一同作战，因为拉尔夫和莉安娜，都在无时不刻的帮助着他，他们共同作战，共同进退，共同完成了一个个“不可能完成”的任务，结下了深厚的友谊！克拉克是不善于表达感情的人，他的爱情之路将会相当艰难，其中不知还有多少流言蜚语。我们英勇帅气的克拉克，在爱情方面，是否也能表现的男人味十足呢？让我们拭目以待吧。', '奔袭投掷:投弃一颗炸弹对当前的敌人造成200%的伤害', '1.6', '1.3', '1.4');
INSERT INTO `allrole` VALUES ('11', '11', 'RALF', '83', '45', '540', '3150', '拉尔夫 雇佣兵集团的一份子，喜欢莉安娜，和克拉克是出生入死的兄弟，小日本子咋就不把拳皇拍成动画呢可惜。还有他的身影在合金弹头中也有出现过...........', '超级机炮拳:对敌人造成连续的三次并且造成攻击力55%的伤害', '1.6', '1.4', '1.4');
INSERT INTO `allrole` VALUES ('12', '12', 'LEONA', '84', '40', '560', '3150', '莉安娜·哈迪兰 大蛇八杰集中一员——Gaidel的女儿，在莉安娜幼年时，大蛇四天王之首Goenitz找到莉安娜的母亲履行大蛇八杰集的使命，但被其拒绝。Goenitz注意到莉安娜身上大蛇之血的力量也很强，在他的引导下，无法控制力量的莉安娜发生暴走，无意识下杀死了父母，在Goenitz离去后，负责调查此一凶杀案件的佣兵部队指挥官哈迪兰在现场发现了莉安娜，并把她收为自己的养女，在之后的十几年里传授她哈迪兰流暗杀术，将她训练成一名出色的佣兵。KOF96中，Leona代替Heidern出场首次参加KOF，但在随后的97年，由于感受到大蛇的力量，在赛场中再次暴走，被众格斗家制服。大蛇被封印之后，又随佣兵部队与黑暗组织NESTS的阴谋战斗', '重力风暴:敌方防御降低50%并且对敌人造成255%的伤害打击', '1.7', '1.2', '1.6');
INSERT INTO `allrole` VALUES ('13', '13', 'ATHENA ASAMIYA', '88', '39', '510', '4800', '麻宫雅典娜 女子高中生兼人气偶像歌手，超能力遗传自祖先雅典娜公主，在镇元斋门下修习中国拳法。基本每届的KOF参赛原因都是为了阻止邪恶势力的阴谋，KOF94参加第一届赛事时曾被卢卡尔评价为“唯一不为私欲而战的队伍”。一直被同门的椎拳崇暗恋，不过麻宫雅典娜对此的态度一直是“朋友以上，恋人未满”。KOF2003则第一次脱离超能力队另组队伍参赛。', '凤凰FUNG箭:愤怒之火缠绕于身造成145%的伤害并且恢复对敌人造成伤害一半的生命值', '1.5', '1.2', '1.8');
INSERT INTO `allrole` VALUES ('14', '14', 'BIUE MARY', '84', '35', '500', '4800', '玛丽 是武术大师“周防辰巳”的孙女，自幼习武，所穿皮夹克是男友Butch送给她的20岁生日礼物，男友及父亲在护卫总统的任务中被刺客所杀，爷爷又被徒弟吉斯杀害，令玛丽的心理大受冲击，也因而把自己命名为Blue‧Mary（意为忧郁的玛丽）。伴其战斗的狗狗名叫Anton（安东）。喜欢特瑞', '玛丽台风:召唤出一只宠物共同对敌人造成110%的伤害', '1.7', '1.5', '1.5');
INSERT INTO `allrole` VALUES ('15', '15', 'TEERY BOGARD', '83', '46', '540', '4800', '特瑞·伯格 特瑞和安迪是孤儿，被杰夫收养后得到了父爱，并从父亲杰夫那里学习格斗。，特瑞的武术的最早启蒙是杰夫。作为八极正拳的传人，杰夫发现了特瑞和安迪的武学资质，于是便将自己的拳术传授给了两人，而杰夫的确没看走眼，短短的时间内，兄弟俩的武术得到了很大提高。可惜后来杰夫f被吉斯所杀，为报杀父之仇，特瑞便求唐福禄收其为弟子，唐福禄考虑到特瑞报仇心切，加之特瑞的确有极高的武术天分，于是破例收了这位最后的徒弟，传授其八极正拳之基本要领，而特瑞也没辜负唐福禄的期望。并且，在这个过程中，唐福禄也看出特瑞的个人修为，于是将八极正拳之精髓大地之力传授给了特瑞。而安迪则选择了去日本学习骨法拳，这个不谈。师承之后的特瑞便辞别唐福禄，踏上了修行之旅，在旅途中，他挑战了很多武术家，在挑战的过程中一边提升自己的实力，一边改进自己的格斗方式，将八极正拳与街头格斗术相融合，最后才有了现在格斗之王中特瑞的流派—— 武术+我流喧哗杀法（一说是军技拳+武术）。最后特瑞终于手刃仇人吉斯，报了仇，成为了南镇的英雄。特瑞强还不仅仅是他打败了吉斯，还打败了克劳撒、库拉撒、哥达马斯。可能大家熟悉的就前两个，这俩人实力可怕也不用我说了，那么特瑞的实力就毋庸置疑了。据说他跟玛丽有一腿。', '高轨喷泉:聚集所有的力量伤害提高60%本次暴击100%', '1.8', '1.5', '1.6');
INSERT INTO `allrole` VALUES ('16', '16', 'CHIN GENTSAI', '90', '40', '520', '4800', '镇元斋 一个擅长醉拳的老人，带着自己的弟子椎拳宗，麻宫雅典娜，包参加KOF大赛。是世界上第一个领悟到大宇宙力量的人，在草剃京出世前，他也是世界第一，当时便无人能敌，只是后来老了多了几分飘逸洒脱，好喝酒，也喜欢烟袋锅子。当他悟出了大宇宙力量邪恶的一面，当时方圆百里之内无一生还，后来他便给自己订了一个使命，那就是寻找能够领悟大宇宙力量的人，并杀了他们，结果发现了麻宫雅典娜和椎拳崇，可是两个孩子太可爱，他不忍心杀掉，所以镇元斋决定收他们为徒，训练他们的大宇宙力量。', '轰栏招来:从口中吐出一团烈火对人造成150%的伤害提高并且有50%的概率暴击率', '2.0', '1.6', '1.5');
INSERT INTO `allrole` VALUES ('17', '17', 'ROBERT GARCIA', '86', '55', '650', '6300', '罗伯特·加西亚 出身意大利名门，家财万贯，但是不喜欢继承家族生意，立志成为格斗家。在掌握一定格斗技后挑战各路豪杰，一日来到极限流挑战，将所有喽啰打败后，板崎琢磨令板崎良出战，板崎良用一个手指便屡次将他打倒在地。从此罗伯特拜在极限流门下，最终成为和板崎良齐名的最强之虎。喜欢坂崎由莉', '无影疾风重段脚:快速挥舞双脚对敌人造成双倍打击并且降低敌方20点怒气值', '1.9', '1.8', '1.5');
INSERT INTO `allrole` VALUES ('18', '18', 'CHIZURU KAGURA', '85', '52', '530', '6300', '神乐千鹤 神乐家世代都是双生子家庭，并由这一对双生子守护着封印。在96\'中，大蛇四天王之暴风（高尼茨）神乐千鹤鹤的姐姐（神乐万龟），从此神乐千鹤视GOENITZ为宿敌。同时OROCHI大蛇的封印也被解开了，千鹤带着再度封印大蛇一族以及化解草剃与八神恩怨的重任，为了寻找能战胜大蛇一族的人而召开了96\'格斗大会。之后再次举办的97格斗大会，并与不知火流传人MAI（不知火舞）与泰拳高手KING（金）组队，想通过这次大会将大蛇再度封印。。。最终千鹤同草剃京、八神庵三人一起合力封印大蛇。', '里面八拾伍活零技之楚:利用幻影的舞姿迷幻敌人灵活的躲避敌人攻击并且偷取敌人80%的攻击力加以反击', '2.1', '1.8', '2.0');
INSERT INTO `allrole` VALUES ('19', '19', 'MAI SHIRANUI', '98', '80', '880', '6300', '不知火舞 是SNK格斗游戏《饿狼传说》与《拳皇》系列中的女性角色之一。继承不知火流忍术的女忍者，因为喜欢上了在自己祖父不知火半藏门下修行的安迪，在追随他的过程中卷入多场战斗。使用扇子等多种忍术进行攻击，战斗时的胸部晃动堪称最大的特色，和在游戏中给人留下的艳丽造型不同，设定里不知火舞是个标准的持家型好女友，温柔体贴，而且擅长料理，只是偶尔会对安迪的迟钝犹豫而大发脾气', '水鸟之舞:快速挥舞手中的扇子连续三次对敌人造成88%的伤害', '2.0', '1.8', '1.9');
INSERT INTO `allrole` VALUES ('20', '20', 'SIE KENSOU', '99', '78', '1000', '6300', '椎拳崇 与雅典娜不同，KENSOU的超能力是他辛苦修炼出来的。自命为“雅典娜的骑士”，与雅典娜的关系已经超越了“朋友”但还未到“恋人”的地步。雅典娜成功以偶像明星身份出道后，KENSOU就常被粉丝抱怨和迁怒。KENSOU特别喜欢吃肉包，以至于其必杀技就是吃肉包恢复生命值。', '食肉馒:从口袋掏出一个巨大的馒头快速的食用立即恢复损失生命值的50%的生命值并且伤害提高155%自身增加10点怒气值', '2.1', '2.2', '2.6');
INSERT INTO `allrole` VALUES ('21', '21', 'KYO KUSANAGI', '230', '120', '1000', '7800', '草剃京 是1800年前封印八歧大蛇的古日本三大家族之一草剃家族的后裔，三神器之一草剃神剑的持有者。自小就在格斗方面展现出惊人的才华，15岁时击败父亲柴舟，成为草剃家族史上最年轻的继承人。在学校的表现却是完全相反的懒惰，迟到、上课睡觉、旷课更是家常便饭，学业成绩十分的差，因此常年留级。由于京经常参加格斗大会让学校提高了知名度，破例没有除去京的学籍，还让京升到了三年级，但即使这样京还是毕不了业.......。在校期间认识了女朋友小雪（奇稻田雪），小雪也成为京到学校唯一的动力。拳皇97草剃京习得三神技，最终决战奥义-无式，在末尾和神乐千鹤、八神庵于暗黑空间内同大蛇展开宿命对决，依靠顽强的意志抑制住暴走的八神掐住了大蛇的脖子，这时，在京的脑海中响起了一阵声音：草剃家族的后人啊，拯救这个男人吧！弄至如斯田地，全因数百年前我们一族被大蛇之力吸引，才结下那血之契约，那时犯的错误，非但没有纠正过，更不断重复至今，这是我们全族的罪，不应完全由他一人承担的！所以，请完成他的使命，与八神庵一同打倒大蛇，并以此将我们一族从罪孽中拯救过来吧！京握紧了拳头，决定了断这一切，大喊着八神庵的名字，将无式的力量打进八神的体内，随着大蛇的惨叫声，暗黑空间崩裂，三人被强大的力量震飞了出去...........', '最终决战奥义·无式:发出一团烈火对敌人造成350%的伤害并且有50%的概率眩晕敌人一回合', '2.5', '2.3', '2.3');
INSERT INTO `allrole` VALUES ('22', '22', 'BENIMARU NIKAIDO', '150', '100', '880', '7800', '二阶堂红丸 日美混血儿，拥有堪比一流模特的容貌，而且多才多艺，至今没有被什么难倒过，二阶堂红丸集团的会长之子，拥有着一般人无可比拟的优越环境，在格斗技这个领域内也起发展的时期，但那并没有阻碍他在每个单独领域的进步，反而成了他的强大的注解，顺便一提，那个时候他的所有对战对手，甚至不能伤到他一根寒毛。虽然他没有对别人提起过，称得上是天才。这样的红丸，可以说就是个天才。红丸曾有自己选择走上了模特和格斗家一不过可能对那个时期的红丸来说，格斗技不过是他的数个兴趣中的一个而已——就像打猎或者高空跳伞，只不过是花费精力和金钱来满足自己的兴趣而已。因为，这些对于红丸来说，都还不是足以让他认真起来的东西。让这样的红丸真正将自己的天才专注在格斗上的，是一次败北。在一次武斗会上输给了当时比自己小一岁的高中生草剃京，而从此之后，红丸一直都和草剃京组队。而和草剃京组队的理由就只是不想让草剃京随便输给一些杂碎而已，既然给予了二阶堂红丸这个天才人生的第一次失败，草剃京就必须有被红丸打败的义务。直到草剃京和自己决战的最佳时机到来之前，让自己帮京做些扫除也没有关系——这就是红丸与草剃京组队的理由。', '大发电者:自然系之力与雷电的交互对敌人产生150%的伤害，并且本次攻击加速对敌人造成双倍打击虚弱敌人一轮降低敌人30%的攻击', '2.4', '2.3', '2.5');
INSERT INTO `allrole` VALUES ('23', '23', 'IORI YAGAMI', '230', '120', '1000', '7800', '八神庵 八神家族最年轻的后裔（同时是大蛇安排在三神器之中的儿子，但是庵受性格的影响在97年与其他两家共同封印大蛇），八神氏曾经叫八尺琼，一个曾经在公元八世纪前和草剃家联盟，又在八咫家（的神乐千鹤家族曾经的姓氏，属于神战士守护者）的帮助下，将大蛇封印至永远的睡眠。他们是通过用八酒杯禁制住大蛇后，再被草剃之剑削弱，八尺琼封印，最后由八咫监禁起来．时间流逝，八尺琼不想生活在草剃的“阴影”下，大蛇召唤他，两者签定了“血契”后，便给予了八 尺琼家族无穷的力量，并要求八尺琼改姓八神，但代价是放弃守护大蛇封印的使命。草剃家意识到了他们的背叛，开始了反击。从那以后，两家的争斗从未停止，实力也一直不分高低。 因为得到大蛇的力量，八神家的力量之火为紫色，也获得了大蛇之力的奥义——八稚女。到了现代，草剃家族轮到京要和庵战斗。虽然他们的命运在出生前就已经注定，但庵对京的仇恨并非来自于宿命，而是个人的仇恨，庵并不是屈从于命运的人，他的战斗也完全由自己做主。对庵来说，生命的意义就在于打倒草剃京，这也是庵参加KOF的唯一目的。但是在96年，感受到大蛇之力的庵发生了血之暴走，击伤了两名同伴。97年，为了与大蛇对抗，庵与京在千鹤的组织下联合了起来，三神器的力量联手封印了大蛇。但是，只要京还活一天，庵的战斗就不会停止。这也是在封印大蛇后庵继续参加KOF大赛的原因。KOF97将大蛇封印之后，八神庵被神乐千鹤救走恢复体质；在身体好了一半的时候就为了寻找草剃京潜入了NESTS的基地。', ' 八稚女:嘴角露出微微的笑意，迅速抓住敌人立即造成350%的伤害并且偷取敌人20点怒气', '2.5', '2.2', '2.4');
INSERT INTO `allrole` VALUES ('24', '24', 'YASHIRO NANAKASE', '210', '180', '1000', '7800', '七枷社 七枷社作为大蛇八集杰之一，与使用炎能力的克里斯；雷能力的夏尔米组队。本身拥有的是大地之力，能够支配大地的力量，所以近身攻击很强悍。四天王剩下的三名与主人公队形成了对峙。使用炎能力的京和克里斯；雷能力的红丸和夏尔米；以及依靠大地能力的大门与社的组合设定，被称作\"干枯大地之社\"。除此之外，社还被设定为八神的对手。这也就是98中八神对社为什么会有特殊开场白的缘故（其实乐队上他们也是竞争者）。', '百万大锤蒸汽:突然跳向空中抓住敌人，猛烈拖拽造成200%的伤害并且回复本次伤害30%的生命值提高自身80%护甲', '2.6', '3.0', '2.8');
INSERT INTO `allrole` VALUES ('25', '25', 'RYUJI YAMAZAKI', '189', '150', '1100', '7800', '山崎龙二 自小山崎龙二便是一名孤儿,为求生存,他学懂了生存之道,就是化成一匹狼. 而他也有一个很奇怪的特性,就是每当杀死对手后,便会好像发了狂一样.此外,他也十分嗜血,凡和他决斗的人,败了便必定被杀,就好像是蛇捕猎时的情况. 但其实作为八杰集之一,像狼一般的他也是背负着大蛇的使命的. 在以大蛇八杰集的身份觉醒后的他,并不知道自己的立场是什么.即使在 97大会后,通过与其他八杰集成员的对峙而得知自己的使命,依然保持一贯不受任何人指使的作风,只会走自己的路.整个一变态，赢了又淌鼻涕又淌哈喇子的.', '断头台:山崎龙二抓住敌人后拿出匕首刺穿敌人造成当前生命值35%的伤害', '2.5', '2.7', '2.5');
INSERT INTO `allrole` VALUES ('26', '26', 'BILLY KANE', '156', '90', '1000', '7800', '比利·凯恩  棍王是SNK的格斗游戏《饿狼传说》与《拳皇》中人物，与反面角色山崎龙二及同为饿狼角色的布鲁·玛丽一起搭档出现在拳皇97中，主要格斗技能是其最擅长的棍术。作为八神庵的同伴首次在《拳皇95》中登场。最初将这三人凑和在一起，只是为了对付草剃京的主人公队伍而存在，所以打算取名为“竞争队”。但是这名字还没来得及为大家所熟悉，就因为八神的疯狂而解散了', '超火炎旋风棍:挥舞手中的长棍连续造成5次打击每次造成80%的伤害', '2.6', '2.5', '2.8');
INSERT INTO `allrole` VALUES ('27', '27', 'CHRIS', '360', '120', '1200', '10000', '克里斯 八杰集之一，性格也被设定成为天真无邪，总是笑嘻嘻的，即使杀人时也不例外。还有就是对老大极其忠诚，无条件的信任，体内蕴藏着不可估量的能力。为了让他与大蛇相关的四天王、八杰集等等能在97中间得到完全得到解释，一大堆剧情元素被强加到了克里斯身上。正由于这样，克里斯才作为大蛇的附体器具而被搬上了游戏。超必杀的台词原本的意思是[破蛹、舞蝶]。有人能明白么？', '滑行者的踩踏:高傲的凝视对手让出本轮攻击，第二轮无视敌人防御立即造成65%的生命值伤害', '3.5', '3.7', '4.3');
INSERT INTO `allrole` VALUES ('28', '28', 'OROCHI', '888', '555', '10000', '88888', '大蛇 出生地: 不明 （有两种说法，第一据说是当年三神器家族中的草剃家族用草剃剑砍下八歧大蛇后 的头，也就是八杰集中的头。第二种他自己所说的，他是由社会的黑暗衍生出来的）被称为地球意志的存在（并非是神），自人类创世以来守护着人类，但自从人类从自然中脱离出来，“大蛇”对于人类来说便成了“恶”的象征。 大蛇没有固定的实体，是作为一种类似于“魂”的东西而存在的，当它实体化的时候必须借助“触媒”。跨越时空1800年，解开了封印的大蛇之魂附在了克里斯身上，利用其身体实体化了。（也就是说我们所看到的并非是大蛇的的真面目，而是大蛇借助“触媒”而变成的形象）。 他利用人性的弱点：如憎恶，嫉妒，怨气这些所谓负面的感情，不断扩张自身，在世界制造混乱。最后被三神器再次封印。', '阳光普照:大蛇挥舞双手50%的概率将敌人吸引并造成当前生命值100%的伤害并且每轮暴击率100%，', '5.0', '3.8', '4.8');
