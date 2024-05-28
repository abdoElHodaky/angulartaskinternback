FROM node:18-alpine
#WORKDIR /app
COPY . .
RUN apk add --no-cache tzdata  sqlite-dev postgresql-dev mysql-dev protobuf protobuf-dev redis supervisor sudo
RUN rm -rf package-lock.json && yarn add ts-proto @grpc/grpc-js swagger-themes class-transform class-transformer class-validator paytabs_pt2 ioredis express-slow-down rate-limit-redis
  
RUN mkdir /var/log/supervisor/
#RUN yarn add common-errors @types/common-errors express-rate-limit
#RUN yarn add @types/express @decorators/server  @decorators/di
#RUN yarn add @types/cors @decorators/express mysql2
RUN npm install pm2 npm-run-all -g
RUN yarn install -y
ENV NODE_ENV production
ENV ENABLE_OVERCOMMIT_MEMORY true
ENV PORT 4000
EXPOSE ${PORT}
#CMD ["/usr/bin/supervisord","-c","./supervisord.conf"]
CMD ["sh","./tsrun.sh"]

