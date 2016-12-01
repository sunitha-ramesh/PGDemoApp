-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 24, 2016 at 06:46 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aws_sample_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student_details`
--

CREATE TABLE `tbl_student_details` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_student_details`
--

INSERT INTO `tbl_student_details` (`id`, `name`, `address`, `city`) VALUES
(2, 'sankar', 'chennai', 'chennai'),
(3, 'Jayam', 'RA Puram', 'Chennai'),
(4, 'Jayam', 'RA Puram', 'Chennai'),
(5, 'Jayam', 'RA Puram', 'Chennai'),
(6, 'Jayam', 'RA Puram', 'Chennai'),
(7, 'Jayam', 'RA Puram', 'Chennai'),
(8, 'Jayam', 'RA Puram', 'Chennai'),
(9, 'Jayam', 'RA Puram', 'Chennai'),
(10, 'Jayam', 'RA Puram', 'Chennai'),
(11, 'Jayam', 'RA Puram', 'Chennai'),
(12, 'Jayam', 'RA Puram', 'Chennai'),
(13, 'Jayam', 'RA Puram', 'Chennai'),
(14, 'Jayam', 'RA Puram', 'Chennai'),
(15, 'Jayam', 'RA Puram', 'Chennai'),
(16, 'Jayam', 'RA Puram', 'Chennai'),
(17, 'Jayam', 'RA Puram', 'Chennai'),
(18, 'Jayam', 'RA Puram', 'Chennai'),
(19, 'Jayam', 'RA Puram', 'Chennai'),
(20, 'Jayam', 'RA Puram', 'Chennai'),
(21, 'Jayam', 'RA Puram', 'Chennai'),
(22, 'Jayam', 'RA Puram', 'Chennai'),
(23, 'Jayam', 'RA Puram', 'Chennai'),
(24, 'Jayam', 'RA Puram', 'Chennai'),
(25, 'Jayam', 'RA Puram', 'Chennai'),
(26, 'Jayam', 'RA Puram', 'Chennai'),
(27, 'Jayam', 'RA Puram', 'Chennai'),
(28, 'Jayam', 'RA Puram', 'Chennai'),
(29, 'Jayam', 'RA Puram', 'Chennai'),
(30, 'Jayam', 'RA Puram', 'Chennai'),
(31, 'Jayam', 'RA Puram', 'Chennai'),
(32, 'Jayam', 'RA Puram', 'Chennai'),
(33, 'Jayam', 'RA Puram', 'Chennai'),
(34, 'Jayam', 'RA Puram', 'Chennai'),
(35, 'Jayam', 'RA Puram', 'Chennai'),
(36, 'Jayam', 'RA Puram', 'Chennai'),
(37, 'Jayam', 'RA Puram', 'Chennai'),
(38, 'Jayam', 'RA Puram', 'Chennai'),
(39, 'Jayam', 'RA Puram', 'Chennai'),
(40, 'Jayam', 'RA Puram', 'Chennai'),
(41, 'Jayam', 'RA Puram', 'Chennai'),
(42, 'Jayam', 'RA Puram', 'Chennai'),
(43, 'Jayam', 'RA Puram', 'Chennai'),
(44, 'Jayam', 'RA Puram', 'Chennai'),
(45, 'Jayam', 'RA Puram', 'Chennai'),
(46, 'Jayam', 'RA Puram', 'Chennai'),
(47, 'Jayam', 'RA Puram', 'Chennai'),
(48, 'Jayam', 'RA Puram', 'Chennai'),
(49, 'Jayam', 'RA Puram', 'Chennai'),
(50, 'Jayam', 'RA Puram', 'Chennai'),
(51, 'Jayam', 'RA Puram', 'Chennai'),
(52, 'Jayam', 'RA Puram', 'Chennai'),
(53, 'Jayam', 'RA Puram', 'Chennai'),
(54, 'Jayam', 'RA Puram', 'Chennai'),
(55, 'Jayam', 'RA Puram', 'Chennai'),
(56, 'Jayam', 'RA Puram', 'Chennai'),
(57, 'Jayam', 'RA Puram', 'Chennai'),
(58, 'Jayam', 'RA Puram', 'Chennai'),
(59, 'Jayam', 'RA Puram', 'Chennai'),
(60, 'Jayam', 'RA Puram', 'Chennai'),
(61, 'Jayam', 'RA Puram', 'Chennai'),
(62, 'Jayam', 'RA Puram', 'Chennai'),
(63, 'Jayam', 'RA Puram', 'Chennai'),
(64, 'Jayam', 'RA Puram', 'Chennai'),
(65, 'Jayam', 'RA Puram', 'Chennai'),
(66, 'Jayam', 'RA Puram', 'Chennai'),
(67, 'Jayam', 'RA Puram', 'Chennai'),
(68, 'Jayam', 'RA Puram', 'Chennai'),
(69, 'Jayam', 'RA Puram', 'Chennai'),
(70, 'Jayam', 'RA Puram', 'Chennai'),
(71, 'Jayam', 'RA Puram', 'Chennai'),
(72, 'Jayam', 'RA Puram', 'Chennai'),
(73, 'Jayam', 'RA Puram', 'Chennai'),
(74, 'Jayam', 'RA Puram', 'Chennai'),
(75, 'Jayam', 'RA Puram', 'Chennai'),
(76, 'Jayam', 'RA Puram', 'Chennai'),
(77, 'Jayam', 'RA Puram', 'Chennai'),
(78, 'Jayam', 'RA Puram', 'Chennai'),
(79, 'Jayam', 'RA Puram', 'Chennai'),
(80, 'Jayam', 'RA Puram', 'Chennai'),
(81, 'Jayam', 'RA Puram', 'Chennai'),
(82, 'Jayam', 'RA Puram', 'Chennai'),
(83, 'Jayam', 'RA Puram', 'Chennai'),
(84, 'Jayam', 'RA Puram', 'Chennai'),
(85, 'Jayam', 'RA Puram', 'Chennai'),
(86, 'Jayam', 'RA Puram', 'Chennai'),
(87, 'Jayam', 'RA Puram', 'Chennai'),
(88, 'Jayam', 'RA Puram', 'Chennai'),
(89, 'Jayam', 'RA Puram', 'Chennai'),
(90, 'Jayam', 'RA Puram', 'Chennai'),
(91, 'Jayam', 'RA Puram', 'Chennai'),
(92, 'Jayam', 'RA Puram', 'Chennai'),
(93, 'Jayam', 'RA Puram', 'Chennai'),
(94, 'Jayam', 'RA Puram', 'Chennai'),
(95, 'Jayam', 'RA Puram', 'Chennai'),
(96, 'Jayam', 'RA Puram', 'Chennai'),
(97, 'Jayam', 'RA Puram', 'Chennai'),
(98, 'Jayam', 'RA Puram', 'Chennai'),
(99, 'Jayam', 'RA Puram', 'Chennai'),
(100, 'Jayam', 'RA Puram', 'Chennai'),
(101, 'Jayam', 'RA Puram', 'Chennai'),
(102, 'Jayam', 'RA Puram', 'Chennai'),
(103, 'Jayam', 'RA Puram', 'Chennai'),
(104, 'Jayam', 'RA Puram', 'Chennai'),
(105, 'Jayam', 'RA Puram', 'Chennai'),
(106, 'Jayam', 'RA Puram', 'Chennai'),
(107, 'Jayam', 'RA Puram', 'Chennai'),
(108, 'Jayam', 'RA Puram', 'Chennai'),
(109, 'Jayam', 'RA Puram', 'Chennai'),
(110, 'Jayam', 'RA Puram', 'Chennai'),
(111, 'Jayam', 'RA Puram', 'Chennai'),
(112, 'Jayam', 'RA Puram', 'Chennai'),
(113, 'Jayam', 'RA Puram', 'Chennai'),
(114, 'Jayam', 'RA Puram', 'Chennai'),
(115, 'Jayam', 'RA Puram', 'Chennai'),
(116, 'Jayam', 'RA Puram', 'Chennai'),
(117, 'Jayam', 'RA Puram', 'Chennai'),
(118, 'Jayam', 'RA Puram', 'Chennai'),
(119, 'Jayam', 'RA Puram', 'Chennai'),
(120, 'Jayam', 'RA Puram', 'Chennai'),
(121, 'Jayam', 'RA Puram', 'Chennai'),
(122, 'Jayam', 'RA Puram', 'Chennai'),
(123, 'Jayam', 'RA Puram', 'Chennai'),
(124, 'Jayam', 'RA Puram', 'Chennai'),
(125, 'Jayam', 'RA Puram', 'Chennai'),
(126, 'Jayam', 'RA Puram', 'Chennai'),
(127, 'Jayam', 'RA Puram', 'Chennai'),
(128, 'Jayam', 'RA Puram', 'Chennai'),
(129, 'Jayam', 'RA Puram', 'Chennai'),
(130, 'Jayam', 'RA Puram', 'Chennai'),
(131, 'Jayam', 'RA Puram', 'Chennai'),
(132, 'Jayam', 'RA Puram', 'Chennai'),
(133, 'Jayam', 'RA Puram', 'Chennai'),
(134, 'Jayam', 'RA Puram', 'Chennai'),
(135, 'Jayam', 'RA Puram', 'Chennai'),
(136, 'Jayam', 'RA Puram', 'Chennai'),
(137, 'Jayam', 'RA Puram', 'Chennai'),
(138, 'Jayam', 'RA Puram', 'Chennai'),
(139, 'Jayam', 'RA Puram', 'Chennai'),
(140, 'Jayam', 'RA Puram', 'Chennai'),
(141, 'Jayam', 'RA Puram', 'Chennai'),
(142, 'Jayam', 'RA Puram', 'Chennai'),
(143, 'Jayam', 'RA Puram', 'Chennai'),
(144, 'Jayam', 'RA Puram', 'Chennai'),
(145, 'Jayam', 'RA Puram', 'Chennai'),
(146, 'Jayam', 'RA Puram', 'Chennai'),
(147, 'Jayam', 'RA Puram', 'Chennai'),
(148, 'Jayam', 'RA Puram', 'Chennai'),
(149, 'Jayam', 'RA Puram', 'Chennai'),
(150, 'Jayam', 'RA Puram', 'Chennai'),
(151, 'Jayam', 'RA Puram', 'Chennai'),
(152, 'Jayam', 'RA Puram', 'Chennai'),
(153, 'Jayam', 'RA Puram', 'Chennai'),
(154, 'Jayam', 'RA Puram', 'Chennai'),
(155, 'Jayam', 'RA Puram', 'Chennai'),
(156, 'Jayam', 'RA Puram', 'Chennai'),
(157, 'Jayam', 'RA Puram', 'Chennai'),
(158, 'Jayam', 'RA Puram', 'Chennai'),
(159, 'Jayam', 'RA Puram', 'Chennai'),
(160, 'Jayam', 'RA Puram', 'Chennai'),
(161, 'Jayam', 'RA Puram', 'Chennai'),
(162, 'Jayam', 'RA Puram', 'Chennai'),
(163, 'Jayam', 'RA Puram', 'Chennai'),
(164, 'Jayam', 'RA Puram', 'Chennai'),
(165, 'Jayam', 'RA Puram', 'Chennai'),
(166, 'Jayam', 'RA Puram', 'Chennai'),
(167, 'Jayam', 'RA Puram', 'Chennai'),
(168, 'Jayam', 'RA Puram', 'Chennai'),
(169, 'Jayam', 'RA Puram', 'Chennai'),
(170, 'Jayam', 'RA Puram', 'Chennai'),
(171, 'Jayam', 'RA Puram', 'Chennai'),
(172, 'Jayam', 'RA Puram', 'Chennai'),
(173, 'Jayam', 'RA Puram', 'Chennai'),
(174, 'Jayam', 'RA Puram', 'Chennai'),
(175, 'Jayam', 'RA Puram', 'Chennai'),
(176, 'Jayam', 'RA Puram', 'Chennai'),
(177, 'Jayam', 'RA Puram', 'Chennai'),
(178, 'Jayam', 'RA Puram', 'Chennai'),
(179, 'Jayam', 'RA Puram', 'Chennai'),
(180, 'Jayam', 'RA Puram', 'Chennai'),
(181, 'Jayam', 'RA Puram', 'Chennai'),
(182, 'Jayam', 'RA Puram', 'Chennai'),
(183, 'Jayam', 'RA Puram', 'Chennai'),
(184, 'Jayam', 'RA Puram', 'Chennai'),
(185, 'Jayam', 'RA Puram', 'Chennai'),
(186, 'Jayam', 'RA Puram', 'Chennai'),
(187, 'Jayam', 'RA Puram', 'Chennai'),
(188, 'Jayam', 'RA Puram', 'Chennai'),
(189, 'Jayam', 'RA Puram', 'Chennai'),
(190, 'Jayam', 'RA Puram', 'Chennai'),
(191, 'Jayam', 'RA Puram', 'Chennai'),
(192, 'Jayam', 'RA Puram', 'Chennai'),
(193, 'Jayam', 'RA Puram', 'Chennai'),
(194, 'Jayam', 'RA Puram', 'Chennai'),
(195, 'Jayam', 'RA Puram', 'Chennai'),
(196, 'Jayam', 'RA Puram', 'Chennai'),
(197, 'Jayam', 'RA Puram', 'Chennai'),
(198, 'Jayam', 'RA Puram', 'Chennai'),
(199, 'Jayam', 'RA Puram', 'Chennai'),
(200, 'Jayam', 'RA Puram', 'Chennai'),
(201, 'Jayam', 'RA Puram', 'Chennai'),
(202, 'Jayam', 'RA Puram', 'Chennai'),
(203, 'Jayam', 'RA Puram', 'Chennai'),
(204, 'Jayam', 'RA Puram', 'Chennai'),
(205, 'Jayam', 'RA Puram', 'Chennai'),
(206, 'Jayam', 'RA Puram', 'Chennai'),
(207, 'Jayam', 'RA Puram', 'Chennai'),
(208, 'Jayam', 'RA Puram', 'Chennai'),
(209, 'Jayam', 'RA Puram', 'Chennai'),
(210, 'Jayam', 'RA Puram', 'Chennai'),
(211, 'Jayam', 'RA Puram', 'Chennai'),
(212, 'Jayam', 'RA Puram', 'Chennai'),
(213, 'Jayam', 'RA Puram', 'Chennai'),
(214, 'Jayam', 'RA Puram', 'Chennai'),
(215, 'Jayam', 'RA Puram', 'Chennai'),
(216, 'Jayam', 'RA Puram', 'Chennai'),
(217, 'Jayam', 'RA Puram', 'Chennai'),
(218, 'Jayam', 'RA Puram', 'Chennai'),
(219, 'Jayam', 'RA Puram', 'Chennai'),
(220, 'Jayam', 'RA Puram', 'Chennai'),
(221, 'Jayam', 'RA Puram', 'Chennai'),
(222, 'Jayam', 'RA Puram', 'Chennai');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_student_details`
--
ALTER TABLE `tbl_student_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_student_details`
--
ALTER TABLE `tbl_student_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
