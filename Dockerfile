FROM nimmis/ubuntu:14.04

MAINTAINER Nishij Jahagirdar

#Insall Apache 2

RUN apt-get update && \
apt-get install -y apache2  && \ 
rm -rf /var/lib/apt/lists/*

#Add DIST folder contains to html folder for webpage display
ADD dist /var/www/html/ 

ADD ./config/apache2.conf /etc/apache2/

EXPOSE 80
CMD sudo service apache2 restart
