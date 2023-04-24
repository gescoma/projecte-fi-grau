


/*FASE 1: CREACIÓN DE BASE DE DATOS SIEMPRE QUE NO EXISTA, POSTERIOR USO*/

CREATE DATABASE IF NOT EXISTS edelweis DEFAULT CHARACTER SET 'UTF8MB4' DEFAULT COLLATE 'UTF8MB4_general_ci';


USE edelweis;






/*FASE 2: CREACIÓN DE TODAS LAS TABLAS QUE COMPONEN LA BASE DE DATOS "edelweiss"*/

	
	
CREATE TABLE users (
    id int AUTO_INCREMENT NOT NULL,
    rol VARCHAR(50) NOT NULL,
    login VARCHAR(50) NOT NULL,  /*usuario*/
    passwd VARCHAR(50) NOT NULL,   /*contrasena*/
    PRIMARY KEY (id)
    );	
	
	
	
CREATE TABLE cliente (
    id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(50) NOT NULL,
    apellido1 VARCHAR(50) NOT NULL,
    apellido2 VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    nacionalidad VARCHAR(50),
    personaFisica BOOLEAN,   /*¿Estamos tratando con una persona fisica, o es una empresa? p.fisica: YES/1 -- empresa: NO/0*/
    PRIMARY KEY (id)
    );	
	
	
	
CREATE TABLE campain (
    id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(50) NOT NULL,
    periocidad VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,	
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );



CREATE TABLE cliente_user_campain (
    id int AUTO_INCREMENT NOT NULL,
	comentario VARCHAR(500),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	id_campain int NOT NULL,
	id_cliente int NOT NULL,
	id_users int NOT NULL,
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
    id_cliente int NOT NULL,
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
	id_users int NOT NULL,
    tipo VARCHAR (50) NOT NULL, /*ASOCIAR UN TIPO DE TRAMITE*/
	documento VARCHAR (100) NOT NULL,
	fecha DATE NOT NULL,
    PRIMARY KEY (id)
    );	
	
	
	
/*NUEVAS TABLAS*/




CREATE TABLE roles ( 
    nombre VARCHAR (50) NOT NULL, 
	descripcion VARCHAR (200) NOT NULL,
    PRIMARY KEY (nombre)
    );	




CREATE TABLE rolEntidad (
	id int AUTO_INCREMENT NOT NULL,
    entidad ENUM ("todas","cliente","users", "campain", "notificacion", "compra", "tramiteCompra", "vivienda") NOT NULL, 
	permiso ENUM ("LEER","ESCRIBIR") NOT NULL,   /*Escribir incluye a los 2*/
	rol VARCHAR (50) NOT NULL,
    PRIMARY KEY (id)
    );




CREATE TABLE tarea ( /*una campaña tiene una o varias tareas*/
	id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR (50) NOT NULL, 
	descripcion VARCHAR (200) NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    id_campain int NOT NULL, 
	estado ENUM ("INICIO","AZTUALIZADA","FIN") NOT NULL,
	id_user int NOT NULL, /*encargado*/
    PRIMARY KEY (id)
    );
	
	
	

CREATE TABLE registroTarea ( /*se podra hacer con un tigger*/
	id int AUTO_INCREMENT NOT NULL,
	fecha_cambioEstado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_tarea int NOT NULL, 
	comentario VARCHAR (200) NOT NULL,
    PRIMARY KEY (id)
    );	



	
CREATE TABLE archivo ( /*una tarea tiene uno o varios archivos*/
	id int AUTO_INCREMENT NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
	nombre VARCHAR (50) NOT NULL,
    id_tarea int NOT NULL, 
	ruta VARCHAR (200) NOT NULL,
    PRIMARY KEY (id)
    );	




/* FASE 3: CREACIÓN DE RELACIONES ENTRE LAS DIFERENTES ENTIDADES (FKs)*/	



/*FKs cliente_user_campain*//*los "notis" son los alias*/

ALTER TABLE cliente_user_campain ADD CONSTRAINT fk_noti1 FOREIGN KEY (id_campain) REFERENCES campain (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE cliente_user_campain ADD CONSTRAINT fk_noti2 FOREIGN KEY (id_cliente) REFERENCES cliente (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE cliente_user_campain ADD CONSTRAINT fk_noti3 FOREIGN KEY (id_users) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK tramiteCompra */

ALTER TABLE tramiteCompra ADD CONSTRAINT fk_tramiteCompra FOREIGN KEY (id_users) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FKs Compra *//*fk_tra, son los 4 registros para que acepte varios tramites*/

ALTER TABLE compra ADD CONSTRAINT fk_compra1 FOREIGN KEY (id_cliente) REFERENCES cliente (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra1 FOREIGN KEY (id_tramite1) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra2 FOREIGN KEY (id_tramite2) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra3 FOREIGN KEY (id_tramite3) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra4 FOREIGN KEY (id_tramite4) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_tra5 FOREIGN KEY (id_tramite5) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_compra2 FOREIGN KEY (id_vivienda) REFERENCES vivienda (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK users */

ALTER TABLE users ADD CONSTRAINT fk_users FOREIGN KEY (rol) REFERENCES roles (nombre) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK rolEntidad */

ALTER TABLE rolEntidad ADD CONSTRAINT fk_rolEntidad FOREIGN KEY (rol) REFERENCES roles (nombre) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK tarea */

ALTER TABLE tarea ADD CONSTRAINT fk_tarea FOREIGN KEY (id_campain) REFERENCES campain (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE tarea ADD CONSTRAINT fk_tareaEncargado FOREIGN KEY (id_user) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK registroTarea */

ALTER TABLE registroTarea ADD CONSTRAINT fk_registroTarea FOREIGN KEY (id_tarea) REFERENCES tarea (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK archivo */

ALTER TABLE archivo ADD CONSTRAINT fk_archivo FOREIGN KEY (id_tarea) REFERENCES tarea (id) ON UPDATE CASCADE ON DELETE CASCADE;










 