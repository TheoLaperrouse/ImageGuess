FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN yarn && yarn build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .

RUN apt-get update && apt-get install -y certbot python3-certbot-nginx

EXPOSE 80
EXPOSE 443

CMD ["bash", "-c", "certbot --nginx --non-interactive --agree-tos --domains celebrity.guess-thorigne-tt.net --register-unsafely-without-email && nginx -g 'daemon off;'"]
