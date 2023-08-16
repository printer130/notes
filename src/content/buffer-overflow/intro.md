---
title: 'Buffer Overflow'
description: '|_strcpy_ | _strcat_ | _gets / fgets_ |
|_scanf / fscanf_ | _vsprintf_ | _printf_ |
|_memcpy_'
pubDate: 'Jul 08 2022'
banner: 'my_banner'
slug: 'buffer-overflow/intro'
---

### Finding Buffer Overflows

This tools can check your code for posibles overflows.

- splint.org
- Cppcheck
- cloud-fuzzing

Almost 50% of vulnerabilities are not exploitable, but they may lead to DOS or cause other side-effects.

**Fuzzing** is a software testing technique that provides invalid data, unexpected or random data as input to a program. Input can be in any form such as:

Command line | Parameters | Network data | File input | Databases | Shared memory regions | Keyboard/mouse input | Environment variables.

### Fuzzing tools and frameworks:

- Peach Fuzzing Platform
- Sulley
- Sfuzz
- FileFuzz

### After having the correct offset

Overwrite the eip with the valu so that value will be used be the ret instruction to return to our shellcode.

Shellcode is stored at the memory address pointed by ESP the problem is that the address changes dynamically, so we cannot use it to build the exploit.

Just find a JMP ESP or CALL ESP instruction that is in a fixed location of memory.

One technique is disassemble the .dll and then search for instruction and then load it into immunity debugger and search for CALL ESP or JMP ESP.

```bash
!mona jmp -r esp
!mona jmp -r esp -m kernel

#find eip creating chars
!mona pc 1100

# eip finded
!mona po 30682439

# find jpm or call
!mona jpm -r esp -m kernel

#create payload
payload += bytes*992
payload += JMP ESP kernerlbase.dll
payload += ("\x90\x90\x90\x90\x90\x90\x90shellcode")
```
