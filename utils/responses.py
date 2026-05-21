from flask import jsonify

def api_response(ok, type_response, message="", data=None):
    return jsonify({
        "ok": ok,
        "type": type_response,
        "message": message,
        "data": data
    })