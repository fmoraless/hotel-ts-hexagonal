## Hotel Node TS

Api node - base para proyecto de hotel

## Features

-   CRUD de usuarios
-   CRUD de Reservas

## Installación

#### Requisitos previos:

-   Yarn
-   Node versión 18 o superior
-   Docker

#### Ejecución en local

-   Clonar desde github

```bash
  git clone https://github.com/fmoraless/hotel-ts-hexagonal.git
```

-   Vaya a la carpeta del proyecto

```bash
  cd hotel-ts-hexagonal
```

-   Instalar dependencias

```bash
  yarn install
```

## Ejecutar Localmente

Iniciar contenedor de base de datos

```bash
  docker compose up -d
```

Crear contenedor de la api
```bash
  docker build -t node-api:1.0.0 .
```

Crear red

```bash
  docker network create node-hotel-net
```

Conectar contenedor a la red

```bash
 docker network connect node-hotel-net cont-mysqlserver
```

Iniciar contenedor de la app

```bash
docker run -d --name hotel-node-ts -p 3000:3000 -e DB_HOST=cont-mysqlserver -e DB_PORT=3306 --network node-hotel-net node-api:1.0.0
```

## Screenshots

#### Capturas Postman

Usuarios
![Creación de Usuario](https://drive.google.com/uc?export=view&id=1kVH_TUqEpF367K2soaYbpjAiA-dieBb-)

Reservas
![Crear Reserva](https://drive.google.com/uc?export=view&id=1HZpFwkU2AS8aP9YOx5HhmkATn64x675n)

## Feedback

Si tienes algun Feedback, por favor hazme saber fcomorales.sanchez@gmail.com
