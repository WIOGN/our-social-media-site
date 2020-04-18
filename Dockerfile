FROM node:12.16.2
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "npm", "run", "server" ]