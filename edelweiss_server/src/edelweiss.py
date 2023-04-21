#from fastapi import FastAPI
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app = Flask(__name__) #con esto tenemos lo que seria la aplicación.
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root@localhost/edelweis2' #ruta, sistema gestor, usuario driver...
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False #Configuración por defecto para que no nos de un WARNING cuando ejecutemos nuestro programa

db = SQLAlchemy(app) # Pasamos la configuraciónm al ORM con la instancia de app, el db me permitira interactuar con la base de datos.
ma = Marshmallow(app) # para crear un esquema.

#usuario

class usuario(db.Model):
    dni = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50),nullable=False)   
    apellido1 = db.Column(db.String(50),nullable=False)
    apellido2 = db.Column(db.String(50),nullable=False)
    correo = db.Column(db.String(50),nullable=False)

    def __init__(self, dni, nombre, apellido1, apellido2, correo):
        self.dni = dni
        self.nombre = nombre
        self.apellido1 = apellido1
        self.apellido2 = apellido2
        self.correo = correo


class usuarioSchema(ma.Schema):
    class Meta:
        fields = ('dni','nombre','apellido1','apellido2','correo')

#Nos sirve para pode mostrarle datos al cliente en formato esquema
usuario_schema = usuarioSchema()
usuarios_schema = usuarioSchema(many=True)

#METODO PARA INTRODUCIR USUARIOS

@app.route('/usuario', methods=['POST'])


def create_usuario():  # insertar usuarios a traves de la petición.
    #recojo todos los parametros que me llegan de la API
    dni = request.json['dni']
    nombre = request.json['nombre']
    apellido1 = request.json['apellido1']
    apellido2 = request.json['apellido2']
    correo = request.json['correo']

    new_usuario = usuario(dni = dni, nombre = nombre, apellido1 =apellido1, apellido2 = apellido2, correo = correo)# isntancio un usuario
    #con las 2 lineas siguientes lo introduzco en la base de datos.
    db.session.add(new_usuario)
    db.session.commit()

    return usuario_schema.jsonify(new_usuario)# con esto el cliente/navegador vera el nuevo usuario creado.

#METODO PARA MOSTRAR USUARIOS    

@app.route('/usuario', methods=['GET'])
def get_usuario():
    all_usuarios = usuario.query.all()
    todos=usuario_schema.dump(all_usuarios)
    return jsonify(todos) # jsonify nos permite parsear de un string a un json
    db.session.commit()




#cliente

class cliente(db.Model):
    dni_usuario = db.Column(db.Integer, db.ForeignKey(usuario.dni), primary_key=True)
    nacionalidad = db.Column(db.String(50),nullable=False)   
    personaFisica = db.Column(db.Boolean,nullable=False)

    def __init__(self, dni_usuario, nacionalidad, personaFisica):
        self.dni_usuario = dni_usuario
        self.nacionalidad = nacionalidad
        self.personaFisica = personaFisica


class clienteSchema(ma.Schema):
    class Meta:
        fields = ('dni_usuario','nacionalidad','personaFisica')

cliente_schema = clienteSchema()
clientes_schema = clienteSchema(many=True)


@app.route('/cliente', methods=['POST'])
def create_cliente():
    dni_usuario = request.json['dni_usuario']
    nacionalidad = request.json['nacionalidad']
    personaFisica = request.json['personaFisica']
    new_cliente= cliente(dni_usuario=dni_usuario, nacionalidad = nacionalidad, personaFisica = personaFisica)
    db.session.add(new_cliente)
    db.session.commit()
    return cliente_schema.jsonify(new_cliente)






#empleado

class empleado(db.Model):
    dni_usuario = db.Column(db.Integer, db.ForeignKey(usuario.dni), primary_key=True)
    login = db.Column(db.String(50),nullable=False)   
    passwd = db.Column(db.String(50),nullable=False)

    def __init__(self, dni_usuario, login, passwd):
        self.dni_usuario = dni_usuario
        self.login = login
        self.passwd = passwd


class empleadoSchema(ma.Schema):
    class Meta:
        fields = ('dni_usuario','login','passwd')

empleado_schema = empleadoSchema()
empleados_schema = empleadoSchema(many=True)

@app.route('/empleado', methods=['POST'])
def create_empleado():
    dni_usuario = request.json['dni_usuario']
    login = request.json['login']
    passwd = request.json['passwd']
    new_empleado= empleado(dni_usuario = dni_usuario, login = login, passwd = passwd)
    db.session.add(new_empleado)
    db.session.commit()
    return empleado_schema.jsonify(new_empleado)





#campaña

class campaña(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    año = db.Column(db.Date, nullable=False)
    documento = db.Column(db.String(50),nullable=False)   
    tipoCampaña = db.Column(db.String(50),nullable=False)
    responsable = db.Column(db.String(50),nullable=False)
    cliente = db.Column(db.String(50),nullable=False)

    def __init__(self,  año, documento, tipoCampaña, responsable, cliente):
        #self.id = id
        self.año = año
        self.documento = documento
        self.tipoCampaña = tipoCampaña
        self.responsable = responsable
        self.cliente = cliente


class campañaSchema(ma.Schema):
    class Meta:
        fields = ('id', 'año', 'documento', 'tipoCampaña', 'responsable', 'cliente')

campaña_schema = campañaSchema()
campañas_schema = campañaSchema(many=True)

@app.route('/campaña', methods=['POST'])
def create_campaña():
    año = request.json['año']
    documento = request.json['documento']
    tipoCampaña = request.json['tipoCampaña']
    responsable = request.json['responsable']
    cliente = request.json['cliente']
    new_campaña = campaña(año = año, documento = documento, tipoCampaña = tipoCampaña, responsable = responsable, cliente = cliente)
    db.session.add(new_campaña)
    db.session.commit()
    return campaña_schema.jsonify(new_campaña)#para que se vea lo que acabamos de crear.





# notificación

class notificación(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comentario = db.Column(db.String(500),nullable=True)
    fecha = db.Column(db.Date, nullable=False)
    id_campaña = db.Column(db.Integer, db.ForeignKey(campaña.id), nullable=False)
    dni_cliente = db.Column(db.Integer, db.ForeignKey(cliente.dni_usuario), nullable=False )
    dni_empleado = db.Column(db.Integer, db.ForeignKey(empleado.dni_usuario), nullable=False)
    

    def __init__(self, comentario, fecha,  id_campaña, dni_cliente, dni_empleado):
        #self.id = id
        self.comentario = comentario
        self.fecha = fecha
        self.id_campaña = id_campaña
        self.dni_cliente = dni_cliente
        self.dni_empleado = dni_empleado


class notificaciónSchema(ma.Schema):
    class Meta:
        fields = ('id', 'comentario', 'fecha',  'id_campaña', 'dni_cliente', 'dni_empleado')

notificación_schema = notificaciónSchema()
notificaciónes_schema = notificaciónSchema(many=True)

@app.route('/notificación', methods=['POST'])
def create_notificación():
    comentario = request.json['comentario']
    fecha = request.json['fecha']
    id_campaña = request.json['id_campaña']
    dni_cliente = request.json['dni_cliente']
    dni_empleado = request.json['dni_empleado']
    new_notificación= notificación(comentario = comentario, fecha = fecha, id_campaña = id_campaña, dni_cliente = dni_cliente, dni_empleado = dni_empleado)
    db.session.add(new_notificación)
    db.session.commit()
    return notificación_schema.jsonify(new_notificación)





# Vivienda

class vivienda(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calle = db.Column(db.String(50),nullable=False)   
    numero = db.Column(db.String(50),nullable=False)
    vendida = db.Column(db.Boolean,nullable=False)

    def __init__(self, calle, numero, vendida):
        #self.id = id
        self.calle = calle
        self.numero = numero
        self.vendida = vendida


class viviendaSchema(ma.Schema):
    class Meta:
        fields = ('id','calle','numero','vendida')

vivienda_schema = viviendaSchema()
viviendas_schema = viviendaSchema(many=True)

@app.route('/vivienda', methods=['POST'])
def create_vivienda():
    calle = request.json['calle']
    numero = request.json['numero']
    vendida = request.json['vendida']
    new_vivienda= vivienda(calle = calle, numero = numero, vendida = vendida)
    db.session.add(new_vivienda)
    db.session.commit()
    return vivienda_schema.jsonify(new_vivienda)






#tramiteCompra

class tramiteCompra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dni_empleado = db.Column(db.Integer, db.ForeignKey(empleado.dni_usuario), nullable=False)
    tipo = db.Column(db.String(50),nullable=False)
    documento = db.Column(db.String(100),nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    

    def __init__(self, dni_empleado, tipo, documento, fecha):
        #self.id = id
        self.dni_empleado = dni_empleado
        self.tipo = tipo
        self.documento = documento
        self.fecha = fecha


class tramiteCompraSchema(ma.Schema):
    class Meta:
        fields = ('id', 'dni_empleado', 'tipo',  'documento', 'fecha')

tramiteCompra_schema = tramiteCompraSchema()
tramiteCompras_schema = tramiteCompraSchema(many=True)

@app.route('/tramiteCompra', methods=['POST'])
def create_tramiteCompra():
    dni_empleado = request.json['dni_empleado']
    tipo = request.json['tipo']
    documento = request.json['documento']
    fecha = request.json['fecha']
    new_tramiteCompra= tramiteCompra(dni_empleado = dni_empleado, tipo = tipo, documento = documento, fecha = fecha)
    db.session.add(new_tramiteCompra)
    db.session.commit()
    return notificación_schema.jsonify(new_tramiteCompra)






# compra

class compra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dni_cliente = db.Column(db.Integer, db.ForeignKey(cliente.dni_usuario), nullable=False)   
    id_tramite1 = db.Column(db.Integer, db.ForeignKey(tramiteCompra.id), nullable=True)
    id_tramite2 = db.Column(db.Integer, db.ForeignKey(tramiteCompra.id), nullable=True)
    id_tramite3 = db.Column(db.Integer, db.ForeignKey(tramiteCompra.id), nullable=True)
    id_tramite4 = db.Column(db.Integer, db.ForeignKey(tramiteCompra.id), nullable=True)
    id_tramite5 = db.Column(db.Integer, db.ForeignKey(tramiteCompra.id), nullable=True)
    id_vivienda = db.Column(db.Integer, db.ForeignKey(vivienda.id), nullable=False)
    

    def __init__(self, dni_cliente, id_tramite1, id_tramite2, id_tramite3, id_tramite4, id_tramite5, id_vivienda):
        #self.id = id
        self.dni_cliente = dni_cliente
        self.id_tramite1 = id_tramite1
        self.id_tramite2 = id_tramite2
        self.id_tramite3 = id_tramite3
        self.id_tramite4 = id_tramite4
        self.id_tramite5 = id_tramite5
        self.id_vivienda = id_vivienda 
          


class compraSchema(ma.Schema):
    class Meta:
        fields = ('id', 'dni_cliente', 'id_tramite1', 'id_tramite2', 'id_tramite3', 'id_tramite4', 'id_tramite5', 'id_vivienda')

compra_schema = compraSchema()
compras_schema = compraSchema(many=True)

@app.route('/compra', methods=['POST'])
def create_compra():
    dni_cliente = request.json['dni_cliente']
    id_tramite1 = request.json['id_tramite1']
    id_tramite2 = request.json['id_tramite2']
    id_tramite3 = request.json['id_tramite3']
    id_tramite4 = request.json['id_tramite4']
    id_tramite5 = request.json['id_tramite5']
    id_vivienda = request.json['id_vivienda']

    new_compra = compra(dni_cliente = dni_cliente, id_tramite1 = id_tramite1, id_tramite2 = id_tramite2, id_tramite3 = id_tramite3, id_tramite4 = id_tramite4,  id_tramite5 = id_tramite5, id_vivienda = id_vivienda)
    db.session.add(new_compra)
    db.session.commit()
    return compra_schema.jsonify(new_compra)        







with app.app_context(): #con estas 2 lineas seriamos capaces de crear la estructura de las tablas ya que tenemos realizados los objetos.
    db.create_all()
if __name__ == "__main__":
    app.run(debug=True)    