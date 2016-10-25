DROP DATABASE IF EXISTS `dedosrapidos`;
CREATE DATABASE `dedosrapidos` CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `dedosrapidos`;


DROP USER `dedosrapidos`@`localhost`;
CREATE USER `dedosrapidos`@`localhost` IDENTIFIED BY ';2~(@#C#&*V%#&*(Y';
GRANT ALL ON `dedosrapidos.*` TO `dedosrapidos`@`localhost`;
FLUSH privileges;


DROP TABLE IF EXISTS `top15`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `top15` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` int(11) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

