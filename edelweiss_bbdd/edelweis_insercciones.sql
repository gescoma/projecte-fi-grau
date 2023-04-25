




/* FASE 4: INSERCIONES DE PRUEBA */

USE edelweiss;



/*Tabla roles*/

INSERT INTO roles (nombre, descripcion) 
VALUES('admin','El rol admin tendra ESCRITURA, en todas las tablas'),
('contable','El rol contable solo tendra permisos de LECTURA en todas las tablas'),
('verClientes','El usuario verClientes tendra LEER eb la tabla cliente'),
('crearClientes','El rol crearClientes tendra ESCRITURA en la tabla cliente');




/*Tabla rolEntidad*/

INSERT INTO rolEntidad (entidad, permiso, rol)  VALUES('todas', 'ESCRIBIR','admin'),
('todas', 'LEER','contable'),
('cliente', 'LEER','verClientes'),
('cliente', 'ESCRIBIR','crearClientes');




/*Tabla users*/

INSERT INTO users (id, rol, login, passwd)  VALUES(1, 'verClientes', 'jlopez', 'Juan'),
(2, 'crearClientes', 'rblanco', 'Raul'),
(3, 'contable', 'pgarcia', 'Pepe'),
(4, 'Admin', 'agomez', 'Arsancio'); 



/*Tabla cliente*/

INSERT INTO cliente (id,nombre, apellido1, apellido2, correo, nacionalidad, personaFisica)  VALUES(5,'Raquel', 'Lopez', 'Garcia', 'raquel210@gmail.com','ES', TRUE),
(6, 'Amancio', 'Perez', 'Castilla', 'amancio@gmail.com', 'ES', TRUE),
(7, 'Raul', 'Lopez', 'Glez', 'Rulete87@gmail.com', 'ES', TRUE),
(8, 'Jose', 'Astillero', 'Garcia', 'josegarcia@gmail.com', 'ES', TRUE),
(9, 'Julian', 'Aranda', 'Duero', 'jarandadelduero@gmail.com', 'ES', TRUE),
(10, 'Carlos', 'Romero', 'Hernadez', 'hernan@gmail.com', 'ES', TRUE),
(11, 'Aaron', 'Lopez', 'Tercero', 'aarontercero@gmail.com', 'FR', TRUE),
(12, 'Marta', 'Carranza', 'Navarro', 'martita@gmail.com', 'FR', TRUE),
(13, 'Enrique', 'Pozuelo', 'Nevada', 'kike@gmail.com', 'FR', TRUE),
(14, 'Laura', 'Garcia', 'Aranda', 'lauraaa@gmail.com', 'DE', TRUE),
(15, 'Pepe', 'Sanchez', 'Astillero', 'pepetesan@gmail.com', 'DE', TRUE),
(16, 'Esperanza', 'Aguirre', 'Gigante', 'espegigante@gmail.com', 'DE', TRUE),
(17, 'Juan Miguel', 'Aranda','Tercero', 'juanmi569@gmail.com', 'DE', TRUE),
(18, 'Juan Ramon', 'Glez','Lopez', 'jramon23@gmail.com', 'ES', FALSE),
(19, 'Maria', 'Lopez','Garcia', 'marilop55@gmail.com', 'ES', FALSE),
(20, 'Vanesa', 'Gigante','Baeza', 'vanegb89@gmail.com', 'ES', FALSE);



/*Tabla campain*/


INSERT INTO campain (nombre, periocidad, descripcion)  VALUES('Renta', 'anual', 'Impuesto sobre la renta'),
('IBI', 'anual', 'Impuesto sobre los bienes inmuebles'),
('IVA', 'trimestral', 'declaración de iva'),
('modelo1', 'semestral', 'descripción del modelo1'),
('modelo2', 'mensual', 'Descripción del modelo2'),
('modelo3', 'anual', 'Descripción del modelo3');



/*Tabla cliente_user_campain*/

INSERT INTO cliente_user_campain (comentario,id_campain, id_cliente, id_users)  VALUES('comentarios de prueba',1 ,6, 1 ),
('coemntario2',2 ,18, 2 ),
('comentario3',3 ,7, 3 ),
('comentario4',4 ,8, 1 ),
('comentario5',5 ,19, 2 ),
('comentario6',6 ,5, 3 ),
('comentario7',1 ,6, 1 ),
('comentario8',2 ,19, 2 ),
('comentario9',3 ,10, 3 ),
('comentario10',4 ,11, 1 ),
('comentario11',5 ,20, 2 ),
('comentario12',6 ,12, 3 ),
('comentario13',1 ,13, 1 ),
('comentario14',2 ,18, 2 ),
('comentario15',3 ,14, 3 );



/*Tabla vivienda*/

/*Cabe destacar que todas las propiedades son de Mallorca*/

/*Lo suyo seria crear un trigger que cambiara el estado de vivienda cuando se hiciera la compra de FALSE a TRUE*/

INSERT INTO vivienda (calle, numero, vendida)  VALUES('Industria', '24 - 2ºC', TRUE),
('31 de Diciembre', '25-3A', FALSE),
('Alfonso el Magnanimo', '10', TRUE),
('Aragon', '20-2B', FALSE),
('Via Asima', '5', TRUE),
('Blanquerna', '24', FALSE),
('Colon', '23', TRUE),
('Eusebio Estada', '20', FALSE),
('General rivera', '26', TRUE),
('Jacinto Verdaguer', '19', FALSE),
('Camino de Jesus', '8 - 2H' , TRUE),
('Manacor', '9', FALSE),
('De los Olmos', '24 - 2F', TRUE),
('Rambla de Palma', '15', FALSE),
('Via Roma', '17 B', TRUE),
('Camino Salard', '5', FALSE),
('Estacion', '24', TRUE),
('31 de Diciembre', '10', FALSE),
('Alfonso el Magnánimo', '4', TRUE),
('Aragón', '15 - 2B', FALSE),
('Via Asima', '3', TRUE);




/*Tabla tramiteCompra*/

INSERT INTO tramiteCompra (id_users, tipo, documento, fecha)  VALUES(1, 'Notaria','doc1','2020-02-10'),
(2, 'Registro','doc2','2020-02-10'),
(3, 'Tasacion', 'doc3','2020-02-1'),
(4, 'Suministros','doc4','2020-02-15'),
(1, 'Notaria','doc5','2021-03-24'),
(2, 'Registro','doc6','2021-03-23'),
(3, 'Tasacion','doc7','2021-03-10'),
(4, 'Suministros','doc8','2021-03-29'),
(1, 'Notaria','doc9','2022-05-24'),
(2, 'Registro','doc10','2022-05-25'),
(3, 'Tasacion','doc11','2022-05-02'),
(4, 'Suministros','doc12','2022-05-30'),
(1, 'Notaria','doc13','2023-02-25'),
(2, 'Registro','doc14','2023-02-24'),
(3, 'Tasacion','doc15','2023-02-05'),
(4, 'Suministros','doc16','2023-02-24'),
(1, 'Notaria','doc17','2020-10-22'),
(2, 'Registro','doc18','2020-10-21'),
(3, 'Tasacion','doc19','2020-10-05'),
(4, 'Suministros','doc20','2020-10-24');




/*Tabla compra*/

INSERT INTO compra (id_cliente, id_tramite1, id_tramite2, id_tramite3, id_tramite4, id_vivienda)  VALUES(6,1,2,3,4,1),
(7,5,6,7,8,3),
(8,9,10,11,12,5),
(9,13,14,15,16,7),
(10,17,18,19,20,9);




/*Tabla tarea*/

INSERT INTO tarea (nombre, descripcion, id_campain, estado, id_user)  
VALUES('gestión de papeles','llevar papeles al departamento pertinente',1, 'INICIO',1),
('hacer borrador','borrador para el cliente',2, 'FIN',2),
('crear documentación','crear documentos necesarios',3, 'INICIO',3),
('comunicar con hacienda','comunicar con hacienda los datos del cliente',5, 'INICIO',4),
('destruir documentación','destruir documentos no necesarios',6, 'INICIO',3),
('crear documentación','crear documentos necesarios',3, 'FIN',3),
('destruir documentación','destruir documentos no necesarios',6, 'FIN',3);




/*Tabla registroTarea*/

INSERT INTO registroTarea (id_tarea, comentario)  
VALUES(2,'se cierra la tarea tras aprobación del encargado'),
(6,'Se crean todos los documentos y se recibe validación por parte del cliente'),
(7,'se reciclan todos los papeles destruidos');




/*Tabla archivo*/

INSERT INTO archivo (nombre, id_tarea, ruta)  
VALUES('json1',1,'ruta1'),
('pdf1',1,'ruta2'),
('word1',1,'ruta3'),
('json2',2,'ruta1'),
('pdf2',2,'ruta2'),
('word2',2,'ruta3'),
('json3',3,'ruta21'),
('pdf3',3,'ruta2'),
('word3',3,'ruta2');







