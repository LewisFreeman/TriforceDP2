-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 08, 2017 at 08:10 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.0.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `PHPSRePS`
--
CREATE DATABASE IF NOT EXISTS `PHPSRePS` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `PHPSRePS`;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemId` int(11) NOT NULL,
  `itemName` varchar(30) NOT NULL,
  `itemPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemId`, `itemName`, `itemPrice`) VALUES
(1, 'Medicine', 4.2),
(2, 'Other Example Item', 5),
(3, 'Toothpaste', 3),
(4, 'Toothbrush', 2),
(5, 'Deodorant ', 4),
(6, 'Cold Medicine', 5),
(7, 'Vitamins', 10),
(8, 'Prescription Medicine', 20);

-- --------------------------------------------------------

--
-- Table structure for table `salesRecords`
--

CREATE TABLE `salesRecords` (
  `saleNumber` int(11) NOT NULL,
  `item` int(30) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL,
  `price` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `salesRecords`
--

INSERT INTO `salesRecords` (`saleNumber`, `item`, `quantity`, `date`, `price`) VALUES
(6, 1, 3, '2017-09-08 15:07:40', 12.6),
(7, 1, 1, '2017-09-08 15:15:06', 4.2),
(8, 1, 4, '2017-09-08 15:15:06', 16.8),
(9, 2, 2, '2017-10-08 15:34:56', 10),
(10, 1, 8, '2018-01-08 15:42:16', 33.6),
(11, 1, 6, '2017-09-08 18:42:26', 25.2),
(12, 2, 8, '2017-09-15 15:43:04', 40),
(13, 4, 8, '2017-09-08 19:54:19', 16);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemId`);

--
-- Indexes for table `salesRecords`
--
ALTER TABLE `salesRecords`
  ADD PRIMARY KEY (`saleNumber`),
  ADD KEY `fk_item_id` (`item`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `salesRecords`
--
ALTER TABLE `salesRecords`
  MODIFY `saleNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `salesRecords`
--
ALTER TABLE `salesRecords`
  ADD CONSTRAINT `fk_item_id` FOREIGN KEY (`item`) REFERENCES `items` (`itemId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
