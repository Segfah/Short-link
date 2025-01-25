FROM node:23

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto 8080 para el contenedor
EXPOSE 8080

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
