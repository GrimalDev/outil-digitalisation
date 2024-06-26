# Startup sccript to ensure everything is where its supposed to be

docker pull node:latest
docker pull mongo:latest

if [ ! -d "./database" ]; then
  mkdir database
fi

chmod -R 777 database

docker compose up -d --build
