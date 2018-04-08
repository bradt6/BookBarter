FROM ubuntu


#Node
RUN apt-get update && \
	apt-get install -y sudo curl software-properties-common && \
	curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - && \
	apt-get install -y nodejs 

# Define mountable directories.
RUN mkdir /var/www/
RUN mkdir /var/www/angular
RUN mkdir /var/www/angular/bookbarter

#Angular port
EXPOSE 4200

WORKDIR /var/www/angular/bookbarter
#RUN npm install @angular/cli
#ADD . /var/www/angular/
#RUN npm install

ENTRYPOINT ["/var/www/angular/bookbarter/node_modules/@angular/cli/bin/ng","serve","-H","0.0.0.0"]
