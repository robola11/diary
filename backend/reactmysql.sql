-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2025 at 10:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactmysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` int(11) NOT NULL,
  `suitnumber` varchar(255) NOT NULL,
  `parties` varchar(255) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `suitnumber`, `parties`, `comments`, `date`) VALUES
(62, 'WR/FHR/64c/2021', 'FRN v. Andrew  John & 4 Ors ', 'case called. Defendants present. O. Ojevwe for the prosecution, O. Ekpomebe for the 4th Defendant. Adjourned to 6/10/2025 for hearing', '9/23/2025'),
(63, 'hcg/fhr/45/2024', 'buluku v. ufuoma', 'court did not sit. adjourned to jan 14 2026', 'Sun Dec 07 2025 08:10:58 ');

-- --------------------------------------------------------

--
-- Table structure for table `endorsement`
--

CREATE TABLE `endorsement` (
  `id` int(11) NOT NULL,
  `caseid` int(11) NOT NULL,
  `suitnumber` varchar(255) NOT NULL,
  `parties` varchar(255) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `date` varchar(100) NOT NULL,
  `endorsee` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `endorsement`
--

INSERT INTO `endorsement` (`id`, `caseid`, `suitnumber`, `parties`, `comments`, `date`, `endorsee`) VALUES
(95, 62, 'WR/FHR/64c/2021', 'FRN v. Andrew  John & 4 Ors ', 'case called. Defendants present. O. Ojevwe for the prosecution, O. Ekpomebe for the 4th Defendant. Adjourned to 6/10/2025 for hearing', '9/23/2025', ''),
(96, 63, 'hcg/fhr/45/2024', 'buluku v. ufuoma', 'First Time Suit', 'Wed Nov 26 2025 14:58:29 ', ''),
(97, 63, 'hcg/fhr/45/2024', 'buluku v. ufuoma', 'court did not sit. adjourned to jan 14 2026', 'Sun Dec 07 2025 08:10:58 ', '');

-- --------------------------------------------------------

--
-- Table structure for table `imagetest`
--

CREATE TABLE `imagetest` (
  `id` int(11) NOT NULL,
  `scn` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `imgname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userType` int(40) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `imagetest`
--

INSERT INTO `imagetest` (`id`, `scn`, `name`, `lastname`, `imgname`, `email`, `mobile`, `password`, `userType`, `created_at`) VALUES
(1, 'SCN106979', 'orobosa', 'Ekpomebe', 'http://localhost:3000/images/1756981218099-lawyer.jpg', 'oroboss11@gmail.com', '09060422440', '$2b$10$EGVXWr2C3sB2E5bNkes7suvD0W/K8XHb1UsGCqsjuYGPLvws9ENuu', 1, ''),
(25, 'scn110119', 'emmanuel', 'atowo', 'http://localhost:3000/images/1757492338404-user-4.png', 'atowo@gmail.com', '08158620933', '$2b$10$LqMr9UVi.aC9WEPieSrxGu9S4R4rhcHzz19Zozt5t1gUDBQeLBDSa', 0, ''),
(26, 'scn105673', 'efe', 'gold', 'http://localhost:3000/images/1757493514033-user-1.png', 'efe@yahoo.com', '09060422440', '$2b$10$Z8aK96huPBEO973NZgMU0uNjg9wDXczNOl8Q3VlHaNKFUy3xDCkP.', 0, ''),
(27, 'SCN121324', 'Emeka', 'obi', 'http://localhost:3000/images/1757647687100-profile2.jpg', 'obi@gmail.com', '09060422488', '$2b$10$JWbacHW91Gh8Di1H940RzOjpNvFk2UTOH8rsnyykxS9o3JocNcPLa', 1, ''),
(28, 'scn446754', 'jane', 'harker', 'http://localhost:3000/images/1757649284524-profile3.jpg', 'jane@g.com', '08060543457', '$2b$10$MDOl75DyYC3L40IaL9FnF.R0ex1whmX51nig4YRXh14.vCOYKgnKi', 0, ''),
(29, 'scn12345', 'hope', 'achiever', 'http://localhost:3000/images/1757652854828-user-1.png', 'hope@gmail.com', '07038975500', '$2b$10$7nUhlofFqZJNwMcIGhnDg.OwDUtZg/J9fdQQLN7CPMX1M6jbULklW', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `access` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `userType` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `access`, `name`, `email`, `image`, `mobile`, `password`, `userType`, `created_at`) VALUES
(1, 1, 'orobosa', 'oroboss11@gmail.com', '', '09060422440', '$2a$10$5DhwAmzEEuIhvL6DM8zIYegwBH9t5r2a9C7fX5pWhhDUSeTkwePqG', 1, '2025-07-27 17:43:56'),
(2, 0, 'akpo', 'akpo@gmail.com', '', '08158620933', '$2b$10$nT6oZgFlvszu0XVjQtqSDuBGgAZNCbniJ7xfa2ffk..njQaA8iY6y', 0, '2025-07-29 05:16:13'),
(3, 0, 'johnbull', 'johnbull@gmail.com', '', '0906056789', 'nikita', 0, '2025-09-02 13:16:57'),
(4, 0, 'joshua', 'joshua@gmail.com', '', '09060422440', '[object Promise]', 0, '2025-09-03 04:59:48'),
(5, 0, 'joba', 'joba@gmail.com', '', '09060422440', 'nikita', 0, '2025-09-03 05:01:59'),
(6, 0, 'mikel', 'mikel@gmail.com', '', '08123452312', '[object Promise]', 0, '2025-09-03 05:04:50'),
(7, 0, 'michael', 'michael@gmail.com', '', '08345566773', '$2b$10$JWwK7oDqBdzTg9VwmeutPemAGktzoi4V7DtQaezn40/FIJG12GSW6', 0, '2025-09-03 05:07:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `endorsement`
--
ALTER TABLE `endorsement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imagetest`
--
ALTER TABLE `imagetest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `endorsement`
--
ALTER TABLE `endorsement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `imagetest`
--
ALTER TABLE `imagetest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
