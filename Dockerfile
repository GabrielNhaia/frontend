FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_API_URL=http://localhost:8000/api
ENV VITE_API_URL=${VITE_API_URL}

COPY . .
RUN npm ci
RUN npx quasar build

FROM nginx:alpine

COPY --from=build /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
