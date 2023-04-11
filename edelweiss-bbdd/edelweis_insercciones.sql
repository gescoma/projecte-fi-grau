/* FASE 4: INSERCIONES DE PRUEBA */



/*Tabla usuario*/

INSERT INTO usuario (dni, nombre, apellido1, apellido2, correo)  VALUES(40001001, 'Juan', 'Lopez','Tercero', 'juanito23@gmail.com'),
(40001002, 'Raul', 'Blanco','Gomez', 'raulito@gmail.com'),
(40001003, 'Pepe', 'Garcia','Glez', 'pepgarcia@gmail.com'),
(40001004, 'Arsancio','Gomez','Garcia', 'Arsa55@gmail.com'),
(40001005, 'Raquel', 'Lopez', 'Garcia', 'raquel210@gmail.com'),
(40001006, 'Amancio', 'Perez', 'Castilla', 'amancio@gmail.com'),
(40001007, 'Raul', 'Lopez', 'Glez', 'Rulete87@gmail.com'),
(40001008, 'Jose', 'Astillero', 'Garcia', 'josegarcia@gmail.com'),
(40001009, 'Julian', 'Aranda', 'Duero', 'jarandadelduero@gmail.com'),
(40001010, 'Carlos', 'Romero', 'Hernadez', 'hernan@gmail.com'),
(40001011, 'Aaron', 'Lopez', 'Tercero', 'aarontercero@gmail.com'),
(40001012, 'Marta', 'Carranza', 'Navarro', 'martita@gmail.com'),
(40001013, 'Enrique', 'Pozuelo', 'Nevada', 'kike@gmail.com'),
(40001014, 'Laura', 'Garcia', 'Aranda', 'lauraaa@gmail.com'),
(40001015, 'Pepe', 'Sanchez', 'Astillero', 'pepetesan@gmail.com'),
(40001016, 'Esperanza', 'Aguirre', 'Gigante', 'espegigante@gmail.com'),
(40001017, 'Juan Miguel', 'Aranda','Tercero', 'juanmi569@gmail.com'),
(40001018, 'Juan Ramón', 'Glez','Lopez', 'jramon23@gmail.com'),
(40001019, 'Maria', 'Lopez','Garcia', 'marilop55@gmail.com'),
(40001020, 'Vanesa', 'Gigante','Baeza', 'vanegb89@gmail.com');



/*Tabla empleado*/

INSERT INTO empleado (dni_usuario, login, passwd)  VALUES(40001001, 'jlopez', 'Juan'),
(40001002, 'rblanco', 'Raul'),
(40001003, 'pgarcia', 'Pepe'),
(40001004, 'agomez', 'Arsancio'); /*Rol de admin*/



/*Tabla cliente*/

INSERT INTO cliente (dni_usuario, nacionalidad, personaFisica)  VALUES(40001005, 'Española', TRUE),
(40001006, 'Española', TRUE),
(40001007, 'Española', TRUE),
(40001008, 'Española', TRUE),
(40001009, 'Española', TRUE),
(40001010, 'Española', TRUE),
(40001011, 'Francesa', TRUE),
(40001012, 'Francesa', TRUE),
(40001013, 'Francesa', TRUE),
(40001014, 'Alemana', TRUE),
(40001015, 'Alemana', TRUE),
(40001016, 'Alemana', TRUE),
(40001017, 'Alemana', TRUE),
(40001018, 'Española', FALSE),
(40001019, 'Española', FALSE),
(40001020, 'Española', FALSE);



/*Tabla campaña*/

/*NOTA-Modifico manualmente la estructura de esta tabla para poder poner los campos "responsable" y "cliente" como nulos, 
posteriormente se pueden quitar o no quitar en función de si nos aporta algo a nivel informativo, si fuera el caso de que nos aportara
podriamos hacer una inserción automatica con un trigger para que a raiz de los DNI puedan insertar los nombres por ejemplo*/

INSERT INTO campain (id, year, documento, tipoCampain)  VALUES( 32,'2019-04-10', 'ruta1', 'Renta'),
(33,'2019-03-10', 'ruta2', 'Sociedades'),
(34,'2019-05-10', 'ruta3', 'IBI'),
(35,'2020-04-10', 'ruta4', 'Renta'),
(36,'2020-03-10', 'ruta5', 'Sociedades'),
(37,'2020-05-10', 'ruta6', 'IBI'),
(38,'2021-04-10', 'ruta7', 'Renta'),
(39,'2021-03-10', 'ruta8', 'Sociedades'),
(40,'2021-05-10', 'ruta9', 'IBI'),
(41,'2022-04-10', 'ruta10', 'Renta'),
(42,'2022-03-10', 'ruta11', 'Sociedades'),
(43,'2022-05-10', 'ruta12', 'IBI'),
(44,'2023-04-10', 'ruta13', 'Renta'),
(45,'2023-03-10', 'ruta14', 'Sociedades'),
(46,'2023-05-10', 'ruta15', 'IBI');



/*Tabla notificacion*/

INSERT INTO notificacion (comentario, fecha, id_campain, dni_cliente, dni_empleado)  VALUES('ruta historico1', '2019-04-20',32 ,40001006, 40001001 ),
('ruta historico2', '2019-03-20',33 ,40001018, 40001002 ),
('ruta historico3', '2019-05-20',34 ,40001007, 40001003 ),
('ruta historico4', '2019-04-20',35 ,40001008, 40001001 ),
('ruta historico5', '2019-03-20',36 ,40001019, 40001002 ),
('ruta historico6', '2019-05-20',37 ,40001005, 40001003 ),
('ruta historico7', '2019-04-20',38 ,40001006, 40001001 ),
('ruta historico8', '2019-03-20',39 ,40001019, 40001002 ),
('ruta historico9', '2019-05-20',40 ,40001010, 40001003 ),
('ruta historico10', '2019-04-20',41 ,40001011, 40001001 ),
('ruta historico11', '2019-03-20',42 ,40001020, 40001002 ),
('ruta historico12', '2019-05-20',43 ,40001012, 40001003 ),
('ruta historico13', '2019-04-20',44 ,40001013, 40001001 ),
('ruta historico14', '2019-03-20',45 ,40001018, 40001002 ),
('ruta historico15', '2019-05-20',46 ,40001014, 40001003 );



/*Tabla vivienda*/

/*Cabe destacar que todas las propiedades son de Mallorca*/

/*Lo suyo seria crear un trigger que cambiara el estado de vivienda cuando se hiciera la compra de FALSE a TRUE*/

INSERT INTO vivienda (calle, numero, vendida)  VALUES('Industria', '24 - 2ºC', TRUE),
('31 de Diciembre', '25-3A', FALSE),
('Alfonso el Magnánimo', '10', TRUE),
('Aragón', '20 - 2ºB', FALSE),
('Via Asima', '5', TRUE),
('Blanquerna', '24', FALSE),
('Colón', '23', TRUE),
('Eusebio Estada', '20', FALSE),
('General rivera', '26', TRUE),
('Jacinto Verdaguer', '19', FALSE),
('Camino de Jesus', '8 - 2ºH' , TRUE),
('Manacor', '9', FALSE),
('De los Olmos', '24 - 2ºF', TRUE),
('Rambla de Palma', '15', FALSE),
('Via Roma', '17 B', TRUE),
('Camino Salard', '5', FALSE),
('Estación', '24', TRUE),
('31 de Diciembre', '10', FALSE),
('Alfonso el Magnánimo', '4', TRUE),
('Aragón', '15 - 2ºB', FALSE),
('Via Asima', '3', TRUE);




/*Tabla tramiteCompra*/

INSERT INTO tramiteCompra (dni_empleado, tipo, documento, fecha)  VALUES(40001001, 'Notaria','doc1','2020-02-10'),
(40001002, 'Registro','doc2','2020-02-10'),
(40001003, 'Tasación', 'doc3','2020-02-1'),
(40001004, 'Suministros','doc4','2020-02-15'),
(40001001, 'Notaria','doc5','2021-03-24'),
(40001002, 'Registro','doc6','2021-03-23'),
(40001003, 'Tasación','doc7','2021-03-10'),
(40001004, 'Suministros','doc8','2021-03-29'),
(40001001, 'Notaria','doc9','2022-05-24'),
(40001002, 'Registro','doc10','2022-05-25'),
(40001003, 'Tasación','doc11','2022-05-02'),
(40001004, 'Suministros','doc12','2022-05-30'),
(40001001, 'Notaria','doc13','2023-02-25'),
(40001002, 'Registro','doc14','2023-02-24'),
(40001003, 'Tasación','doc15','2023-02-05'),
(40001004, 'Suministros','doc16','2023-02-29'),
(40001001, 'Notaria','doc17','2020-10-22'),
(40001002, 'Registro','doc18','2020-10-21'),
(40001003, 'Tasación','doc19','2020-10-05'),
(40001004, 'Suministros','doc20','2020-10-24');




/*Tabla compra*/

INSERT INTO compra (dni_cliente, id_tramite1, id_tramite2, id_tramite3, id_tramite4, id_vivienda)  VALUES(40001006,1,2,3,4,1),
(40001007,5,6,7,8,3),
(40001008,9,10,11,12,5),
(40001009,13,14,15,16,7),
(40001010,17,18,19,20,9);