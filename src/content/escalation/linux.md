---
title: 'Linux privilege escalation'
description: ''
pubDate: 'Jul 03 2022'
heroImage: '/ldapi.jpg'
slug: 'linux'
---

# Exploit kernel

- **_Linux exploit suggester:_**

- Dirtycow

# Cronjobs

```bash

# Example
printf '#!/bin/bash\necho "student ALL=NOPASSWD:ALL" >> /etc/sudoers' > /usr/local/share/copy.sh
```

# SUID Binaries

Provices users with the ability to execute a script or binary with the permissions of the owner as opposed to the users.

- Identify a binary SUID with owner root.

# Linux Password hashes

Looking at the number after the username encapsulated by the dollar symbol.

$1 - MD5
$2 - Blowfish
$5 - SHA-256
$6 - SHA-512

- Module from metasploit: auxiliary/analyze/crack_linux
