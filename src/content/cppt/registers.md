---
title: 'Registers'
description: ''
pubDate: 'May 12 2023'
heroImage: '/enumeration.png'
slug: 'cppt/registers'
---

## Registers

The following table sumarizes the eight general purpose registers. Notice that the naming convention refers to the x86 architecture. We will see how the names differ for 64-bit, 32-bit, 16-bit and 8-bit.

<img src='https://res.cloudinary.com/djc1umong/image/upload/v1685479255/Screenshot_from_2023-05-30_16-39-17_ycwy5t.png' width='968px' >

- The naming convention of the 8-bit CPU had 16-bit register divided into two parts:

A low byte, identified by an L at the end of the name, and a high byte, identified by an H at the end of the name.

- The 16-bit combines the L and the H, and replaces it with an X. While for Stack Pointer, Base Pointer, Source and Destination registers it simply removes the L.

- 32-bit, the register acronym is prefixed with an E, meaning extended. Wheareas, in the 64-bit representation, the E is replaced with the R.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1685479870/Screenshot_from_2023-05-30_16-50-59_mxlfck.png" width='968px' />

The **(EIP)** controls the program execution by storing a pointer to the address of the next instruction (machine code) that will be executed.
**_Tells the CPU where the next instruction is._**

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1685480052/Screenshot_from_2023-05-30_16-54-02_hvlglu.png" width='968px' />

**TEXT:** Instruction segment, is fixed by the program and contains the program code. This region is marked as read-only since the program should not change during execution.

**DATA:** Is divided into initialized data and uninitialized data. Initialized data includes items such as static and global declared variables that are pre-defined and can be modified.

**BSS:** The uninitialized data, named Block Started by Symbol, also initializes variables that are initialized to zero or do not have explicit initialization (ex. _static int t_)

### Heap

The program can request more space in memory via _brk_ and _sbrk_ system call, used by _malloc_, _realloc_ and _free_. Hence, the size of the data region can be extended.

### Stack

This is the most important structure we will deal with.

- The Stack is a Last in First out **(LIFO)** block memory. It is located in the higher part of the memory.

- The **ESP** register (Stack Pointer) is to identify the top of the stack, and it is modified each time a value is pushed in **(PUSH)** or popped out **(POP)**.

### Push instruction

A push instruction subtracts 4 or 8 bit (in 32-bit or in 64-bit) from the **ESP** and writes the data to the memory address in the **ESP**, and then updates the **ESP** to the top of the stack. Remember that the Stack grows backward.
Therefore the **PUSH** subtracts 4 or 8, inorder to point to a lower memory location on the stack. If we do not subtract it, the **PUSH** operation will overrite the current location pointed by **ESP** (the top) and we would lose data.

### Endianness

- In the big-endian representation, the least significant byte(**LSB**) is stored at the highest memory address. While the most significant byte(**MSB**) is at the lowest memory address.

- In the little-endian the **LSB** is stored at the lower memory address, while the most significant byte is at the highest memory address.

```bash

# Address=77267D3B
OK -> \x3B\x7D\x26\x77
BAD -> \x77\x26\x7D\x3B
```

## Security implementations.

### Address Space layout Randomization **(ASLR)**.

_The OS loads the same executable at different locations in memory every time._

_Its important to note that **ASLR** is not enabled for all modules._

_This means that, even if a process has **ASLR** enabled, there could be a DLL in the address space without this protection which could make the process vulnerable to the **ASLR** bypass attack_

### Data Execution Prevention **(DEP)**.

_Prevents the execution of code that are not explicitly marked as executable. The injected into the memory cannot be run from that region._

### Enhanced mitigation Experience Toolkit. (EMET)

_It provides users with the ability to deploy security mitigation technologies to all applications._

### Stack Cookies (Canary).

_Places a value next to the return address on the stack._

_The function prologue loads a value into this location, while the epilogue makes sure that the value is intact. As a result, when the epilogue runs, it checks that the value is still there and that it is correct._
