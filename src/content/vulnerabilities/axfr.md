---

title: "Full Zone Transfer (AXFR)"
description: "It is a method of sharing DNS records from the primary DNS server to the secondary DNS servers. If you already have set up all the DNS zones and you just make changes to the primary DNS zone, then it will be an IXFR zone transfer"
pubDate: "Jul 08 2022"
heroImage: "/AXFR.png"
slug: 'axfr'

---

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
dig +short ns <target>
dig axfr @<DNS_IP>
dig axfr @<DNS_IP> <DOMAIN>
fierce --domain <DOMAIN> --dns-servers <DNS_IP>
```

### How to protect

- Restrict AXFR requests to trusted IP addresses. You can do it in your DNS server configuration or on your firewall
- Additionally use transaction signatures.
- Using the Whitelisting technique(Rule of Least Privilege and place the IPs of appropriate users) for your Secondary DNS servers.

It's important to use supported file formats, double check DNS records, and audit firewall settings to make sure they are not blocking certain types of traffic.