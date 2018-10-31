# Define the base image for the docker image
FROM node:8.12.0                                            
# create & set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
RUN npm install -g @angular/cli@7.0.3
RUN npm install --save @angular/material @angular/cdk @angular/animations
RUN npm install --save bootstrap
# Prepare the port to be displayed
EXPOSE 4200
# start app (ng server), then prepare the listening port, and host; and then declare the file watching poll period
CMD ng serve --port 4200 --host 0.0.0.0 --poll 1