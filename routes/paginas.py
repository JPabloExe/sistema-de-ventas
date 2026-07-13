from flask import Blueprint, render_template
from flask_login import login_required
paginas_bp = Blueprint('paginas_bp', __name__)

@paginas_bp.route('/')
@login_required
def index():
    return render_template('index.html')

@paginas_bp.route('/login')
def login():
    return render_template('login.html')

@paginas_bp.route('/inventario')
@login_required
def inventario():
    return render_template('inventario.html')

@paginas_bp.route('/puntoVentas')
@login_required
def puntoVentas():
    return render_template('puntoVentas.html')

@paginas_bp.route('/ventas')
@login_required
def ventas():
    return render_template('ventas.html')

@paginas_bp.route('/usuarios')
@login_required
def usuarios():
    return render_template('usuarios.html')