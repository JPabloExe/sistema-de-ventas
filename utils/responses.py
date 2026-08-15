from flask import jsonify

def api_response(ok, type_response, message="", data=None):
    return jsonify({
        "ok": ok,
        "type": type_response,
        "message": message,
        "data": data
    })

def obtener_mensaje_mysql(e):
    if ": " in e.msg:
        return e.msg.split(": ", 1)[1]

    return e.msg