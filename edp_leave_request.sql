-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: edp
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `leave_request`
--

DROP TABLE IF EXISTS `leave_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_request` (
  `leave_ID` int NOT NULL AUTO_INCREMENT,
  `signatories_ID` int DEFAULT NULL,
  `StartLeave` date DEFAULT NULL,
  `EndLeave` date DEFAULT NULL,
  `leave_type_ID` int DEFAULT NULL,
  `leave_status_ID` int DEFAULT NULL,
  PRIMARY KEY (`leave_ID`),
  KEY `leave_leave_type_ID_idx` (`leave_type_ID`),
  KEY `leave_leave_status_ID_idx` (`leave_status_ID`),
  KEY `leave_signatories_ID_idx` (`signatories_ID`),
  CONSTRAINT `leave_leave_status_ID` FOREIGN KEY (`leave_status_ID`) REFERENCES `leave_status` (`leave_status_ID`),
  CONSTRAINT `leave_leave_type_ID` FOREIGN KEY (`leave_type_ID`) REFERENCES `leave_type` (`leave_type_ID`),
  CONSTRAINT `leave_signatories_ID` FOREIGN KEY (`signatories_ID`) REFERENCES `signatories` (`signatories_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_request`
--

LOCK TABLES `leave_request` WRITE;
/*!40000 ALTER TABLE `leave_request` DISABLE KEYS */;
INSERT INTO `leave_request` VALUES (14,15,'2024-04-05','2024-04-05',1,1),(15,16,'2024-04-09','2024-04-10',1,1),(16,17,'2024-04-05','2024-04-06',1,1),(17,18,'2024-05-02','2024-05-03',2,1),(18,19,'2024-05-09','2024-05-10',1,2);
/*!40000 ALTER TABLE `leave_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 10:46:01
