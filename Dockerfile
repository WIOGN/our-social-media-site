FROM node:12.16.2
COPY . .
RUN npm install
EXPOSE 8000

#go to http://192.168.99.100:8000/ for window without hyper v
CMD ["npm", "run", "server" ]

#for my own record:
#docker build -t myapp .
#docker container run --publish 8000:8000 --detach myapp