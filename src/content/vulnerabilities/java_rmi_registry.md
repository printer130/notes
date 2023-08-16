---
title: 'Java RMI Registro'
description: ''
pubDate: 'Jul 08 2022'
---

Existe una vulnerabilidad en la configuracion por defecto del RMI Registro y los Servicios de Activacion RMI afecto lo que es conocido como: "RMI Distributed Garbage Collector" esencialmente permite cargar arbitrariamente classes de Java de una url atacante.

```bash
# 1099 port
# exploit/multi/misc/java_rmi_server
1099/tcp open rmiregistry GNU Classpath grmiregistry
```
