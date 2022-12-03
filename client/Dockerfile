FROM node:hydrogen-alpine3.16

WORKDIR /shop_finder/client

COPY package.json .

# bash script to install only production dependencies
ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development"  ]; \
    then npm install;\
    else npm install --production &&\
    npm install -g serve;\
    fi

COPY . .
# create a build folder
# RUN npm run build
# RUN - command executed during image creation
# CMD - command executed during container creation
# CMD [ "npm" ,"start" ]