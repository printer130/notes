---
title: "Chisel Port Forwarding"
description: ""
pubDate: "May 12 2023"
heroImage: "/"
slug: "port-forwarding"
---


```bash
# target_1
#chisel client kali_ip:1234 R:80:target_2:80 
chisel client kali_ip:port R:socks

# KALI
# nano /etc/proxychains.conf
strict_chain
# dynamic_chain

socks5 127.0.0.1 1080 # POner el puerto que te habra el server chisel
chisel server --reverse -p 1234
```