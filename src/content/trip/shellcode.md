---
title: 'Shellcode'
description: ''
pubDate: 'May 12 2023'
heroImage: '/enumeration.png'
slug: 'shellcode/code'
---

####

The EIP is not the only method for execution of shellcode. Its possible for a shellcode to execute when an SEH frame activates. The SEH frames store the address to jump to when there is an exception, such as division by zero.

Overwriting the return address, the attacker can take control of the execution.

**Run and give control:**

_Local:_ Shellcode is used to exploit local processes in order to get higher privileges on thatr machine.

_Remote:_ Is sent through the network along with an exploit. The exploit will allow the shellcode to be injected into the process and executed.

### Connected by

**Connect back:** Shellcode initiates a connection back to the attacker's machine.

**Bind shell:** Shellcode binds a shell to a certain port on which the attacker can connect.

**Socker reuse:** Shellcode estabblishes a connection to a vulnerable process that does not close before the shellcode is run. The shellcode can then re-use this connection to communicate with the attacker.

**Staged Shellcodes:** Are used when the shellcode size is bigger than the space that an attacker can use for injection.

A small piece of shellcode is executed. This code then fetches a larger piece of shellcode into the process memory and executes it.

### Staged shellcodes sub-divided by

**Egg-hunt:** Is used when a larger shellcode can be injected into the process but, its unknown where in the process this shellcode will be actually injected.

    - A small shellcode (egg-hunter)

    - The actual bigger shellcode (egg).

The egg-hunter shellcode has to do is searching for the bigger shellcode the egg within the process address space.

**Omelet shellcode:** Combined of smaller shellcodes, eggs. They are combined together and executed.

Also work for avoid shellcodes detectors by its small size.

Use SMC (Self-modifying Code) to avoid filters out all non-alphanumeric bytes from the data.
