FROM node

EXPOSE 8888

WORKDIR /home/node/app

RUN npm install pm2 -g

CMD ["pm2-docker", "start", "--watch", "pm2.config.js"]
