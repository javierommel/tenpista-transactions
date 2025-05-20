# Tenpista Transactions App

Aplicación fullstack diseñada para gestionar transacciones de usuarios (tenpistas), desarrollada como parte de un challenge técnico. Esta solución aplica las mejores prácticas en arquitectura, desarrollo, pruebas y despliegue.

## Tecnologías Utilizadas

### Frontend
- React 19
- React Hook Form
- Material UI v7
- Axios
- React Query
- Date-fns

### Backend
- Java 21
- Spring Boot 3.4
- Spring Data JPA
- PostgreSQL
- Spring Security (Rate Limiting)
- Swagger / OpenAPI
- JUnit 5 + Mockito

### DevOps
- Docker
- Docker Compose

---

## Estructura del Proyecto

### Frontend

```
/src
  /assets
  /components
  /features
  /lib
  /theme
```

### Backend

```
/src/main/java/com/rommelchocho/tenpista
  /config
  /controller
  /dto
  /entity
  /exception
  /mapper
  /repository
  /security
  /service

```

---

## Instalación

### Requisitos

- Docker + Docker Compose

### Variables de Entorno

Ver `.env.example` para los valores requeridos en backend y frontend.

---

### DockerHub imagen backend
- La imagen del backend se encuentra en -> https://hub.docker.com/r/javierommel123/tenpista-transactions-api
- Comando para descargar imagen -> docker pull javierommel123/tenpista-transactions-api

## Instrucciones para Despliegue Local

```bash
# 1. Clona el repositorio
git clone https://github.com/javierommel/tenpista-transactions.git
cd tenpista-transactions

# 2. Configura tus variables de entorno en el archivo .env con los valores de tus configuraciones
cp .env.example .env

# 3. Levanta los servicios
docker-compose up --build
```

#Nota. El frontend se levantará en el puerto 80 por lo que deberías revisar que no tengas ningún servidor web levantado

---

## Endpoints

- Frontend: http://localhost:80
- Swagger UI: http://localhost:8081/swagger-ui.html
- PostgreSQL: puerto 5435

---

## Funcionalidades

- Crear, editar y eliminar transacciones
- Validaciones tanto frontend como backend
- Paginación
- Rate Limiting (3 requests/min por IP)
- Manejo global de errores
- Responsive UI
- Interfaz moderna con tema personalizado

---

## Tests

- Cobertura de más del 85% en backend (JaCoCo)
- Pruebas unitarias para servicios, repositorios,controladores y filtros
- MockMvc + Mockito

---

## Autor

Rommel Chocho - Fullstack Developer  

---

## Licencia

MIT
