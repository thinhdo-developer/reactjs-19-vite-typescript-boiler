FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --frozen-lockfile

COPY . ./

ARG VITE_HOST_API_URL
ARG VITE_HOST_API_VERSION
ARG VITE_HOST_API_PREFIX
ENV VITE_HOST_API_URL=$VITE_HOST_API_URL
ENV VITE_HOST_API_VERSION=$VITE_HOST_API_VERSION
ENV VITE_HOST_API_PREFIX=$VITE_HOST_API_PREFIX

RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
