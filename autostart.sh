#! /bin/sh

# How to install on raspberry:
# 1. move this file to /etc/init.d/brewery
# cd /etc/init.d/ 
# sudo chmod 755 brewery
# Add it to autostart: sudo update-rc.d brewery defaults
# Remove it again with: sudo update-rc.d -f brewery remove
# Test it with /etc/init.d/brewery start

### BEGIN INIT INFO
# Provides:          MeinProgramm
# Required-Start:    
# Required-Stop:     
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Starts & Stops My Programm
# Description:       Starts & Stops My Programm
### END INIT INFO
 
case "$1" in
start)
SENSOR_FILE='/sys/bus/w1/devices/28-011452d76baa/w1_slave' exec forever start --sourceDir=/home/pi/Code/brewery -p /home/pi/Code/brewery -o /home/pi/Code/forever.log index.js
;;
stop)
exec forever stop /home/pi/Code/brewery/index.js
;;
*)
echo "Usage: /etc/init.d/brewery {start|stop}"
exit 1
;;
esac
exit 0