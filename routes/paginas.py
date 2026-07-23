from flask import Blueprint, render_template
from flask_login import login_required
from utils.decorators import roles_required
paginas_bp = Blueprint('paginas_bp', __name__)

@paginas_bp.route('/')
@login_required
@roles_required("Administrador", "Supervisor", "Empleado")
def index():
    return render_template('index.html')

@paginas_bp.route('/login')
def login():
    return render_template('login.html')

@paginas_bp.route('/inventario')
@login_required
@roles_required("Administrador")
def inventario():
    return render_template('inventario.html')

@paginas_bp.route('/puntoVentas')
@login_required
@roles_required("Administrador", "Supervisor", "Empleado")
def puntoVentas():
    return render_template('puntoVentas.html')

@paginas_bp.route('/ventas')
@login_required
@roles_required("Administrador", "Supervisor")
def ventas():
    return render_template('ventas.html')

@paginas_bp.route('/usuarios')
@login_required
@roles_required("Administrador")
def usuarios():
    return render_template('usuarios.html')

@paginas_bp.route('/historial_compras')
@login_required
@roles_required("Administrador", "Supervisor")
def historial_compras():
    return render_template('historial_compras.html')

@paginas_bp.route('/proveedores')
@login_required
@roles_required("Administrador", "Supervisor")
def proveedores():
    return render_template('proveedores.html')
