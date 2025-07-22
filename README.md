# PMC

Simulador sencillo de una empresa militar privada. Puedes abrir `templates/index.html` directamente o ejecutar `app.py` para lanzar la versión web con Flask.

## Uso rápido

1. Instala las dependencias:

```bash
pip install -r requirements.txt
```

2. Inicia el servidor Flask:

```bash
python app.py
```

El servidor quedará accesible en `http://localhost:5000` (o el puerto definido en la variable `PORT`).

La interfaz fue modernizada con un archivo de estilos separado y animaciones suaves. Ahora cada soldado tiene atributos de lealtad, moral y especialización y puede ascender de rango.

Esta carpeta incluye ahora un servidor Flask sencillo junto con la versión por consola del juego y módulos separados que gestionan el motor principal, personal y misiones.

## Características
- Contrata candidatos disponibles o crea vacantes para esperar perfiles mejores.
- Gestión de contratos con duración y localización en distintos continentes.
- Sistema de eventos aleatorios que afectan reputación o economía.
- Historial completo de la empresa y resumen diario.
- Navegación por páginas: Inicio, Personal, Contratos, Eventos, Historia y Ayuda.
- Misiones nuevas se generan de forma automática cada día.
- Ventana emergente con resumen de novedades al finalizar el día.
