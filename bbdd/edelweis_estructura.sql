/*FASE 1: CREACIÓN DE BASE DE DATOS SIEMPRE QUE NO EXISTA, POSTERIOR USO*/

CREATE DATABASE IF NOT EXISTS edelweis DEFAULT CHARACTER SET 'utf8' DEFAULT COLLATE 'utf8_general_ci';


USE edelweis;






/*FASE 2: CREACIÓN DE TODAS LAS TABLAS QUE COMPONEN LA BASE DE DATOS "edelweis"*/

CREATE TABLE usuario (
    dni int NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido1 VARCHAR(50) NOT NULL,
    apellido2 VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    PRIMARY KEY (dni)
    );
	
	
	
CREATE TABLE empleado (
    dni_usuario int NOT NULL,
    login VARCHAR(50) NOT NULL,  /*usuario*/
    passwd VARCHAR(50) NOT NULL,   /*contraseña*/
    PRIMARY KEY (dni_usuario)
    );	
	
	
	
CREATE TABLE cliente (
    dni_usuario int NOT NULL,
    nacionalidad VARCHAR(50),
    personaFisica BOOLEAN,   /*¿Estamos tratando con una persona fisica, o es una empresa? p.fisica: YES/1 -- empresa: NO/0*/
    PRIMARY KEY (dni_usuario)
    );	
	
	
	
CREATE TABLE campaña (
    id int AUTO_INCREMENT NOT NULL,
    año DATE NOT NULL,
	documento VARCHAR(100) NOT NULL,
    tipoCampaña VARCHAR(50) NOT NULL, 
    responsable VARCHAR(50) NOT NULL,/*MIRAR SI ES PRESCINDIBLE*//*SEGURAMENTE SE ACABARA QUITANDO*/
    cliente VARCHAR(50) NOT NULL, /*MIRAR SI ES PRESCINDIBLE*//*SEGURAMENTE SE ACABARA QUITANDO*/
    PRIMARY KEY (id)
    );



CREATE TABLE notificacion (
    id int AUTO_INCREMENT NOT NULL,
	comentario VARCHAR(500),
    fecha DATE NOT NULL,
	id_campaña int NOT NULL,
	dni_cliente int NOT NULL,
	dni_empleado int NOT NULL,
    PRIMARY KEY (id)
    );	
	
	
	
CREATE TABLE vivienda (
    id int AUTO_INCREMENT NOT NULL,
    calle VARCHAR(50) NOT NULL,
    numero VARCHAR(50) NOT NULL,   /*Es varchar aunque sea numerico, solo se utiliza a nivel informativo*/
	vendida BOOLEAN NOT NULL,  /*queremos saber SI la vivienda esta vendida o NO*/
    PRIMARY KEY (id)
    );	
	
	
	
	
CREATE TABLE compra (
    id int AUTO_INCREMENT NOT NULL,
    dni_cliente int NOT NULL,
	id_tramite1 int, /*Estos 5 campos son Fks de la tabla tramiteCompra con esto conseguimos que una compra pueda tener varios tramites*/
	id_tramite2 int,	/*Pueden ser null porque no siempre haran falta todos los tramites*/
	id_tramite3 int,
	id_tramite4 int,
	id_tramite5 int, /*puede ser un agrupado de liquidación de impuestos (ITP-AJD-PLUSVALIA)*/
	id_vivienda int NOT NULL,
    PRIMARY KEY (id)
    );



CREATE TABLE tramiteCompra (
    id int AUTO_INCREMENT NOT NULL,
	dni_empleado int NOT NULL,
    tipo VARCHAR (50) NOT NULL, /*ASOCIAR UN TIPO DE TRAMITE*/
	documento VARCHAR (100) NOT NULL,
	fecha DATE NOT NULL,
    PRIMARY KEY (id)
    );	
	
	
	






/* FASE 3: CREACIÓN DE RELACIONES ENTRE LAS DIFERENTES ENTIDADES (FKs)*/	

/*FK empleado*/

ALTER TABLE empleado ADD CONSTRAINT fk_empleado FOREIGN KEY (dni_usuario) REFERENCES usuario (dni) ON UPDATE CASCADE ON DELETE CASCADE;



/*FK cliente*/

ALTER TABLE cliente ADD CONSTRAINT fk_cliente FOREIGN KEY (dni_usuario) REFERENCES usuario (dni) ON UPDATE CASCADE ON DELETE CASCADE;



/*FKs notificación*//*los "notis" son los alias*/

ALTER TABLE notificacion ADD CONSTRAINT fk_noti1 FOREIGN KEY (id_campaña) REFERENCES campaña (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE notificacion ADD CONSTRAINT fk_noti2 FOREIGN KEY (dni_cliente) REFERENCES cliente (dni_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE notificacion ADD CONSTRAINT fk_noti3 FOREIGN KEY (dni_empleado) REFERENCES empleado (dni_usuario) ON UPDATE CASCADE ON DELETE CASCADE;



/*FK tramiteCompra */

ALTER TABLE tramiteCompra ADD CONSTRAINT fk_tramiteCompra FOREIGN KEY (dni_empleado) REFERENCES empleado (dni_usuario) ON UPDATE CASCADE ON DELETE CASCADE;



/*FKs Compra *//*fk_tra, son los 4 registros para que acepte varios tramites*/

ALTER TABLE compra ADD CONSTRAINT fk_compra1 FOREIGN KEY (dni_cliente) REFERENCES cliente (dni_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra1 FOREIGN KEY (id_tramite1) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra2 FOREIGN KEY (id_tramite2) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra3 FOREIGN KEY (id_tramite3) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra4 FOREIGN KEY (id_tramite4) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra5 FOREIGN KEY (id_tramite5) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_compra2 FOREIGN KEY (id_vivienda) REFERENCES vivienda (id) ON UPDATE CASCADE ON DELETE CASCADE;


