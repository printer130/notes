---
title: 'Cross-Origin Resource Exchange (CORS)'
description: 'It allows servers to specify who can access its assets and which HTTP request methods are allowed from external resources.'
pubDate: 'Jul 08 2022'
heroImage: '/corss.png'
slug: 'vulnerabilities/cors'
---

### Information

Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain. It extends and adds flexibility to the same-origin policy. However, it also provides potential for cross-domain attacks. CORS is not a protection against cross-origin attacks such as cross-site request forgery (CSRF).

### How to attack

Real attacks require Access-Control-Allow-Credentials to be set to true because this will allow the browser to send the credentials and read the response.

```bash
Access-Control-Allow-Origin: http://attacker-site.com
Access-Control-Allow-Credentials: true
```

#### Reflected Origin

The application is considered vulnerable when it sets the Access-Control-Allow-Origin to the attacker’s supplied domain and enables passing credentials with the Access-Control-Allow-Credentials set to true.

#### Null Origin

The application is considered vulnerable when it sets the Access-Control-Allow-Origin to the null value and enables passing credentials with the Access-Control-Allow-Credentials set to true.

#### Trusted Subdomains

The application is considered vulnerable when it sets the Access-Control-Allow-Origin to any of its subdomains and allows credentials with Access-Control-Allow-Credentials set to true.

Dependent on whether the existing subdomain is vulnerable to XSS vulnerability to enable the attacker to abuse the misconfiguration.

#### Not exploitable (\*)

The application is NOT vulnerable when the Access-Control-Allow-Origin is set to wildcard \* , even if the Access-Control-Allow-Credentials header is set to true.

This is because there is a safety check in place that disables the Allow-Credentials header when the origin is set to a wildcard.

### How to protect

- The server can add appropriate CORS headers to allow cross-origin requests from only trusted sites.

- Implement access control measures such as authentication and authorization.
