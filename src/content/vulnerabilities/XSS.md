---
title: 'Cross-Site Scripting (XSS)'
description: ''
pubDate: 'Jul 08 2022'
heroImage: '/placeholder-hero.jpg'
---

### Reflected XSS (server)

Ocurre cuando la data del usuario es enviada a la aplicación web y es inmediatamente repetida de vuelta al contenido no confiable

La victima trae la carga en su request a la página vulnerable,
esta carga se inserta en la webapp y el navegador lo executa.

```php
<?php $name = @$_GET['name']; ?>

Welcome <?=$name?>
```

### Stored or Persistent XSS (server)
La carga se ejecuta en todos los usuarios que visiten la página.
El código es guardado por la app, sin sanitizar y luego rendereado.

El código malicioso puede ser injectado, por los atacantes, directamente por la webapp.

```php

<?php
$file = 'newcomers.log';
if(@$_GET['name']) {
  $current = file_get_contents($file);
  $current .= $_GET['name']."\n";
  // almacena 'newcomer'
  file_put_contents($file, $current);
}
// si admin muestra 'newcomers'
if(@$_GET['admin'] == 1) {
  echo file_get_contents($file);
}
>

```

### DOM XSS | Type-0 | Local XSS (client)

Es dado cuando JavaScript usa los datos del usuario como parte de su lógica igual que *reflected* pero sin interactuar con el lado del navegador.

```php
# Toda la información del DOM esta disponible, URL, history, cookies, etc. 

# Hay dos llaves fundamentales: SOURCES y SINKS
<h1 id='welcome'></h1>
<script>
  var w = "Welcome";
  // location.hash -> SOURCE del input desconfiable
  var name = document.location.hash.substr(
    document.location.hash.search(/#w!/i) + 3,
    document.location.hash.length
  );
  // innerHTML -> SINK donde el input es usado
  document.getElementById('welcome').innerHTML = w + name;
</script>

# Sumideros(sinks) son como puntos en la corriente de agua donde dependiendode la fuente(input del usuario) puede ser peligroso resultando en la perdida de Confidencialidad, Integridad y Disponibilidad.
```

### Universal XSS | UXSS

No aprovecha las fallas de la "App" sino de las extensiones, plugins.

### Cross-Site Tracking (XST)

<script>
  // TRACE Request
  var xmlhttp = new XMLHttpRequest()
  var url = 'http://victim.site'
  xmlhttp.withCredentials = true
  xmlhttp.open('TRACE', url)

  // Callback para registrar todas las cabezeras de la respuesta
  function hand() {
    console.log(this.getAllResponseHeaders())
  }
  xmlhttp.onreadystatechange = hand
  xmlhttp.send()
  // Si todo va bien podemos leer las cabezeras de vuelta del request'TRACE', esta tecnica es antigua y los navegadores lo bloquean
</script>