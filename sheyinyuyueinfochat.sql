/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50132
Source Host           : localhost:3306
Source Database       : sheyinyuyueinfochat

Target Server Type    : MYSQL
Target Server Version : 50132
File Encoding         : 65001

Date: 2019-04-08 22:59:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `qq_message`
-- ----------------------------
DROP TABLE IF EXISTS `qq_message`;
CREATE TABLE `qq_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `fid` int(11) DEFAULT NULL,
  `qid` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `zan` int(11) DEFAULT '0',
  `note` varchar(500) DEFAULT NULL,
  `ndate` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `fusername` varchar(50) DEFAULT NULL,
  `attach` varchar(200) DEFAULT NULL,
  `attachname` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qq_message
-- ----------------------------
INSERT INTO `qq_message` VALUES ('1', '11', '11', null, '1', null, '可以发私信', '2019-04-11', 'bozai222', 'bozai222', null, null, null);
INSERT INTO `qq_message` VALUES ('2', '6', '8', null, '1', null, '可以没问题', '2019-04-11', '张师傅', 'bozai2', null, null, null);
INSERT INTO `qq_message` VALUES ('3', '6', '8', null, '1', null, '拒绝可以直接点击拒绝', '2019-04-11', '张师傅', 'bozai2', null, null, null);
INSERT INTO `qq_message` VALUES ('4', '6', '11', null, '1', null, '来了', '2019-04-11', '张师傅', 'bozai222', null, null, '1.jpg');
INSERT INTO `qq_message` VALUES ('5', '6', '11', null, '1', null, '准时来哦', '2019-04-11', '张师傅', 'bozai222', null, null, '1.jpg');
INSERT INTO `qq_message` VALUES ('6', '6', '11', null, '3', null, null, '2019-04-11', '张师傅', 'bozai222', '297135ef-ebc7-45e5-b319-dc34337da7a6.jpeg', 'CgEHXlYyBgLoKbb4AABWc%2CL2CgM30_330-200c_8-1.jpeg', '1.jpg');
INSERT INTO `qq_message` VALUES ('7', '6', '11', null, '1', null, '时间塞满了', '2018-02-24 17:24:13', '张师傅', 'bozai222', null, null, '1.jpg');

-- ----------------------------
-- Table structure for `qq_yzmessage`
-- ----------------------------
DROP TABLE IF EXISTS `qq_yzmessage`;
CREATE TABLE `qq_yzmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ndate` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tid` int(11) DEFAULT NULL,
  `fid` int(11) DEFAULT NULL,
  `fuser` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qq_yzmessage
-- ----------------------------

-- ----------------------------
-- Table structure for `wct_bill`
-- ----------------------------
DROP TABLE IF EXISTS `wct_bill`;
CREATE TABLE `wct_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gids` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `uid` varchar(100) DEFAULT NULL,
  `shop` varchar(100) DEFAULT NULL,
  `bill` varchar(2000) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `ndate` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `way` varchar(50) DEFAULT NULL,
  `gnames` varchar(500) DEFAULT NULL,
  `sid` varchar(10) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `statecn` varchar(50) DEFAULT NULL,
  `cuidan` varchar(255) DEFAULT NULL,
  `toh` int(11) DEFAULT NULL,
  `endh` int(11) DEFAULT NULL,
  `todate` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wct_bill
-- ----------------------------
INSERT INTO `wct_bill` VALUES ('1', '3', null, 'ideabobo', '4', '健身馆', null, null, '2019-03-31', '0', null, '王波', '1', '15123385885', null, null, null, '未付款', null, '8', '10', '2019-03-31', '1');
INSERT INTO `wct_bill` VALUES ('3', '6', null, 'bozai2', '8', '健身馆', null, null, '2019-03-31', '0', null, '张师傅', '1', '15123385885', null, null, null, '未付款', null, '18', '21', '2019-03-31', '1');
INSERT INTO `wct_bill` VALUES ('4', '6', null, '小凤', '5', '健身馆', null, null, '2019-03-31', '0', null, '张师傅', '1', '15123385885', null, null, null, '正常', null, '8', '9', '2019-03-31', '1');
INSERT INTO `wct_bill` VALUES ('5', '6', null, 'bozai222', '11', '健身馆', null, null, '2019-03-31', '0', null, '张师傅', '1', '15123385885', null, null, null, '已拒绝', null, '10', '12', '2019-03-31', '1');
INSERT INTO `wct_bill` VALUES ('6', '5', null, 'bozai', '7', '健身馆馆', null, null, '2019-04-08 22:56:05', '0', null, '小凤', '1', '15123385885', null, null, null, '正常', null, '8', '9', '2019-04-08', '1');

-- ----------------------------
-- Table structure for `wct_notice`
-- ----------------------------
DROP TABLE IF EXISTS `wct_notice`;
CREATE TABLE `wct_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `ndate` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `sid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wct_notice
-- ----------------------------
INSERT INTO `wct_notice` VALUES ('1', '春天浪漫', '这里是说明', '2019-03-31', null, '1a50a750-e1eb-438d-9b82-cb0dfb66.gif', '1');
INSERT INTO `wct_notice` VALUES ('2', '五月天', '阿萨德发送到', '2019-03-31', null, '435fac1f-5de4-433d-bc62-254e5fa3.gif', '1');
INSERT INTO `wct_notice` VALUES ('3', '淳朴', '阿萨德发送地方', '2019-03-31', null, 'd59384ef-3dab-4096-b0b0-f188104e.gif', '1');
INSERT INTO `wct_notice` VALUES ('4', '浪漫巴黎', '这里是内容介绍阿萨德发送地方是点发送地方阿斯蒂芬爱的色放阿斯蒂芬阿萨德发射点发阿萨德发送地方撒旦法速度发射点发', '2019-03-31', null, 'd3d0ea2d-1ea9-49a8-ae88-57f390d3.gif', '1');
INSERT INTO `wct_notice` VALUES ('5', '小清新', '阿萨德发送地方', '2019-03-31', null, '6d6c8830-f55e-40ab-a10e-11e536cb.gif', '1');
INSERT INTO `wct_notice` VALUES ('6', '浪漫', '阿德法撒旦法阿斯顿发送到发送到发', '2019-03-31', null, 'ca35f5b3-6486-4022-a8b1-f4d31fdb.gif', '2');

-- ----------------------------
-- Table structure for `wct_posts`
-- ----------------------------
DROP TABLE IF EXISTS `wct_posts`;
CREATE TABLE `wct_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `uid` varchar(10) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `ndate` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `wechat` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wct_posts
-- ----------------------------
INSERT INTO `wct_posts` VALUES ('1', '可以发帖讨论', '呵呵', '11', 'bozai222', '2018-02-24 17:14:31', '7cfe76c1-4327-4b75-8aec-4c9b41011e1a.jpg', '1', '15123385885', null);
INSERT INTO `wct_posts` VALUES ('2', '1111', '1111', '7', 'bozai', '2019-04-08 22:56:57', null, '1', '15123385885', null);

-- ----------------------------
-- Table structure for `wct_replay`
-- ----------------------------
DROP TABLE IF EXISTS `wct_replay`;
CREATE TABLE `wct_replay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` varchar(10) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `uid` varchar(10) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `ndate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wct_replay
-- ----------------------------
INSERT INTO `wct_replay` VALUES ('1', '1', '不错', '11', 'bozai222', '2019-03-24 17:14:38');
INSERT INTO `wct_replay` VALUES ('2', '5', '', '7', 'bozai', '2019-04-08 22:56:06');

-- ----------------------------
-- Table structure for `wct_shop`
-- ----------------------------
DROP TABLE IF EXISTS `wct_shop`;
CREATE TABLE `wct_shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sname` varchar(100) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `tel` varchar(100) DEFAULT NULL,
  `ownid` varchar(10) DEFAULT NULL,
  `passwd` varchar(50) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wct_shop
-- ----------------------------
INSERT INTO `wct_shop` VALUES ('1', '健身馆馆', '12049612-7252-40ac-940d-b622c2a1.gif', '造型\r\n造型数量：4 套服装说明：男士4套，女士4套：（外景1套，内景3套） 造型说明：免费提供新人拍摄用精致化妆及整体造型，免费提供新人拍摄用全部化妆用品\r\n免费提供新人拍摄用专业整排睫毛，免费提供新人拍摄用全部精美饰品\r\n场景\r\n场景搭配：内外景搭配 内景数量：1 个内景说明：3000平米全新韩国馆内景拍摄基地，360度1:1仿真实景，6米挑高空高，5D影视片场，国际接轨影棚恒温温控技术，一流设施，创造一流服务。韩式风格源于欧美，经过精致、优雅的改进和融合，更加适合东方人端庄、含蓄的特点。拍摄风格以温馨、唯美、婚礼纪实的幸福感为主，搭配多灯布光的光影运用，生活化的布景装饰，多元化的道具选择，让你的婚纱照简约、端庄的同时更加富有光影的质感。 外景数量：1 个外景说明：南山加勒比外景基地\r\n拍摄\r\n拍摄天数：1 天拍摄张数：100 张精修张数：100 张入册张数：25 张', '重庆璧山区皮鞋城1路186号', null, null, '15123385885', null, null, null);
INSERT INTO `wct_shop` VALUES ('2', '永久健身馆', 'e1046659-ccf3-42c0-90fb-c192c076.gif', '这里是健身的详细介绍', '重庆市璧山区皮鞋城1路186号', null, null, '15123385885', '1', null, null);

-- ----------------------------
-- Table structure for `wct_user`
-- ----------------------------
DROP TABLE IF EXISTS `wct_user`;
CREATE TABLE `wct_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `passwd` varchar(50) DEFAULT NULL,
  `roletype` varchar(50) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `qq` varchar(20) DEFAULT NULL,
  `wechat` varchar(50) DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `birth` varchar(20) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `sid` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `jifen` int(11) DEFAULT NULL,
  `money` int(11) DEFAULT '0',
  `shop` varchar(200) DEFAULT NULL,
  `jimg` varchar(200) DEFAULT NULL,
  `idcard` varchar(200) DEFAULT NULL,
  `zhengshu` varchar(200) DEFAULT NULL,
  `price` varchar(200) DEFAULT NULL,
  `zizhi` varchar(200) DEFAULT NULL,
  `statecn` varchar(200) DEFAULT NULL,
  `isjl` varchar(200) DEFAULT NULL,
  `fids` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wct_user
-- ----------------------------
INSERT INTO `wct_user` VALUES ('1', 'admin', 'admin', '1', null, null, null, null, null, null, '1.jpg', null, null, null, '0', null, null, null, null, null, null, null, null, null);
INSERT INTO `wct_user` VALUES ('2', '健身馆1', '111111', '3', null, null, null, null, null, null, '1.jpg', '1', null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `wct_user` VALUES ('3', '王波', '111111', '3', 'ideabobo@126.com', '15123385885', null, null, null, '1997-04-16', '1.jpg', '1', null, null, null, '健身馆', '0a764acb-87a2-4c9a-8c6b-d88a2f41.gif', '500223424234', '34234234', null, 'z资质介绍                    ', '通过', '1', null);
INSERT INTO `wct_user` VALUES ('4', 'ideabobo', '111111', '2', null, '15123385885', null, null, null, null, '1.jpg', null, '重庆璧山', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `wct_user` VALUES ('5', '小凤', '111111', '3', 'ideabobo@126.com', '15123385885', null, null, null, '1986-04-17', '1.jpg', '1', null, null, null, '健身馆', '4649678a-eef5-4fc6-bc92-82df16b9.gif', '5002234324234234', '5464534534', null, '这里是摄影师的资质介绍         ', '通过', '1', '5,5');
INSERT INTO `wct_user` VALUES ('6', '张师傅', '111111', '3', 'ideabobo@126.com', '15123385885', null, null, null, '2003-05-08', '1.jpg', '1', null, null, null, '健身馆', '75437672-da46-4214-bea8-0cb495dc.gif', '699044534534', '345345', null, '摄影师资质介绍                    ', '通过', '1', '8,11');
INSERT INTO `wct_user` VALUES ('7', 'bozai', '111111', '2', null, '15123385885', null, null, null, null, '1.jpg', null, '重庆', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `wct_user` VALUES ('8', 'bozai2', '123456', '2', '', '15123385885', '2312313', '', null, '1995-04-15', '1.jpg', null, null, null, null, null, null, null, null, null, null, null, null, '6');
INSERT INTO `wct_user` VALUES ('9', 'hehehe', '11111111', '2', null, '15123385885', null, null, null, null, '1.jpg', null, '重庆璧山', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `wct_user` VALUES ('10', '永久健身馆', '111111', '3', null, null, null, null, null, null, '1.jpg', '2', null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `wct_user` VALUES ('11', 'bozai222', '111111', '2', null, '15123385885', null, null, null, null, '1.jpg', '1', '重庆', null, null, '健身馆', '83a28f8c-4d3f-4d4c-a489-5b6114ec4672.jpg', '88985558855585555', null, null, '可以申请成为摄影师？后台审核', '待审核', '1', '11,11,6');
