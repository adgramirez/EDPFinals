-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: edpfinals
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
-- Table structure for table `signatories`
--

DROP TABLE IF EXISTS `signatories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signatories` (
  `signatories_ID` int NOT NULL AUTO_INCREMENT,
  `employee_ID` int DEFAULT NULL,
  `superior_ID` int DEFAULT NULL,
  PRIMARY KEY (`signatories_ID`),
  KEY `signatories_employee_ID_idx` (`employee_ID`),
  KEY `signatories_superior_ID_idx` (`superior_ID`),
  CONSTRAINT `signatories_employee_ID` FOREIGN KEY (`employee_ID`) REFERENCES `assignmentdesignation` (`employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `signatories_superior_ID` FOREIGN KEY (`superior_ID`) REFERENCES `assignmentdesignation` (`employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signatories`
--

LOCK TABLES `signatories` WRITE;
/*!40000 ALTER TABLE `signatories` DISABLE KEYS */;
INSERT INTO `signatories` VALUES (2,4,1),(3,4,1),(4,4,1),(5,4,1),(6,4,1),(7,4,1),(8,4,1),(9,1,1),(10,5,5),(11,1,1),(12,1,1),(13,5,5);
/*!40000 ALTER TABLE `signatories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-12 21:57:08