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
  `saleNumber` int(11) NOT NULL,
  `item` varchar(200) NOT NULL,
  `quantity` int(50) NOT NULL,
  `date` varchar(55) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `saleRecords`
--

INSERT INTO `saleRecords` (`saleNumber`, `item`, `quantity`, `date`, `price`) VALUES
(14, 'Other Example Item', 5, '2017-09-18 12:51:04pm', 25),
(15, 'Other Example Item', 5, '2017-09-18 12:51:20pm', 25),
(16, 'Other Example Item', 5, '2017-09-18 12:51:23pm', 25),
(17, 'Other Example Item', 5, '2017-09-18 12:51:23pm', 25),
(18, 'MODIFIED', 200, 'Date is flexible 18 Sept', 300),
(19, 'Cold Medicine', 3, '2017-09-18 12:51:56pm', 15),
(20, 'Deodorant ', 2, '2017-09-18 12:51:56pm', 8),
(21, 'Vitamins', 4, '2017-09-18 12:54:43pm', 40);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `saleRecords`
--
ALTER TABLE `saleRecords`
  ADD PRIMARY KEY (`saleNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `saleRecords`
--
ALTER TABLE `saleRecords`
  MODIFY `saleNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;