# Startup sccript to ensure everything is where its supposed to be

docker pull node:latest
docker pull mongo:latest

if [ ! -d "./database" ]; then
  mkdir database
fi

docker compose up -d --build
