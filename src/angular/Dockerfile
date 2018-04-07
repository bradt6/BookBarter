FROM ubuntu


#Node
RUN apt-get update && \
	apt-get install -y sudo curl software-properties-common && \
	curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - && \
	apt-get install -y nodejs 

# Define mountable directories.
VOLUME ["/var/www"]

#Angular port
EXPOSE 4200 

RUN mkdir /var/www/angular

ADD bookbarter /var/www/angular
WORKDIR /var/www/angular/bookbarter
RUN npm install
RUN npm install @angular/cli

ENTRYPOINT ["/var/www/angular/node_modules/@angular/cli/bin/ng","serve","-H","0.0.0.0"]
