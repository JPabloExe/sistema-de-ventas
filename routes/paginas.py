from flask import Blueprint, render_template

paginas_bp = Blueprint('paginas_bp', __name__)

@paginas_bp.route('/')
def index():
    return render_template('index.html')

@paginas_bp.route('/inventario')
def inventario():
    return render_template('inventario.html')

@paginas_bp.route('/puntoVentas')
def puntoVentas():
    return render_template('puntoVentas.html')

@paginas_bp.route('/ventas')
def ventas():
    return render_template('ventas.html')

@paginas_bp.route('/usuarios')
def usuarios():
    return render_template('usuarios.html')