FROM node:18
WORKDIR /app

# Copy only package files and install (force clean bcrypt build)
COPY package*.json ./
RUN npm install --build-from-source bcrypt

# Now copy the rest of the app
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]

