# Use Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the project (if using TypeScript)
RUN npm run build

# Expose port (default for CVForge seems to be 9000)
EXPOSE 9000

# Start the server
CMD ["npm", "start"]
