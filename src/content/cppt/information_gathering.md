---
title: 'Recolectar informacion'
description: ''
pubDate: 'May 12 2023'
heroImage: '/'
slug: 'information_gathering'
---

## Social Media

- Crunchbase
- Peoplefinders
- Pipl
- Spokeo

## Infrastructures

El objetivo es recolectar:

- Domains.
- Netblocks or IP addresses.
- Main servers.
- ISP's used.
- Any other technical information.

## WHOIS Protocol 43 port

- who.is
- whois.domaintools.com
- bgp.he.net
- networking.ringofsaturn.com/Tools/whois.php
- networksolutions.com/whois/index.php
- betterwhois.com

**Infracstructure of the organization?** Name servers

```bash
# Only domains with a PTR record set will respond to the above reverse lookup.
# Recibimos la direccion ip asociada al nombre de dominio.
nslookup -type=PTR IP-TARGET
dig target.com PTR

# Listar servidores responsables de traer emails para ese dominio.

nslookup -type=MX domain
dig target.com MX

# Zone transfer

nslookup -type=NS domain
dig target.com NS

###

nslookup
server [nombre de servidor para ese dominio.com]
ls -d dominio.com

dig axfr @target.com target.com

# MSN Bing
# Como determinas otros subdominios en el mismo IP?
# intentandop un reverse lookup
# el segundo es preguntar por la ayuda en google o Bing, en la url:
ip:199.193.116.231

## TOOLS
domaintools
DNSlytics
Networkappers
Robtex
```
## Netblocks y AS

Es un rango de direcciones IPs, asignadas a alguien y tienen una IP inicial y una final.

```bash
192.168.0.0 - 192.168.255.255
# puede ser descrita:

192.168.0.0/16 # CIDR
192.168.0.0 # Con una mascara de red 255.255.0.0
```

Las organizaciones pequeñas normalmente compran muy pocas IPs es por eso que haciendo un _whois_ a estos pequeños netblocks apuntan al ISP y no al individuo o a la organizacion que alquila un segmento pequeño.

Herramientas que automatizan.

- Maltego
- Foca
- Shodan
- Hostmap
- Fierce
- Dmitry
- DNSdumpster
- DNSEnum

```bash
# dnsenum -p 20 -s 100 --threads 5 cbs.com
# subbrute.py cbs.com

```
- DNSmap
- Metagoofil
- Recon-ng
- theHarvester
- knock
- subbrute
- dnsrecon
- [netcraft](https://searchdns.netcraft.com/?help=yes)