---
title: 'Firewall'
description: ''
pubDate: 'May 12 2023'
slug: 'firewall'
---

### Procedimientos, Concinentización y Políticas

Procedimientos contra eventos de seguridad que afecten la entidad/empresa.
concientización de los usuarios/empleados.
Políticas de Seguridad.

### Seguridad Física

Protección física en CPDs.
Protección de acceso físico para usuarios.

### Seguridad perímetral

Protección del entorno o capa interna de la entidad empresa.

- firewall
- ACL
- WAF
- VPN
- DMZ

### Seguridad en la red interna

Fortificación de seguridad en la red interna

- VLANs
- IDS
  - HIDS => Host-based intrusion detection system
  - HIDS => Network intrusion detection system

### Seguridad a nivel de Servidor

- Sistemas Operativos (evitar Zero Days Exploits)
- Getión de Aplicaciones
- Servicios
- Control de logs (kernel, registro tareas)

### Seguridad a nivel de Aplicación

Protección de las aplicaciones o servicios que se encuentran expuestos al usuario

- Evitar configuración por default
- Mínimo provolegio (sudoers)
- Actualización de aplicaciones

### Seguridad a nivel de Información

Protección de datos e información

- Uso de cifrado en comunicaciones
- Particiones cifradas

### Mínimo Provilegio Posible

- Ejecución de aplicaciones
- Lectura de archivos
- Acceso a carpetas/folders
- Privilegios de modificación
- No privilegios de ADMINISTRATOR
- No provilegios de ROOT

### Gestión de riesgos

Enfoque estructurado para manejar la incertidumbre relativa a una
amenaza, a través de una secuencia de actividades humanas que
incluyen la identificación, el análisis y la evaluación de riesgo, para
luego establecer las estrategias de tratamiento del riesgo utilizando
recursos gerenciales

- Evaluación del riesgo
- Tratamiento del riesgo
- Controles implementados y por implementar

```bash

#Politicas drop
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP
#Autorizar el servicio ssh desde su "maquina-local" hacia el "firewall" al equipo 172.16.10.1
iptables -A INPUT -i enp0s8 -s 172.16.10.1 -p tcp --dport 22 -j
ACCEPT
iptables -A OUTPUT -o enp0s8 -d 172.16.10.1 -p tcp --sport 22 -j
ACCEPT

#Autorizar unicamente "ping" desde el "server-172.16.10.102" hacia el
#firewall pero bloquear todo "ping" procediente de la red 192.168.100.0
#hacia el firewall
iptables -A INPUT -i enp0s8 -s 172.16.10.102 -p icmp -j ACCEPT
iptables -A OUTPUT -o enp0s8 -d 172.16.10.102 -p icmp -j ACCEPT

#Autorizar el servicio ssh desde el equipo "172.16.10.102" hacia el "firewall"
iptables -A INPUT -i enp0s8 -s 172.16.10.102 -p tcp --dport 22 -j ACCEPT
iptables -A OUTPUT -o enp0s8 -d 172.16.10.102 -p tcp --sport 22 -j
ACCEPT
```

```bash
# Limpiar
iptablesables -F
iptables -X

# Politicas drop
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP

# Autorizar el servicio ssh desde su maquina-local hacia el firewall al equipo target_ip

iptables -A INPUT -i ens33 -s target_ip -p tcp --dport 22 -j ACCEPT
iptables -A OUTPUT -o ens33 -d target_ip -p tcp --sport 22 -j ACCEPT

## FIREWALLD
firewall-cmd --get-active-zones
systemctl enable firewalld.service
systemctl restart firewalld.service
systemctl status firewalld.service

firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --permanent --add-port=1929/tcp
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --remove-service=ssh
firewall-cmd --permanent --remove-service=dhcpv6-client


firewall-cmd --runtime-to-permanent
firewall-cmd --reload
firewall-cmd --list-all
systemctl start firewalld.service
systemctl restart firewalld.service

```

### Reglas iptables ejemplo

```bash
#!/usr/bin
# firewall.sh
echo −n Aplicando Reglas de Firewall...
## FLUSH de reglas
# Flush All Iptables Chains/Firewall rules #
iptables -F
# Delete all Iptables Chains #
iptables -X
# Flush all counters too #
iptables -Z
# Flush and delete all nat and  mangle #
iptables -t nat -F
iptables -t nat -X
iptables -t mangle -F
iptables -t mangle -X
iptables -t raw -F
iptables -t raw -X

## Establecemos politica por defecto
iptables −P INPUT ACCEPT
iptables −P OUTPUT ACCEPT
iptables −P FORWARD ACCEPT
iptables −t nat −P PREROUTING ACCEPT
iptables −t nat −P POSTROUTING ACCEPT
## Empezamos a filtrar
# El localhost se deja (por ejemplo conexiones locales a mysql)
/sbin/iptables −A INPUT −i lo −j ACCEPT
# A nuestra IP le dejamos todo
iptables −A INPUT −s 195.65.34.234 −j ACCEPT
# A un colega le dejamos entrar al mysql para que mantenga la BBDD
iptables −A INPUT −s 231.45.134.23 −p tcp −−dport 3306 −j ACCEPT
# A un diseñador le dejamos usar el FTP
iptables −A INPUT −s 80.37.45.194 −p tcp −dport 20:21 −j ACCEPT
# El puerto 80 de www debe estar abierto, es un servidor web.
iptables −A INPUT −p tcp −−dport 80 −j ACCEPT
# Y el resto, lo cerramos
iptables −A INPUT −p tcp −−dport 20:21 −j DROP
iptables −A INPUT −p tcp −−dport 3306 −j DROP
iptables −A INPUT −p tcp −−dport 22 −j DROP
iptables −A INPUT −p tcp −−dport 10000 −j DROP
echo " OK . Verifique que lo que se aplica con: iptables −L −n"
# Fin del script

# Cerramos rango de los puertos privilegiados. Cuidado con este tipo de
# barreras, antes hay que abrir a los que si tienen acceso.

iptables −A INPUT −p tcp −−dport 1:1024
iptables −A INPUT −p udp −−dport 1:1024
# Cerramos otros puertos que estan abiertos
iptables −A INPUT −p tcp −−dport 3306 −j DROP
iptables −A INPUT −p tcp −−dport 10000 −j DROP
iptables −A INPUT −p udp −−dport 10000 −j DROP
echo " OK . Verifique que lo que se aplica con: iptables −L −n"
# Fin del script
```

### ¿Que tipo de WAF esta presente?

**Valores de cookie:** Algunos sistemas de WAF revelan su presencia a traves de cookies, liberan su propio cookie durante las comunicaciones HTTP

**Citrix Netscaler**

Usa algunas respuestas de cookie diferente en el HTTP como: *ns_af* o *citrix_ns_id* o *NSC*

**F5 BIG-IP ASM**

Application Security Manager usa cookies que empiezan por *TS* y sigue de un string que respeta el siguiente regex: *^TS[a-zA-Z0-9]{3,6}*

**Barracuda**

Usa dos cookies *barra_counter_session* y *BNI__BARRACUDA_LB_COOKIE*

**Header Rewrite:** Algunos waf reescriben la cabezera HTTP. Por lo general estos modifican el encabezado del servidor para engañar a los atacantes.

```bash
HTTP/1.1 200 ok
Server: Apache (Unix)
Content-Type: text/html
Content-Length: 2143

####

HTTP/1.1 404 Not Found
Server: Netscape/9.2
Content-Type: text/html
Content-Length: 263
```

**Respuesta en el cuerpo HTTP:** Es posible detectar la presencia de WAF en el cuerpo de

```bash
# Una pagina de bloqueo, tu request disparo una alerta

# mod_security

#dotDefender Tu request bloqueada

```

**Close Connection:** Deja caer la conexion si el WAF detecta requests maliciosos.

Es posible implementar mod_security para detectar ataques de fuerza bruta

La mayoria de herramietnas de ataque bruta tienen la capacidad de detectar el tipo WAF, como [waffw00f](https://github.com/EnableSecurity/wafw00f) para detectar los WAF usa las tecnicas mencionadas:

- Cookies
- Server Cloaking
- Response Codes
- Drop Action
- Pre-Built-In Rules

