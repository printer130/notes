---
title: 'XPath Injection'
description: 'This is a query language used in XML to search and retrieve specific information from XML documents.'
pubDate: 'Jul 08 2022'
heroImage: '/xpathi.png'
---

### Information

Attack occur when a web site uses user-supplied information to construct an XPath query for XML data. By sending intentionally malformed information into the web site, an attacker can find out how the XML data is structured, or access data that they may not normally have access to.

### How to attack

- `XPath Injection:` Attackers can use malicious code injection in XPath queries to alter the expected behavior of the application. For example, they can add a malicious query that retrieves all user information, including sensitive information such as passwords.

- `XPath brute force:` Attackers can use brute force techniques to guess XPath paths and retrieve sensitive information. This technique is based on trying different XPath paths until they find one that returns confidential information.

- `Server information retrieval:` Attackers can use malicious XPath queries to obtain information about the server, such as the database type, application version, etc. This information can help attackers plan more sophisticated attacks.

- `Manipulation of XPath responses:` Attackers can manipulate the XPath responses of the web application to obtain additional information or alter the behavior of the application. For example, they can modify an XPath response to create a user account without permission.

### Example

```html
<?xml version="1.0" encoding="utf-8"?>
<Employees>
  <Employee ID="1">
    <FirstName>Arnold</FirstName>
    <LastName>Baker</LastName>
    <UserName>ABaker</UserName>
    <Password>SoSecret</Password>
    <Type>Admin</Type>
  </Employee>
  <Employee ID="2">
    <FirstName>Peter</FirstName>
    <LastName>Pan</LastName>
    <UserName>PPan</UserName>
    <Password>NotTelling</Password>
    <Type>User</Type>
  </Employee>
</Employees>
```

```bash
Username: blah' or 1=1 or 'a'='a
Password: blah

FindUserXPath becomes //Employee[UserName/text()='blah' or 1=1 or
        'a'='a' And Password/text()='blah']

Logically this is equivalent to:
        //Employee[(UserName/text()='blah' or 1=1) or
        ('a'='a' And Password/text()='blah')]

```

### How to protect

Your script should filter metacharacters from user input.

### References

[Hack Tricks](https://book.hacktricks.xyz/pentesting-web/xpath-injection)

[https://owasp.org](https://owasp.org/www-community/attacks/XPATH_Injection)
