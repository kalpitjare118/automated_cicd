# Install dependencies for both frontend and backend
FROM node:18

# Set working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies
RUN npm install

# Build frontend (if using a bundler like Vite or Webpack)
RUN npm run build

# Expose the server port
EXPOSE 3000

# Start the application (e.g., server entry point)
CMD ["npm", "start"]
