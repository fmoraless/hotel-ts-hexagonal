FROM node:alpine3.16 AS DEPLOYMENT

# instalar un bash para poder ejecutar comandos
RUN apk add curl bash --no-cache

# Descargar un proceso de descarga binario mediante curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin

# directorio para almacenar archivos de la imagen
WORKDIR /build

# Copiar el package.json
COPY package.json .

# Instalar dependencias
RUN yarn install

# Copiar el resto de archivos
COPY . .

# Construir la aplicación
RUN yarn run build

# Especiificar flag --production
RUN yarn install --production

#interceptar proceso previo
RUN /usr/local/bin/node-prune


#Carpeta Production
FROM node:alpine3.16

# Directorio final con el código
WORKDIR /app

# crear una carpeta node_modules dentro de workdir
COPY --from=DEPLOYMENT /build/node_modules ./node_modules

# copiar el package.json
COPY --from=DEPLOYMENT /build/package.json ./package.json

# Copiar el codigo generao para js
COPY --from=DEPLOYMENT /build/dist ./dist

# Levantar la app desde la imagen
CMD ["yarn", "run", "prod"]


