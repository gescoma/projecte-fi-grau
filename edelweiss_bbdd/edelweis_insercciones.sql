




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

INSERT INTO users (id, name, apellido1, imagen, email, rol, login, passwd)  
VALUES(1, 'Jimena', 'lopez','imagen1','jlopez@gmail.com','verClientes', 'jlopez', 'passwdhaseada1'),
(2, 'Raul', 'Blanco','imagen2','rblanco@gmail.com', 'crearClientes', 'rblanco', 'passwdhaseada2'),
(3, 'Pedro', 'Garcia','imagen3','pgarcia@gmail.com','contable', 'pgarcia', 'passwdhaseada3'),
(4, 'Ana Belen', 'Gomez','imagen4','anabgolez@gmail.com','Admin', 'agomez', 'passwdhaseada4'); 



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




/*Tabla compra*/

INSERT INTO compra (id_users, id_cliente, id_vivienda)  VALUES(1,6,1),
(2,7,3),
(3,8,5),
(4,9,7),
(1,10,9);




/*Proyecto*/

INSERT INTO proyecto (nombre, descripcion, id_cliente_user_campain, id_users, id_compra)  
VALUES('Proyecto1','Proyecto para la compra del dia 9 de mayo',NULL,1,1),
('Proyecto2','Proyecto para la Campaña de la renta',1,2,NULL),
('Proyecto3','Proyecto IBI',3,3,NULL),
('Proyecto4','Proyecto para la compra del dia 10 de mayo',NULL,3,2),
('Proyecto5','Proyecto para la compra del dia 15 de mayo',NULL,1,3),
('Proyecto6','Proyecto para la compra del dia 23 de mayo',NULL,4,4);






/*Tabla tramiteCompra*/

INSERT INTO tramiteCompra (nombre, descripcion, id_proyecto, id_compra, estado, id_users)  VALUES('ITP','impuesto transmisiones patrimoniales',1,1,'FIN',1),
('Notaria','LLevar papeles al notario',1,1,'INICIO',2),
('Banco','Gestiones con el banco',1,1,'FIN',3),
('Registro','Registro de la propiedad',1,1,'INICIO',4),
('ITP','impuesto transmisiones patrimoniales',1,2,'INICIO',1),
('Notaria','LLevar papeles al notario',4,2,'FIN',2),
('Banco','Gestiones con el banco',4,2,'FIN',3),
('Registro','Registro de la propiedad',4,2,'INICIO',4),
('ITP','impuesto transmisiones patrimoniales',5,3,'INICIO',1),
('Notaria','LLevar papeles al notario',5,3,'FIN',2),
('Banco','Gestiones con el banco',5,3,'FIN',3),
('Registro','Registro de la propiedad',5,3,'INICIO',4),
('ITP','impuesto transmisiones patrimoniales',6,4,'INICIO',1),
('Notaria','LLevar papeles al notario',6,4,'INICIO',2),
('Banco','Gestiones con el banco',6,4,'FIN',3),
('Registro','Registro de la propiedad',6,4,'INICIO',4);




/*Tabla tarea*/

INSERT INTO tarea (nombre, descripcion, id_proyecto, id_cliente_user_campain, estado, id_user)  
VALUES('gestión de papeles','llevar papeles al departamento pertinente',2,1, 'INICIO',1),
('hacer borrador','borrador para el cliente',NULL,2, 'FIN',2),
('crear documentación','crear documentos necesarios',2,3, 'INICIO',3),
('comunicar con hacienda','comunicar con hacienda los datos del cliente',2,5, 'INICIO',4),
('destruir documentación','destruir documentos no necesarios',NULL,6, 'INICIO',3),
('crear documentación','crear documentos necesarios',NULL,3, 'FIN',3),
('destruir documentación','destruir documentos no necesarios',NULL,6, 'FIN',3);




/*Tabla registroTarea*/

INSERT INTO registroTarea (id_tarea, comentario)  
VALUES(2,'se cierra la tarea tras aprobación del encargado'),
(6,'Se crean todos los documentos y se recibe validación por parte del cliente'),
(7,'se reciclan todos los papeles destruidos');




/*Tabla archivo*/

INSERT INTO archivo (nombre,rutaRel, rutaAbs)  
VALUES('json1','//ruta1','/ruta/absoluta'),
('pdf1','//ruta2' ,'/ruta/absoluta'),
('word1','//ruta3' ,'/ruta/absoluta'),
('json2','//ruta1' ,'/ruta/absoluta'),
('pdf2','//ruta2' ,'/ruta/absoluta'),
('word2','//ruta3' ,'/ruta/absoluta'),
('json3','//ruta21' ,'/ruta/absoluta'),
('pdf3','//ruta2' ,'/ruta/absoluta'),
('word3','//ruta2', '/ruta/absoluta');




/*Tabla tareaArchivo*/

INSERT INTO tareaArchivo (id_tarea, id_archivo)  
VALUES(1,1),
(2,2),
(3,3);




/*Tabla tareaArchivo*/

INSERT INTO tramiteCompraArchivo (id_tramiteCompra, id_archivo)  
VALUES(1,4),
(2,5),
(3,6),
(4,7),
(5,8),
(6,9);






