# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first, for better cache optimization
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 8000

# Run the application
CMD ["npm", "start"]
