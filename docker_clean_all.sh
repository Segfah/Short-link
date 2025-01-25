#!/bin/bash

echo "Iniciando limpieza completa de Docker..."

# Detener y eliminar todos los contenedores creados con Docker Compose
docker-compose down --volumes --rmi all

# Eliminar todos los contenedores
docker rm -f $(docker ps -aq)

# Eliminar todas las imágenes
docker rmi -f $(docker images -aq)

# Eliminar todos los volúmenes
docker volume rm $(docker volume ls -q)

# Eliminar recursos colgantes (dangling)
docker system prune -af --volumes

echo "Limpieza completa de Docker finalizada."
