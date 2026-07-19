## Sistema de ventas

Sistema web para la gestión de ventas e inventario orientado a tiendas de barrio. Permite administrar productos, usuarios y ventas de forma sencilla, reemplazando procesos manuales realizados en cuadernos o hojas de cálculo.

## Características

- Registro e inicio de sesión de usuarios
- Gestión de productos
- Gestión de categorías
- Gestión de inventario
- Registro de ventas
- Control automático de stock
- Historial de ventas
- Búsqueda y filtros
- Reportes (Próximamente)

## Tecnologías utilizadas

- Python 3.13
- Flask
- MySQL
- HTML5
- CSS3
- JavaScript
- Docker
- Git

## Requisitos

- Python 3.13 o superior
- MySQL 8
- pip
- Git

## Instalación

# 1. Clonar el repositorio

```bash
git clone https://github.com/JPabloExe/sistema-de-ventas.git
```

# 2. Entrar al proyecto

```bash
cd sistema-de-ventas
```

# 3. Crear el entorno virtual

```bash
python -m venv venv
```
- Activarlo en windows: venv\Scripts\activate

- Activarlo en Linux: source venv/bin/activate

# 4. Instalar dependencias

```bash
pip install -r requirements.txt
```

## Configuración

Cree un archivo `.env` utilizando como referencia el archivo `.env.example`.

## Base de datos

Crear la base de datos:

Ejecute los scripts SQL en el siguiente orden:

```
schema.sql
procedures.sql
triggers.sql
data.sql
```

## Ejecutar el proyecto

```bash
python run.py
```

La aplicación estará disponible en

```
http://localhost:5000
```

## Ejecutar con Docker

# 1. Clonar el repositorio

```bash
git clone https://github.com/JPabloExe/sistema-de-ventas.git
```

# 2. Entrar al proyecto

```bash
cd sistema-de-ventas
```

# 3. Crear el archivo `.env.docker`

Crea un archivo llamado `.env.docker` tomando como referencia el archivo `.env.docker.example`.

# 4. Ejecutar elmproyecto

La primera vez, ejecuta:

```bash
docker compose up --build
```

En ejecuciones posteriores:

```bash
docker compose up
```

La aplicación estará disponible en:

```
http://localhost:5000
```

La base de datos MySQL se inicializará automáticamente ejecutando los scripts SQL incluidos en el proyecto (`schema.sql`, `procedures.sql`, `triggers.sql` y `data.sql`).

## Autor

Juan López