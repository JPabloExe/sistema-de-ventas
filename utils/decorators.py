from functools import wraps
from flask_login import current_user
from flask import request, redirect, url_for, flash

from utils.responses import api_response

def roles_required(*cargos):

    def decorador(funcion):

        @wraps(funcion) #Copia toda la informacion de la funcion original
        def nueva_funcion(*args, **kwargs):

            if not current_user.is_authenticated or current_user.cargo not in cargos:
                if request.blueprint == 'paginas_bp':
                    flash("No tienes permisos para realizar esta accion", "error")
                    target = request.referrer or url_for('paginas_bp.index')
                    if target == request.url:
                        target = url_for('paginas_bp.index')
                    return redirect(target)
                else:
                    return api_response(
                        False,
                        "error",
                        "No tienes permisos para realizar esta accion",
                        None
                    )

            return funcion(*args, **kwargs)

        return nueva_funcion

    return decorador