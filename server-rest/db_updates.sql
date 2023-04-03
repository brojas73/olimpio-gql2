
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2023 at 04:41 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olimpio`
--

-- --------------------------------------------------------

--
-- Table structure for table `estado_servicio_domicilio`
--

CREATE TABLE `estado_servicio_domicilio` (
  `id_estado_servicio_domicilio` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estado_servicio_domicilio`
--

INSERT INTO `estado_servicio_domicilio` (`id_estado_servicio_domicilio`, `nombre`, `url`, `estado`) VALUES
(0, 'Estado del Servicio', '/servicios-domicilio/servicios-activos', 1),
(1, 'Pendiente de Recolección en Cliente', '/servicios-domicilio/pendiente-recoleccion-en-cliente', 1),
(2, 'Recolectados para Entrega en Sucursal', '/servicios-domicilio/recolectados-para-entrega-en-sucursal', 1),
(3, 'Recibidos en Sucursal', '/servicios-domicilio/recibidos-en-sucursal', 1),
(4, 'Pendiente de Recolección en Sucursal', '/servicios-domicilio/pendiente-recoleccion-en-sucursal', 1),
(5, 'Recolectados para Entrega a Cliente', '/servicios-domicilio/recolectados-para-entrega-a-cliente', 1),
(6, 'Entregados al Cliente', '/servicios-domicilio/entregados-a-cliente', 1),
(7, 'Pendiente de Pago', '/servicios-domicilio/por-pagar', 1),
(100, 'Terminados', '/servicios-domicilio/terminados', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `estado_servicio_domicilio`
--
ALTER TABLE `estado_servicio_domicilio`
  ADD PRIMARY KEY (`id_estado_servicio_domicilio`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `estado_servicio_domicilio`
--
ALTER TABLE `estado_servicio_domicilio`
  MODIFY `id_estado_servicio_domicilio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2023 at 04:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olimpio`
--

-- --------------------------------------------------------

--
-- Table structure for table `servicio_domicilio_log`
--

CREATE TABLE `servicio_domicilio_log` (
  `id_servicio_domicilio_log` int(11) NOT NULL,
  `id_servicio_domicilio` int(11) NOT NULL,
  `id_tipo_accion` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `id_usuario` int(11) NOT NULL,
  `id_estado_servicio_domicilio_ini` int(11) DEFAULT NULL,
  `id_estado_servicio_domicilio_fin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `servicio_domicilio_log`
--
ALTER TABLE `servicio_domicilio_log`
  ADD PRIMARY KEY (`id_servicio_domicilio_log`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `servicio_domicilio_log`
--
ALTER TABLE `servicio_domicilio_log`
  MODIFY `id_servicio_domicilio_log` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2023 at 04:42 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olimpio`
--

-- --------------------------------------------------------

--
-- Table structure for table `servicio_domicilio`
--

CREATE TABLE `servicio_domicilio` (
  `id_servicio_domicilio` int(11) NOT NULL,
  `tipo_servicio` varchar(1) NOT NULL COMMENT 'R - Recolección, E - Entrega',
  `id_sucursal` int(11) NOT NULL,
  `fecha_requerida` date NOT NULL,
  `hora_requerida` time NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `ticket` varchar(20) DEFAULT NULL,
  `id_forma_pago` int(11) DEFAULT NULL,
  `notas_pago` varchar(200) DEFAULT NULL,
  `pagado` varchar(1) NOT NULL DEFAULT 'N',
  `referencia_pago` varchar(200) DEFAULT NULL,
  `fecha_confirmacion_pago` datetime DEFAULT NULL,
  `id_confirmo_pago` int(11) DEFAULT NULL,
  `id_estado_servicio_domicilio` int(11) NOT NULL DEFAULT 1,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `id_creado_por` int(11) NOT NULL,
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp(),
  `id_modificado_por` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicio_domicilio`
--

--
-- Triggers `servicio_domicilio`
--
DELIMITER $$
CREATE TRIGGER `td_servicio_domicilio` AFTER DELETE ON `servicio_domicilio` FOR EACH ROW insert into servicio_domicilio_log (
      id_servicio_domicilio,
      id_tipo_accion,
      id_usuario,
      id_estado_servicio_domicilio_ini,
      id_estado_servicio_domicilio_fin
) values (
      OLD.id_servicio_domicilio,
      2,    
      OLD.id_creado_por,
      OLD.id_estado_servicio_domicilio,
      OLD.id_estado_servicio_domicilio
)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ti_servicio_domicilio` AFTER INSERT ON `servicio_domicilio` FOR EACH ROW insert into servicio_domicilio_log (
      id_servicio_domicilio,
      id_tipo_accion,
      id_usuario,
      id_estado_servicio_domicilio_ini,
      id_estado_servicio_domicilio_fin
   ) values (
       NEW.id_servicio_domicilio,
       1,    
       NEW.id_creado_por,
       null,
       NEW.id_estado_servicio_domicilio
   )
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tu_servicio_domicilio` AFTER UPDATE ON `servicio_domicilio` FOR EACH ROW insert into servicio_domicilio_log (
      id_servicio_domicilio,
      id_tipo_accion,
      id_usuario,
      id_estado_servicio_domicilio_ini,
      id_estado_servicio_domicilio_fin
   ) values (
       NEW.id_servicio_domicilio,
       3,    
       NEW.id_modificado_por,
       OLD.id_estado_servicio_domicilio,
       NEW.id_estado_servicio_domicilio
   )
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `servicio_domicilio`
--
ALTER TABLE `servicio_domicilio`
  ADD PRIMARY KEY (`id_servicio_domicilio`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `servicio_domicilio`
--
ALTER TABLE `servicio_domicilio`
  MODIFY `id_servicio_domicilio` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

