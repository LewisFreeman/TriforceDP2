-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 18, 2017 at 12:59 PM
-- Server version: 5.6.33
-- PHP Version: 7.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `PHPSRePS`
--

-- --------------------------------------------------------

--
-- Table structure for table `saleRecords`
--

CREATE TABLE `saleRecords` (
  `TransactionID` int(4) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(30) NOT NULL,
  `Quantity` int(2) NOT NULL,
  `Date` varchar(12) NOT NULL,
  `Price` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `saleRecords`
--

INSERT INTO `saleRecords` (`saleNumber`, `item`, `quantity`, `date`, `price`) VALUES
(1, 'Medicine', 5, '2017-09-18', 25),
(2, 'Deodorant', 5, '2017-09-18', 25),
(3, 'Toothpaste', 5, '2017-09-18', 25),
(6, 'Deodorant ', 2, '2017-09-18', 8),
(7, 'Vitamins', 4, '2017-09-18', 40);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `saleRecords`
--
ALTER TABLE `saleRecords`
  ADD PRIMARY KEY (`saleNumber`);