# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy Vue.js files
COPY vue/ /app

# Install dependencies
RUN npm install

# Build Vue.js assets
RUN npm run build

# Expose port 8080 for Vue.js dev server (optional)
EXPOSE 8080

# Start Vue.js dev server (optional)
CMD ["npm", "run", "serve"]
