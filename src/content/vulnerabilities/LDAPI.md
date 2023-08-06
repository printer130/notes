---
title: 'LDAP Injection'
description: 'Organizations often use LDAP to enable single sign-on and to authenticate users to on-premises and web-based applications'
pubDate: 'Jul 08 2022'
heroImage: '/ldapi.jpg'
---

### Information

The LDAP server is a directory used to store user and resource information on a network.

### How to attack

- `Authentication bypass:` On a login page, there are generally two text box fields for a username and password. LDAP normally validates username and password pairs using LDAP filters. To bypass the password validation portion of the process, the attacker can enter a metacharacter -- specifically an ampersand.

- `Elevation of access privileges:` An attacker uses unsanitized user input to gain unauthorized access to information that is reserved for privileged users in the system.

- `Resource disclosure:` The attacker takes advantage of the fact that some objects in the LDAP system are searchable by any user. The attacker searches for a certain object, and under normal circumstances, the directory would return all publicly available results. With the insertion of malicious code, the attacker could manipulate this query to return all objects of that type, both private and public.

- `Blind attack:` Work on binary They elicit a true or false response from the server, enabling the attacker to gain information about the contents of the directory. These attacks are slower to implement but are simpler because they just rely on a true or false response. Attackers can test if a certain resource exists or is available -- a user object or a printer, for example. A skilled hacker could use this technique to return more complex values using a mechanism called Booleanization. For example, a hacker could query each value in a string as a true or false question, until the entire string is revealed.

```bash
#tcp 389

nmap --script ldap\* localhost

namingContexts: dc=example,dc=org

ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w dmin 'cn=admin'

ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w dmin '(&(cn=admin)(description=LDAP))'

ldapadd -x -H ldap://localhost -D "cn=admin,dc=example,dc=org" -w admin -f newuser.ldif

```

### How to protect

Enabling both LDAP Signing and LDAP Channel Binding is the most effective measure to mitigate the risk of LDAP relaying attacks. LDAP Signing protects the LDAP service, whereas LDAP Channel Binding works to protect the LDAPS service.

- Sanitize Inputs and Check Variables

- Don’t Construct Filters by Concatenating Strings

- Use Access Control on the LDAP Server
