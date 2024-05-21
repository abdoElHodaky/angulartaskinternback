FROM node:18-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache tzdata  sqlite-dev postgresql-dev mysql-dev protobuf protobuf-dev redis supervisor
RUN rm -rf package-lock.json && yarn add ts-proto @grpc/grpc-js swagger-themes class-transform class-transformer class-validator paytabs_pt2 ioredis
RUN mkdir /var/log/supervisor/
#RUN yarn add common-errors @types/common-errors express-rate-limit
#RUN yarn add @types/express @decorators/server  @decorators/di
#RUN yarn add @types/cors @decorators/express mysql2
RUN yarn install -y
#RUN protoc --plugin=$(npm-root)/.bin/protoc-gen-ts_proto  --ts_proto_out=dist --ts_proto_opt=outputServices=grpc-js --ts_proto_opt=esModuleInterop=true -I=src/ src/**/*.proto
ENV PORT 4000
EXPOSE ${PORT}
CMD ["/usr/bin/supervisord","-c","./supervisord.conf"]

