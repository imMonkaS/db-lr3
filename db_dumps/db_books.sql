-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2024 at 01:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_books`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `FillDeliveries` ()   BEGIN
  DECLARE del_rows INT DEFAULT (SELECT COUNT(*) FROM deliveries);
  WHILE del_rows < 17 DO
    INSERT INTO deliveries(Name_delivery) VALUES ('unknown');
    SELECT COUNT(*) INTO del_rows FROM deliveries;
  END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `Code_author` int(11) NOT NULL,
  `name_author` char(30) DEFAULT NULL,
  `Birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`Code_author`, `name_author`, `Birthday`) VALUES
(1, 'Pushkin', '1799-05-26'),
(2, 'Tolstoy', '1828-09-09');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `Code_book` int(11) NOT NULL,
  `Title_book` char(40) DEFAULT 'BLANK',
  `Code_author` int(11) DEFAULT NULL,
  `Pages` int(11) DEFAULT NULL,
  `Code_publish` int(11) DEFAULT NULL
) ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`Code_book`, `Title_book`, `Code_author`, `Pages`, `Code_publish`) VALUES
(1, 'RUSLAN I LUDMILA', 1, 288, 1),
(2, 'EUGENIY ONEGIN', 1, 224, 1),
(3, 'SKAZKA O TSARE SALTANE', 1, 48, 1),
(9, 'Voina i Mir', 2, 999, 1);

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `Code_delivery` int(11) NOT NULL,
  `Name_delivery` char(30) DEFAULT NULL,
  `Name_company` char(20) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Phone` bigint(20) DEFAULT NULL,
  `INN` char(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`Code_delivery`, `Name_delivery`, `Name_company`, `Address`, `Phone`, `INN`) VALUES
(1, 'books', 'best_deals', NULL, 88005553535, NULL),
(2, 'ads', NULL, NULL, NULL, NULL),
(3, 'qe', NULL, NULL, NULL, NULL),
(4, 'xzc', NULL, NULL, NULL, NULL),
(31, 'asdsad', NULL, NULL, NULL, NULL),
(44, 'unknown', NULL, NULL, NULL, NULL),
(45, 'unknown', NULL, NULL, NULL, NULL),
(46, 'unknown', NULL, NULL, NULL, NULL),
(47, 'unknown', NULL, NULL, NULL, NULL),
(48, 'unknown', NULL, NULL, NULL, NULL),
(49, 'unknown', NULL, NULL, NULL, NULL),
(50, 'unknown', NULL, NULL, NULL, NULL),
(51, 'unknown', NULL, NULL, NULL, NULL),
(52, 'unknown', NULL, NULL, NULL, NULL),
(53, 'unknown', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `publishing_house`
--

CREATE TABLE `publishing_house` (
  `Code_publish` int(11) NOT NULL,
  `Publish` char(30) DEFAULT NULL,
  `City` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `publishing_house`
--

INSERT INTO `publishing_house` (`Code_publish`, `Publish`, `City`) VALUES
(1, NULL, 'Moscow');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `Code_purchase` int(11) NOT NULL,
  `Code_book` int(11) DEFAULT NULL,
  `Date_order` date DEFAULT NULL,
  `Code_delivery` int(11) DEFAULT NULL,
  `Type_purchase` bit(1) DEFAULT NULL,
  `Cost` float NOT NULL,
  `Amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`Code_purchase`, `Code_book`, `Date_order`, `Code_delivery`, `Type_purchase`, `Cost`, `Amount`) VALUES
(1, 1, NULL, 1, NULL, 155, 3),
(2, 2, NULL, 1, NULL, 350, 5),
(3, 3, NULL, 1, NULL, 5000, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`Code_author`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`Code_book`),
  ADD KEY `Code_author` (`Code_author`),
  ADD KEY `Code_publish` (`Code_publish`);

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`Code_delivery`);

--
-- Indexes for table `publishing_house`
--
ALTER TABLE `publishing_house`
  ADD PRIMARY KEY (`Code_publish`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`Code_purchase`),
  ADD KEY `Code_book` (`Code_book`),
  ADD KEY `Code_delivery` (`Code_delivery`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `Code_author` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `Code_book` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `Code_delivery` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `publishing_house`
--
ALTER TABLE `publishing_house`
  MODIFY `Code_publish` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `Code_purchase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`Code_author`) REFERENCES `authors` (`Code_author`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`Code_publish`) REFERENCES `publishing_house` (`Code_publish`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`Code_book`) REFERENCES `books` (`Code_book`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`Code_delivery`) REFERENCES `deliveries` (`Code_delivery`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
