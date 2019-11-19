FROM node

CMD ["pm2-docker", "start", "--watch", "pm2.config.js"]
