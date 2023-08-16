---
title: 'Clonar página'
description: '...'
pubDate: 'May 12 2023'
slug: 'trip/clone'
---

```bash
# 1
wget -mk -nH https://google.com
# 2
metasploit module
# 3
# step1
beef
# step2
curl -H "Content-Type: application/json; charset=UTF-8" -d '{"url": "https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3Fref_%3Dnav_custrec_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0", "mount":"/amazon"}' -X POST "http://127.0.0.0:3000/api/seng/clone_page?token=a024e96b033d1540281b081ee1c9f54631d303c4"
{"success":true,"mount":"/amazon"}  

```