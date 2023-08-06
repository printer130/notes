---
title: 'Cross-Site Scripting (XSS)'
description: ''
pubDate: 'Jul 08 2022'
heroImage: '/placeholder-hero.jpg'
---

### Reflected XSS
La victima trae la carga en su HTTP request a la página vulnerable.
Esta carga se inserta en la webapp y el navegador lo executa.

### Stored or Persistent XSS
La carga se ejecuta en todos los usuarios que visiten la página.
El código es guardado por la app, sin sanitizar y luego rendereado.

El código malicioso puede ser injectado, por los atacantes, directamente por la webapp.

### DOM XSS
No son causado por errores de código en el lado del servidor.
Son permitidos cuando el JS usa los datos proporcionados por el usuario como parte de su lógica.

