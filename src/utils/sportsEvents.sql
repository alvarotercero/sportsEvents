drop database if exists `sportsEvents`;
create database `sportsEvents`;

use `sportsEvents`;

drop table if exists `events`;
create table `events` (
	`id` int not null auto_increment, 
	`nombre` varchar(50),
    `descripcion` varchar(150), 
    `fecha` date, 
    `ubicacion` varchar(50),
    `tipoDeporte` varchar(30),
    `organizador` varchar(230),
    primary key (`id`)
);

drop table if exists `users`;
create table `users` (
	`id` int not null auto_increment, 
	`username` varchar(20),
    `password` varchar(20), 
    primary key (`id`)
);

INSERT INTO `events` (nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador) VALUES
	('Maratón de Invierno', 'Carrera de 42 km a través de la ciudad', '2024-11-01', 'Madrid', 'Carrera', 'Asociación Deportiva de Madrid'),
	('Campeonato de Fútbol Sub-18', 'Torneo de fútbol juvenil', '2024-10-28', 'Barcelona', 'Fútbol', 'Federación Catalana de Fútbol'),
	('Torneo de Tenis Junior', 'Competencia para jugadores menores de 16 años', '2024-10-30', 'Valencia', 'Tenis', 'Club de Tenis Valencia'),
	('Partido de Baloncesto All-Stars', 'Exhibición de los mejores jugadores', '2024-11-05', 'Sevilla', 'Baloncesto', 'Liga Nacional de Baloncesto'),
	('Triatlón de la Costa', 'Competencia de nado, ciclismo y carrera', '2024-11-10', 'Málaga', 'Triatlón', 'Club Deportivo Málaga'),
	('Vuelta Ciclista Juvenil', 'Carrera ciclista por etapas', '2024-11-12', 'Granada', 'Ciclismo', 'Federación de Ciclismo de Andalucía'),
	('Torneo de Ajedrez Regional', 'Campeonato de ajedrez por niveles', '2024-11-15', 'Bilbao', 'Ajedrez', 'Asociación Vasca de Ajedrez'),
	('Competencia de Natación Abierta', 'Prueba de nado en mar abierto', '2024-11-20', 'Santander', 'Natación', 'Club Náutico Santander'),
	('Maratón de Montaña', 'Carrera de larga distancia en terreno montañoso', '2024-11-25', 'Oviedo', 'Carrera', 'Asociación Asturiana de Montañismo'),
	('Torneo de Voleibol Playa', 'Competencia en la playa entre equipos mixtos', '2024-11-30', 'Alicante', 'Voleibol', 'Federación Valenciana de Voleibol'),
	('Carrera de Karts', 'Competencia de velocidad en karts', '2024-12-05', 'Jerez de la Frontera', 'Karting', 'Club de Automovilismo de Jerez'),
	('Campeonato de Rugby', 'Torneo de rugby de categoría nacional', '2024-12-10', 'Zaragoza', 'Rugby', 'Asociación Nacional de Rugby'),
	('Competencia de Escalada Urbana', 'Prueba de escalada en muros de la ciudad', '2024-12-15', 'Pamplona', 'Escalada', 'Club de Montaña Pamplona'),
	('Torneo de Esgrima', 'Competencia de esgrima individual y por equipos', '2024-12-20', 'Valladolid', 'Esgrima', 'Federación de Esgrima de Castilla y León'),
	('Campeonato de Hockey Hielo', 'Torneo de hockey sobre hielo para clubes', '2024-12-22', 'San Sebastián', 'Hockey sobre hielo', 'Liga Vasca de Hockey'),
	('Open de Golf Juvenil', 'Competencia abierta para jóvenes golfistas', '2024-12-25', 'Marbella', 'Golf', 'Club de Golf Marbella'),
	('Competencia de Tiro con Arco', 'Torneo de precisión en campo abierto', '2024-12-30', 'León', 'Tiro con arco', 'Asociación Leonesa de Tiro'),
	('Copa de Skateboarding', 'Competencia de trucos y velocidad en skate', '2025-01-05', 'Madrid', 'Skateboarding', 'Asociación Madrileña de Skateboarding'),
	('Torneo de Badminton Nacional', 'Competencia de badminton en categoría senior', '2025-01-10', 'Granada', 'Badminton', 'Federación Nacional de Badminton'),
	('Competencia de Surf', 'Prueba de surf en olas grandes', '2025-01-15', 'Las Palmas', 'Surf', 'Asociación Canaria de Surf');
    

