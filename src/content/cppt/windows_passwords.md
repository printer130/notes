---
title: 'Windows Passwords'
description: ''
pubDate: 'May 12 2023'
slug: 'cppt/windows_passwords'
---

All the passwords in windows (except in Domain Controller configuration) are stored in a configuration database called SAM stored as a registry file.

Stores users' passowrds in a hashed format:

- LM hash
- NT hash

```bash
# But it is not accesible when operating system is runnning
C:\Windows\System32\config

# or in the register but privesc is necessary:

HKEY_LOCAL_MACHINE\SAM

```

### Stealing the hash REMOTELY LOCALLY

Example:

- Username: mynoname
- Password: mystrongpsw

**Remotely:** Passwords are dumped from the memory of remote system, by loading the passowrd dumping program from remote

Requires at least an Administrator privileges.

- [pwdump](http://foofus.net/fizzgig/pwdump)

- [fgdump](http://foofus.net/goons/fizzgig/fgdump)

- [ophcrack](http://ophcrack.sourceforge.net)

### Off-line System

If you have physical access to the off-line machine, you have a few more options than if you had a live system.

You can still steal hashes but, in this situtation, you can also overwrite hashes or even bypass windows login


```bash
# Steal hashes
#BackTrack 5 has two tools that allow us to do this, and are bkhive and samdump2

# for win7 use Uppercase 'SYSTEM'
bhhive system syskey.txt

samdump2 SAM system.txt > ourhashdump.txt

cat ourhashdump.txt

# Overwrite hash - chntpw
$ /pentest/passwords/chntpw -i /media/8SADasdikj3/WINDOWS/system32/config/SAM

# Choose to edit data and which user to change
# Clear the password
# Quit and write hive files.

```

- **Bypass login:**

- **kon-Boot** is a software which allows to change contents of a Linux and Windows kernel on the fly.

It allows to log into a system as root user without typing the correct passwrod or to elevate privileges from current user to root. It allows to enter any password protected profile without any knowledge of the password.

### What to do with hashes?

The next step is **Pass-the-hash** or **Crack the hash**
