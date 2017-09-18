-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2017 at 02:48 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phpsreps`
--

-- --------------------------------------------------------

--
-- Table structure for table `itemlist`
--

CREATE TABLE `itemlist` (
  `ItemID` int(3) NOT NULL,
  `ItemName` varchar(30) NOT NULL,
  `Price` float NOT NULL,
  `Stock` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itemlist`
--

INSERT INTO `itemlist` (`ItemID`, `ItemName`, `Price`, `Stock`) VALUES
(1, 'Medicine', 10, 1000),
(2, 'Deodorant', 5, 1000),
(3, 'Vitamins', 8, 500),
(4, 'Toothpaste', 3, 750),
(5, 'Toothbrush', 1, 2000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `itemlist`
--
ALTER TABLE `itemlist`
  ADD PRIMARY KEY (`ItemID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
