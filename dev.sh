#!/usr/bin/env bash
# Starts the server
echo "Starting server..."
DEBUG=*,-babel*,-send*,-express* 
node index.js
read -p "Press [Enter] key to continue..."