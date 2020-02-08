echo off
echo "Starting server..."
SET DEBUG=*,-babel*,-send*,-express* 
node index.js
read -p "Press [Enter] key to continue..."