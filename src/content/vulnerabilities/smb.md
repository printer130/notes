---
title: "SMB"
description: ""
pubDate: "Jul 03 2022"
heroImage: "/ldapi.jpg"
tag: ["windows", "smb"]
---

## Information

- It's a network file sharing protocol that is used to facilitate the sharing of files and peripherals between computers on a local network (LAN).

- Uses port 445(TCP). SMB ran on top of NetBIOS using port 139.

- Samba is an open source Linux implementation of SMB, and alllows Windows systems to access Linux shres and devices

## Exploit

knowing creds.

```bash
psexec.py Administrator@target cmd.exe
```