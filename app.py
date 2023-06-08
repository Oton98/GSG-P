from cgitb import html
from pickle import GET
from flask import Flask, jsonify, request, current_app, send_from_directory
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
 
app = Flask(__name__)
app.secret_key = "codoacodo"
CORS(app)
 
# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:legionsagrada15@localhost/gsp'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)
ma=Marshmallow(app)
 
# defino la tabla
class Usuario(db.Model):   # la clase Producto hereda de db.Model
    id=db.Column(db.Integer, primary_key=True)  #define los campos de la tabla   
    usuario=db.Column(db.String(100))   
    nombre=db.Column(db.String(100))
    contrasena=db.Column(db.String(100))
    correo=db.Column(db.String(100))
    
    def __init__(self,usuario,nombre,contrasena,correo):   #crea el  constructor de la clase
        self.usuario=usuario
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.contrasena=contrasena
        self.correo=correo

    @classmethod
    def check_password(self, dbpass, password): #comprueba si el password que escribio el usuario, es igual al de la base de datos
        return dbpass == password

db.create_all()  # crea las tablas
#  ************************************************************

class UsuarioSchema(ma.Schema):
    class Meta:
        fields=('id','usuario','nombre','contrasena','correo')
 
usuario_schema=UsuarioSchema()            # arroja 1 json en especifico
usuarios_schema=UsuarioSchema(many=True)  # arroja todos los json


@app.route('/login', methods=['GET', 'POST'])
def login():
    logged_user=validate_user(request.json['usuario'], request.json['contraseña']) # el request.json me sirve para extraer los campos especificos del json. 
    if logged_user:
        return "", 200,
    else:
        return "", 401



def validate_user (user, password):
    try:
        row = Usuario.query.filter_by(usuario=user).first() #hace un query en MySQL
        if row != None:
            return Usuario.check_password(row.contrasena, password) #comprobación de si conincide o no las contraseñas
        else:
            return False
    except Exception as ex:
        raise Exception(ex)

@app.route('/usuarios', methods=['POST']) # crea ruta o endpoint
def create_usuarios():
    print(request.json)  # request.json contiene el json que envio el cliente
    usuario = request.json['usuario']
    nombre = request.json['nombre']
    contrasena = request.json['contraseña']
    correo = request.json['correoelectronico']
    new_usuario = Usuario (usuario,nombre,contrasena,correo)
    db.session.add(new_usuario)
    db.session.commit()
    return usuario_schema.jsonify(new_usuario)  

@app.route('/usuarios/<id>' ,methods=['PUT'])
def update_usuario(id):
    usuario=Usuario.query.get(id)
    
    nombredeusuario=request.json['usuario']
    nombre=request.json['nombre']
    contraseña=request.json['contrasena']
    correo=request.json['correo']

    usuario.usuario=nombredeusuario
    usuario.nombre=nombre
    usuario.contrasena=contraseña
    usuario.correo=correo
    db.session.commit()
    return usuario_schema.jsonify(usuario)

@app.route('/usuarios',methods=['GET'])
def get_Usuarios():
    all_usuarios=Usuario.query.all()     # query.all() lo hereda de db.Model
    result=usuarios_schema.dump(all_usuarios)  # .dump() lo hereda de ma.schema
    return jsonify(result)
 
@app.route('/usuarios/<id>',methods=['GET'])
def get_usuario(id):
    usuario=Usuario.query.get(id)
    return usuario_schema.jsonify(usuario)

@app.route('/usuarios/<id>',methods=['DELETE'])
def delete_producto(id):
    usuario=Usuario.query.get(id)
    db.session.delete(usuario)
    db.session.commit()
    return usuario_schema.jsonify(usuario)

@app.route('/')
def root():
    return current_app.send_static_file('/index.html')

@app.route("/static/<path:path>")
def static_dir(path):
    return send_from_directory("static", path)

if __name__=='__main__':  
    app.run(debug=False)


