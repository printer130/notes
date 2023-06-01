---
title: "Buffer Overflow"
description: ""
pubDate: "Jul 08 2022"
heroImage: "/xlrf.png"
banner: "my_banner"
slug: 'buffer-overflow/intro'
---

### Finding Buffer Overflows

|*strcpy* | *strcat* | *gets / fgets* |

|*scanf / fscanf* | *vsprintf* | *printf* |

|*memcpy*

This tools can check your code for posibles overflows.

- splint.org
- Cppcheck
- cloud-fuzzing

Almost 50% of vulnerabilities are not exploitable, but they may lead to DOS or cause other side-effects.

**Fuzzing** is a software testing technique that provides invalid data, unexpected or random data as input to a program. Inpu can be in any form such as:

Command line | Parameters | Network data | File input | Databases | Shared memory regions | Keyboard/mouse input | Environment variables.

#### Fuzzing tools and frameworks:

- Peach Fuzzing Platform
- Sulley
- Sfuzz
- FileFuzz
