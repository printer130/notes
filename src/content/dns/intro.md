---
title: "DNS"
description: "Los servidores DNS convierten las solicitudes de nombres en direcciones IP, con lo que se controla a qué servidor se dirigirá un usuario final cuando escriba un nombre de dominio en su navegador web."
pubDate: "May 12 2023"
heroImage: "/"
slug: "dns/intro"

---

**DNS autoritativo:** Tiene la autoridad final sobre el dominio y es responsable de brindar espuestas a servidores de DNS recurrente con la información de la dirección IP.
`Amazon Route 53 es un sistema de DNS autoritativo.`

Almacenan y proporcionan información de registros DNS. Los servidores DNS recursivos (servidores DNS de almacenamiento en caché) son los "intermediarios" que buscan informacióm recursivamente en nombre de un usuario externo.

**DNS Recurrente:** Los clientes normalmente no realizan consultas directamente a los servicios de DNS autoritativo. Se conectan a un DNS solucionador o un servicio de DNS recurrente que funciona como el conserje de un hotel si bien no es dueño de los registros DNMS, funciona como un intermediario que obtiene la información dek DNS por usted.

Si un DNS recurrente tiene una referencia de DNS en caché o almacenada durante un período, entonces responde la consulta de DNS mediante el suministro de la información IP o la fuente. De lo contrario, pasa la consulta a uno o más servidores de DNS autoritativo para encontrar la información.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1686087667/Screenshot_from_2023-06-06_17-40-32_ldgtlm.png" alt="DNS">

