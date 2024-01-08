# from base image node
FROM 478110679327.dkr.ecr.ap-south-1.amazonaws.com/nodev18:latest

RUN mkdir -p /app
WORKDIR /app

# copy other files as well
COPY . .

#expose the port
EXPOSE 3000

#run npm commands
RUN npm install

RUN npm run compile

ENV NODE_ENV=development

# command to run when intantiate an image
CMD ["node","./dist/main.js"]
