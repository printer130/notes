---
title: 'Wireshark'
description: ''
pubDate: 'May 12 2023'
heroImage: '/enumeration.png'
slug: 'network/wireshark'
---

## ARP Poisoning

Configure the Kali instance to forward IP packets:

echo 1 > /proc/sys/net/ipv4/ip_forward

arpspoof -i eth0 -t host -r objetivo

# listening eth0 using wireshark

# filter by telnet

# follow TCP stream eth1

## Wifi Analisis

What is the name of the Open (No Security) SSID present in the packet dump?

```bash
# 48 means RSN Information IE.
# WPA Version 1
(wlan.fc.type_subtype == 0x0008) && (!(wlan.wfa.ie.wpa.version == 1)) && !(wlan.tag.number == 48)
```

The SSID 'Home_Network' is operating on which channel?

```bash
# 48 means RSN Information IE.
# WPA Version 1
wlan contains Home_Network
#DS Parameter set: Current Channel: 6
```

Which security mechanism is configured for SSID 'LazyArtists'? Your options are:
OPEN, WPA-PSK, WPA2-PSK.

```bash
wlan contains LazyArtists
# tagged parameters
# RSN Information AES, PSK, ...
```

Is WiFi Protected Setup (WPS) enabled on SSID 'Amazon Wood'? State

```bash
Filter: (wlan.ssid contains "Amazon") && (wlan.fc.type_subtype == 0x0008)
```

What is the total count of packets which were either transmitted or received by the
device with MAC e8:de:27:16:87:18?

```bash
Filter: (wlan.ta == e8:de:27:16:87:18) || (wlan.ra == e8:de:27:16:87:18)
```

What is the MAC address of the station which exchanged data packets with SSID
'SecurityTube_Open'?

```bash
Filter: ((wlan.bssid == e8:de:27:16:87:18) ) && (wlan.fc.type_subtype == 0x0020)
# source address: ...

```

From the last question, we know that a station was connected to SSID
'SecurityTube_Open'. Provide TSF timestamp of the association response sent from the
access point to this station

```bash
Filter: (((wlan.bssid == e8:de:27:16:87:18)) && (wlan.addr==5c:51:88:31:a0:3b)) &&
(wlan.fc.type_subtype == 0x0001)
# Radio information
```

## tshark

What command can be used to show only WiFi traffic?

```bash
tshark -r WiFi_traffic.pcap -Y "wlan"
```

Comando para ver paquetes de deauthentication

```bash
tshark -r WiFi_traffic.pcap -Y "wlan.fc.type_subtype==0x000c"
```

What command can be used to only display WPA handshake packets?

```bash
tshark -r WiFi_traffic.pcap -Y "eapol"
```

What command can be used to only print the SSID and BSSID values for all beacon
frames?

```bash
tshark -r WiFi_traffic.pcap -Y "wlan.fc.type_subtype==8" -Tfields -e wlan.ssid -e wlan.bssid
```

What is BSSID of SSID “LazyArtists”?

```bash
tshark -r WiFi_traffic.pcap -Y "wlan.ssid==LazyArtists" -Tfields -e wlan.bssid
```

SSID "Home_Network" is operating on which channel?

```bash
tshark -r WiFi_traffic.pcap -Y "wlan.ssid==Home_Network" -Tfields -e
wlan_radio.channel
```

Which two devices received the deauth messages? State the MAC addresses of both.

```bash
tshark -r WiFi_traffic.pcap -Y "wlan.fc.type_subtype==0x000c" -Tfields -e wlan.ra

```

Which device does MAC 5c:51:88:31:a0:3b belongs to? Mention manufacturer and
model number of the device.

```bash
tshark -r WiFi_traffic.pcap -Y "wlan.ta==5c:51:88:31:a0:3b && http" -Tfields -e
http.user_agent
```
