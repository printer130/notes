---
title: 'Scanning'
description: ''
pubDate: 'May 12 2023'
heroImage: '/enumeration.png'
slug: 'network/scan'
---

```bash

# Ver su es candidato zombie
nmap --script ipidseq target -p135
nmap -O -v target -p135
nmap -sI target:135 target -p23 -Pn

# Detect at least one port
hping3 -S --scan known target

# If the host is a good zombie by running:
hping3 -S -r -p135 target

# debe imprimer Id: relatiovos son cambios

# Crea paquetes con la siguiente confioguracion
hping3 -a zombie_ip -S -p target_port target_ip_address

# para monitorear el zombie necesitamos mantener el comando corriendo:
hping3 -S -r -p135 target
# si el id incrementa en 2 deducimos que el puerto_objetivo en la direccion_objetivo

sudo nmap -S target target -p23 -Pn -n -e eth0 --disble-arp-ping

```

### Nmap Fragmentacion

En vez de usar -f podemos usar --mtu para especificar un desplazamiento personalizado, el desplazamiento debe ser multiplo de 8.

```bash
nmap -sS -f target

# añade 100 bytes de longituda a la cabezera
nmap -sS -f target -Pn -n --date-length 100

# Remplaza el paquete de 8 bytes a 16 bytes
nmap -sS -f -f target

```

### Decoys

Cannot use with -sT -sV scans (these use full connect scan).

```bash
nmaps -sS -D decoy1,decoy2,decoy3,me target
```

### Timing

No modifica la manera que el paquete esta falsificado, el único propósito es ralentizar la exploración con el fin de mezclar con otro trafico en los logs del firewall

```bash

nmap -sS -T[0-5] target_ip
# T0 -> 5min -> paranoid
# T1 -> 15s -> sneaky
# T2 -> 0.4s -> polite
# T3 -> default -> normal
# T4 -> 10millisec -> aggresive
# T5 -> 5millisec -> insane

nmap -sS target -T2 -p22,35,34,42 --max-retries 1
# --max-retries -> Nmap envia la prueba una vez mas si el host no responde.

```

### Source ports

```bash
nmap -sS --source-port 53 target

# Todo el trafico corre desde el puerto 80
nmap -g 80 -sS target/24
```

### otros

Replaza la direccion mac con una random

```bash

nmap --spoof-mac 0 target -p80 -Pn --disable-arp-ping -n

nmap -iL host.list -sS -p80,443,135,5555,22 --randomize-hosts -T2

```
