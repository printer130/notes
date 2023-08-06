---
title: 'Full Zone Transfer (AXFR)'
description: 'Es el termino usado para referirce al proceso en que el contenido de un archivo de zona dns es copiado del servidor DNS primario al servidor dns segunario.'
pubDate: 'Jul 08 2022'
heroImage: '/AXFR.png'
slug: 'axfr'
---

## Usefull comands

```bash
# Simple y poderosa herramienta
nslookup
server target
set q=NS
target.com
exit

# Coger las direcciones de lo encontrado
nslookup
server target
primary.target.com
secondary.target.com
exit

# Rcords por ejempoo MX
nslookup
server target
set q=MX
target.com
exit
```

### Information:

- **`SOA:`** Indicates the start of authority, stores important information about a domain or zone such as the email address of the administrator.
- **`A:`** IPv4 addresses.
- **`AAAA:`** IPv6 addresses.
- **`CNAME:`** Records for canonical records that indicate the canonical domain, specify domain aliases.
- **`MX:`** Records for the receiving email servers.
- **`TXT:`** Records for various verification methods.
- **`SRV:`** Specifies a host and port for specific services and include a port at that IP.
- **`PTR:`** For a reverse DNS lookup, when a user attempts to reach a domain name in their browser, a DNS lookup occurs, matching the domain name to the IP address. A reverse DNS lookup is the opposite of this process: it is a query that starts with the IP address and looks up the domain name.

The zone file at each DNS server needs to be up to date. If the data inside a Secondary DNS server is too old, it won’t be valid anymore and will be deleted. This will leave the network with one less DNS server that could answer queries.

Old DNS data could stop services from working. If there were changes made in the Primary DNS server, but the changes were not propagated, the Secondary DNS server might have A records, leading to old IP addresses that are no longer in use.

Set up newly added Secondary DNS servers. They need to get the DNS records from the Primary because they will be empty at first.

### How to Attack

```bash

#HOST
host -t axfr wit_rap.com 192.214.31.3
# ---
dig @192.214.31.3 wit_rap.com -t AXFR +nocookie
# ----
dig +short ns <target>
dig axfr @<DNS_IP>
dig axfr @<DNS_IP> <DOMAIN>
fierce --domain <DOMAIN> --dns-servers <DNS_IP>
What is the subdomain for which only reverse dns entry exists for wit_rap.com? wit_rap owns the IP address range: 192.168..

# What is the subdomain for which only reverse dns entry exists for wit_rap.com? wit_rap owns the IP address range: 192.168..
dig axfr -x 192.168 @192.214.31.3

```

### How to protect

- Restrict AXFR requests to trusted IP addresses. You can do it in your DNS server configuration or on your firewall
- Additionally use transaction signatures.
- Using the Whitelisting technique(Rule of Least Privilege and place the IPs of appropriate users) for your Secondary DNS servers.

It's important to use supported file formats, double check DNS records, and audit firewall settings to make sure they are not blocking certain types of traffic.
