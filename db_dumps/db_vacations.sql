-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2024 at 01:46 PM
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
-- Database: `db_vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `Code_document` int(11) NOT NULL,
  `document_number` int(11) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `vacation_start_date` date DEFAULT NULL,
  `vacation_end_date` date DEFAULT NULL,
  `Code_employee` int(11) DEFAULT NULL,
  `Code_vacation` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`Code_document`, `document_number`, `registration_date`, `vacation_start_date`, `vacation_end_date`, `Code_employee`, `Code_vacation`) VALUES
(2, 323452, '2024-07-20', '2024-07-25', '2024-07-30', 5, 8);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `Code_employee` int(11) NOT NULL,
  `last_name` char(30) DEFAULT NULL,
  `first_name` char(30) DEFAULT NULL,
  `middle_name` char(30) DEFAULT NULL,
  `vacancy` char(30) DEFAULT NULL,
  `unit` char(30) DEFAULT NULL,
  `hiring_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`Code_employee`, `last_name`, `first_name`, `middle_name`, `vacancy`, `unit`, `hiring_date`) VALUES
(3, 'Smith', 'John', 'Doe', '7', 'HR', '2020-01-01'),
(4, 'Johnson', 'Jane', 'Alice', '8', 'IT', '2021-03-15'),
(5, 'Williams', 'Bob', 'Charlie', '9', 'MKT', '2019-07-30'),
(6, 'Brown', 'Emma', 'Grace', '10', 'FIN', '2022-05-20'),
(7, 'Jones', 'Michael', 'Ethan', '11', 'PR', '2023-11-13'),
(9, 'Williams', 'John', 'Ethan', '9', 'HR', '2020-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `Code_vacation` int(11) NOT NULL,
  `vacation_type` char(40) DEFAULT NULL,
  `vacation_bill` int(11) DEFAULT NULL,
  `vacation_benefits` char(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`Code_vacation`, `vacation_type`, `vacation_bill`, `vacation_benefits`) VALUES
(7, 'Annual Leave', 2000, 'Health Insurance'),
(8, 'Sick Leave', 500, 'Paid Time Off'),
(9, 'Maternity', 3000, 'Child Care'),
(10, 'Paternity', 3000, 'Child Care'),
(11, 'Unpaid Leave', 0, 'None');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`Code_document`),
  ADD KEY `Code_employee` (`Code_employee`),
  ADD KEY `Code_vacation` (`Code_vacation`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`Code_employee`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`Code_vacation`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `Code_document` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `Code_employee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `Code_vacation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`Code_employee`) REFERENCES `employees` (`Code_employee`),
  ADD CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`Code_vacation`) REFERENCES `vacations` (`Code_vacation`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
