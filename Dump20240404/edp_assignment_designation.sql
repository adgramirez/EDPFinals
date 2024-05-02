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
-- Table structure for table `assignment_designation`
--

DROP TABLE IF EXISTS `assignment_designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_designation` (
  `assignment_designation_ID` int NOT NULL AUTO_INCREMENT,
  `employee_ID` int DEFAULT NULL,
  `designation_ID` int DEFAULT NULL,
  `employeeType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`assignment_designation_ID`),
  KEY `assignment_designation.employee_ID_idx` (`employee_ID`),
  KEY `assignment_designation.designation_ID_idx` (`designation_ID`),
  CONSTRAINT `assignment_designation.designation_ID` FOREIGN KEY (`designation_ID`) REFERENCES `designation` (`designation_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assignment_designation.employee_ID` FOREIGN KEY (`employee_ID`) REFERENCES `employee` (`employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_designation`
--

LOCK TABLES `assignment_designation` WRITE;
/*!40000 ALTER TABLE `assignment_designation` DISABLE KEYS */;
INSERT INTO `assignment_designation` VALUES (1,1,1,'Regular'),(2,2,2,'Part Time'),(3,3,3,'Probation'),(4,4,4,'Regular'),(5,5,5,'Dismissed'),(6,6,6,'Part Time'),(7,7,7,'Regular'),(8,8,8,'Probation'),(9,9,9,'Dismissed');
/*!40000 ALTER TABLE `assignment_designation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  3:30:18
