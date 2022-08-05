FROM node:16

RUN apt-get update -y
ADD . /var/www/
WORKDIR /var/www/
RUN npm install --force -y
RUN npm install -g @angular/cli
CMD ng serve --host=0.0.0.0 --disable-host-check