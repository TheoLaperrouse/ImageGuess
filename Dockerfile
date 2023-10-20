FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN yarn && yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .


EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]