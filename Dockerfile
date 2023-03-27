FROM node:16.16.0-alpine3.15 as builder

WORKDIR /usr/src/nuxt-app
COPY package.json .
COPY package-lock.json* .
RUN npm install

FROM node:16.16.0-alpine3.15


WORKDIR /usr/src/nuxt-app
COPY --from=builder /usr/src/nuxt-app /usr/src/nuxt-app
COPY . .

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 3000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]