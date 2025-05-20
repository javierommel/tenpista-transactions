# Etapa de build
FROM node:18-alpine as build

WORKDIR /app

ARG VITE_URL_BACKEND
ENV VITE_URL_BACKEND=$VITE_URL_BACKEND

RUN echo "VITE_URL_BACKEND=$VITE_URL_BACKEND" > .env

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa producción - nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
