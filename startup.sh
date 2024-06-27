# Startup sccript to ensure everything is where its supposed to be

docker pull node:latest
docker pull mongo:latest

if [ ! -d "./database" ]; then
  mkdir database
fi

chmod -R 777 database

docker network create --subnet=172.32.0.0/16 db_network

docker compose up -f /root/app/docker-compose.yml -d --build
