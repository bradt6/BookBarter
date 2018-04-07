FROM ubuntu

ENV MYSQL_ROOT_PASSWORD root
EXPOSE 3306

RUN \
  apt-get update && \
  apt-get install -y software-properties-common && \
  apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8 && \
  add-apt-repository 'deb [arch=amd64,i386,ppc64el] http://mariadb.mirror.digitalpacific.com.au/repo/10.2/ubuntu xenial main' && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server

#Python/Flask
RUN apt-get update && \
	apt-get install -y python3 python3-dev python3-pip build-essential libssl-dev libffi-dev

#Supervisor
RUN apt-get install -y supervisor
RUN mkdir /var/log/supervisord
ADD ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ADD ./requirements.txt /tmp/requirements.txt
RUN pip3 install -r /tmp/requirements.txt

RUN mkdir /var/www
RUN mkdir /var/www/flask

ADD ./common.py /var/www/flask
ARG FILE
ADD ./$FILE.sql /tmp/$FILE.sql

RUN \
  sed -i 's/^\(bind-address\s.*\)/# \1/' /etc/mysql/my.cnf && \
  echo "mysqld_safe &" > /tmp/config && \
  echo "mysqladmin --silent --wait=30 ping || exit 1" >> /tmp/config && \
  echo "mysql -e 'GRANT ALL PRIVILEGES ON *.* TO \"root\"@\"%\" WITH GRANT OPTION;'" >> /tmp/config && \
  echo "mysql -e 'GRANT ALL PRIVILEGES on *.* to \"root\"@\"localhost\" IDENTIFIED BY \"root\";'" >> /tmp/config && \
  echo "mysql -uroot -proot -e 'SOURCE /tmp/$FILE.sql'" >> /tmp/config && \
  bash /tmp/config && \
  rm -f /tmp/config && \
  rm -f /tmp/$FILE.sql

ADD ./$FILE.py /var/www/flask/server.py

ENTRYPOINT ["/usr/bin/supervisord","-c","/etc/supervisor/conf.d/supervisord.conf"]
