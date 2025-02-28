# Use the base image from Docker Hub
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Now we are in the app directory

# Copy the package.json and package-lock.json files 
# * means anything thAT START with package name files 

# We are already in /app thats why .
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install nodemon globally inside the container
RUN npm install -g nodemon

# Copy the rest of the application files
COPY . .

# Expose the port of the app that run 
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "dev" ]


