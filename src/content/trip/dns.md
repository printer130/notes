---
title: 'DNS'
description: 'Los servidores DNS convierten las solicitudes de nombres en direcciones IP, con lo que se controla a qué servidor se dirigirá un usuario final cuando escriba un nombre de dominio en su navegador web.'
pubDate: 'May 12 2023'
heroImage: '/'
slug: 'dns/intro'
---

**DNS autoritativo:** Tiene la autoridad final sobre el dominio y es responsable de brindar espuestas a servidores de DNS recurrente con la información de la dirección IP.
`Amazon Route 53 es un sistema de DNS autoritativo.`

Almacenan y proporcionan información de registros DNS. Los servidores DNS recursivos (servidores DNS de almacenamiento en caché) son los "intermediarios" que buscan informacióm recursivamente en nombre de un usuario externo.

**DNS Recurrente:** Los clientes normalmente no realizan consultas directamente a los servicios de DNS autoritativo. Se conectan a un DNS solucionador o un servicio de DNS recurrente que funciona como el conserje de un hotel si bien no es dueño de los registros DNMS, funciona como un intermediario que obtiene la información dek DNS por usted.

Si un DNS recurrente tiene una referencia de DNS en caché o almacenada durante un período, entonces responde la consulta de DNS mediante el suministro de la información IP o la fuente. De lo contrario, pasa la consulta a uno o más servidores de DNS autoritativo para encontrar la información.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1686087667/Screenshot_from_2023-06-06_17-40-32_ldgtlm.png" alt="DNS">

Usuario del dominio -> ASRepRoast Attack

SMB Relay en Active directory y cojer una autenticacion de red por parte de un usuario -> Net-NTLMv2

DCSync y dumpear los hashes de los usuarios que componen el directorio activo -> PassTheHash

Net-NTLMv2 -> Crackearlos de forma offline

Tenemos un usuario miembro del grupo local 'Administradores' y validamos con CrackMapExec que este no dispone de los privilegios suficientes para conectarnos por 'psexec' al equipo ->
cargar el valor 1 a localaccounttokenfilterpolicy:
`*cmd /c reg addHKLM\SOFTWARE\Micrisoft\Windows\CurrentVersion\Policies\system \v LocalAccountTokenFilterPolicy /t REG_DWORD /d 1 /f*` y crar un recurso compartido de red que este sincronizado y garantizar privilegio total alos usuarios Local Administratotrs: _net share attack_folder=C:\Windows\Temp /GRANT:Administrators,FULL_

Con el grupo Remote Management User -> WinRM

Si un usuario tiene la conf 'Do Not Require Kerberos Pre-Authentication' -> ASREPRoast Attack

Solicitar un Ticket Granting Service(TGS) para romperlo con fuerza bruta -> kerberoasting Attack

GetNPUsers.py -> ASREPRoast Attack

GETUsersSPNs.py -> kerberoasting Attack

Desplegar un SMB Relay en un entorno empresarial con 'reponder' y 'ntlmrelayx.py' e interceptar la conexion de un usuario sobre un equipo fijado como target -> para dumpear la SAM el usuario posea como minimo privilegios de administrador.

Si un Principal dispone de los privilegios 'GetChanges' y 'GetChangesAll' se otorga la capacidad -> DCSync

    - DnsAdmins
    - SeLoadDriverPrivilege
    - SeAssignPrimaryPrivilege
    - SeTcbPrivilege
    - SeBackupPrivilege
    - SeRestorePrivilege
    - SeCreateTokenPrivilege
    - SeTakeOwnershipPrivilege
    - SeDebugPrivilege
    - SeImpersonatePrivilege
