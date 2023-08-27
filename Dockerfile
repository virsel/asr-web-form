# Use Node.js LTS (Long Term Support) as a base image
FROM node:lts

# Set working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install Quasar CLI globally in the container
RUN npm install -g @quasar/cli

# Copy the rest of the project into the container
COPY . .

# Set the environment variable for host
ENV WS_HOST=localhost

# Expose port 8080
EXPOSE 8080

# Command to run the Quasar app
CMD ["quasar", "dev"]
