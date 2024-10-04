# Use a base image
FROM node:14

# Install Git
RUN apt-get update && apt-get install -y git

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8080

# Start the application
CMD ["node", "app.js"]
