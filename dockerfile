# Use official node image as the base image
FROM node:21-alpine
# Set the working directory to /app
WORKDIR /app

# Copy files
COPY package.json ./

# Set npm config and Install dependencies
RUN npm config set registry https://npm.partdp.ir/
# RUN npm config set registry https://registry.npmjs.org/
RUN npm i -g typescript
RUN npm install --save --legacy-peer-deps

COPY . .

# Expose port 3000 for the application
EXPOSE 3000

RUN chmod +x ./build_start.sh
# Start the application
CMD ./build_start.sh