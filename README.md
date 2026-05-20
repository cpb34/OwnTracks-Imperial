# OwnTracks-Imperial
OwnTracks, but with imperial units!

## Overview
This repository contains patches for OwnTracks's Docker Compose setup. Imperial units have been added with the ability to toggle to and from metric. A small, internal Python server writes the units status to disk. On load, the frontend references the active units; new devices do not need reconfigured. All units referenced across the map and elsewhere are scaled accordingly if set to imperial. The date range is set on load to 1 day instead of 1 month to keep the interface snappy. Additional miscellaneous quality-of-life improvements have been made to make the experience more intuitive across the board.

For additional documentation, please visit the OwnTracks GitHub

Recorder: https://github.com/owntracks/recorder
Frontend: https://github.com/owntracks/frontend
Android: https://github.com/owntracks/android
iOS: https://github.com/owntracks/ios

## Installation Guide
### Fresh Install
1. Modify `.env` to use available ports for the frontend and backend. The defaults are `8083` and `8084` respectively.
2. Spin up the container with `docker compose up -d`
3. Continue the setup flow for your OwnTracks mobile application

### In-Place Upgrade
1. Stop the container and all volumes with command `docker compose down -v`
2. Create a backup of your original container
3. From the original container, copy the `recorder` directory into the new container directory 
4. Modify `.env` and `docker-compose.yml` to suit your previous configuration, especially if using MQTT
5. Spin up the container with `docker compose up -d`
6. Continue using OwnTracks, but with imperial units!
