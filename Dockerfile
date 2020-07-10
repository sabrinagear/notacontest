FROM node
  
EXPOSE 3000

COPY ./ /home/node/app

WORKDIR /home/node/app

RUN ["/usr/local/bin/npm", "install"]

CMD ["/usr/local/bin/npm", "start"]
