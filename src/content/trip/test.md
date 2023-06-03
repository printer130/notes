---
title: "Test"
description: ""
pubDate: "May 12 2023"
heroImage: "/asd.png"
slug: "trip/test"
---

Usuario del dominio -> ASRepRoast Attack

SMB Relay en Active directory y cojer una autenticacion de red por parte de un usuario -> Net-NTLMv2

DCSync y dumpear los hashes de los usuarios que componen el directorio activo -> PassTheHash

Net-NTLMv2 -> Crackearlos de forma offline

Tenemos un usuario miembro del grupo local 'Administradores' y validamos con CrackMapExec que este no dispone de los privilegios suficientes para conectarnos por 'psexec' al equipo ->
cargar el valor 1 a localaccounttokenfilterpolicy: *cmd /c reg add HKLM\SOFTWARE\Micrisoft\Windows\CurrentVersion\Policies\system \v LocalAccountTokenFilterPolicy /t REG_DWORD /d 1 /f* y crar un recurso compartido de red que este sincronizado y garantizar privilegio total alos usuarios Local Administratotrs: *net share attack_folder=C:\Windows\Temp /GRANT:Administrators,FULL*

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