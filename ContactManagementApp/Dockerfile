# Use Node.js Alpine as base image
FROM node:18-alpine

# Set working directory / Create app directory
WORKDIR /app

# Copy app dependencies / Copy package files first for better caching
COPY package*.json ./

# Install dependencies / Run npm install
RUN npm install

# Bundle app source code / Copy application code 
COPY . .

# Build the Typescript application
# RUN npm run build (for typescript code)

# Expose app port 
EXPOSE 8000

# Command to run our app / Start the application
CMD ["npm","start"]