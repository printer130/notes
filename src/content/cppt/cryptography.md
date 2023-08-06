---
title: 'Cryptography'
description: ''
pubDate: 'May 12 2023'
heroImage: '/enumeration.png'
slug: 'cppt/intro'
---

#### Cryptography

- **Authentication:** Claims made by or about the subject are true.

- **Confidentiality:** Information is accessible only to those authorized to have access.

- **Integrity:** Message has not been manipulated/altered in the transfer.

- **Non-repudiation:** Ensuring that a party in a dispute cannot repudiate, or refute the validity of a statement.

### Symmetric-key cryptography

Both th sender and receiver share the same key. They take the plain-text and the key and apply the encryption algorithm to get the cipger text.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1685997187/Screenshot_from_2023-06-05_16-32-47_keqn1p.png">

### Public-key cryptography

A public key, freely distributed, and a corresponding private key which is to be kept secret, the public key is used for encryption, while the private key is used for decryption.

- Public key scheme is asymmetric key.

- Each user has ta pair of crypto keys.

### PKI (Public key Infrastucture)

- The signatures on a certificate are attenstations by the certificate signer that the identify information and the public key are bound together.

- CA signs Bob's Public key certifying that the key actually belong to Bob.

### SSL (Secure Sockets Layer)

- SSL protocol uses PKI and Symmetric encryption to create secure communication channels between two entities.

- SSL also ensures that no third party can tamper or alter the communication without the two entities to be aware of that.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1685998866/Screenshot_from_2023-06-05_17-00-58_pkqmo0.png">

- **Digital signature:** Is a mechanism that allows to authenticate a message. It proves that the message is effectively coming from a given sender.

- Provide proff of identity.
- Provide a seacure channel for transmitting data.

**Authenticity:** Is verified by verifying the validy of the certificate.

**Confidentiality:** Is achieved by handshaking initial channel parameters encrypted with the SSL certificate public key of the web site

**_Content of a Digital certificate_**

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1685998583/Screenshot_from_2023-06-05_16-56-12_pblsv0.png">

**Common extensions:** .DER .PEM .P7C .PFX

```bash
# Campo importante: Common Name FQDN del servidor a su nombre; myblog.com o 127.0.0.1:8081
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem
```

### PGP (Public Good Privacy)

- Your own secret key stored encrypted with a passphrase.

- Your own public key and the public keys of your friends and associates.

- The PGP software puts it into a called your keyrings.

- The keyrings also contains copies of other people's pujblic keys which are trusted by you.

- PGP encryption uses public key cryptography and includes a system which binds the public keys to and email address.

- A web of trust model is used over a PKI model with CA's signing public keys.

- WEB OF TRUST has made PGP widespread beacuse easy, fast and inexpensive to use.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1685999471/Screenshot_from_2023-06-05_17-11-03_pcbzyt.png">

- PGP supports mesage authentication and integrity check.

- We have to put trust in that binding because there's no CA confirming that.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1685999656/Screenshot_from_2023-06-05_17-14-02_edsh7h.png">

- PGP can digitally sign a doc, or actually a digest (SHA 1) version of a doc.

- Its more efficient it only has to sign 160 bits instead of your whole message, for remember that PK crypto is expensive.

- It means that the signarute is a manageable length (160 can easly represented in hex)

PGP will first genereate a symmetric key and then encrypt the symmetric key with the public key, the message is then encrypted with the symmetric key, allows to have many addresses for the same message by encrypting different symmetric keys with the addressses public keys.

PGP puts together the ideas of symmetric key encyprion, public key encryption, and hash functions, and also text comprenssion, in a practical and usable way to enable you to sign or encrypt email.

```bash
gpg --gen-key

# firmar llave
gpg --sign-key email@example.com

# Exportando llave publica
gpg --armor --export testtest@gmail.com > public_key.asc

#Encriptando mensage
gpg --clear-sign --output signed_message.asc msg.txt

gpg --encrypt --sign --armor -r person@email.com name_of_file
```

### (SHELL) Secure Shell

- SSH allows one to tunel any protocol within a secure channel.

- You can do so for isntant messaging protocols, mount remote hard drives and so on.

To create an SSH tunnel, an SSH client is configured to forward a specified local port to a port on the remote machine

Traffic to the local port is forwarded to the remote host. The remote host will then forward this traffic to the intnded target host.

The traffic between SSH client and server will be encrypted.

```bash
# With this command, all the traffic sent to localhost port 3000 will be forwarded to remote host on port 32 through the tunnel.

ssh -L 3000:casapc:23 alice@sshserver.com

```
