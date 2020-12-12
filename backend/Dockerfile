FROM node:15.2.1-alpine3.10

WORKDIR /backend

# Copying only package.json, so that it takes less time to build the image; Reason: Intermediate containers will be of smaller size
COPY package.json package-lock.json /backend/
RUN npm install

COPY . /backend

EXPOSE 4000

CMD ["npm", "start"]