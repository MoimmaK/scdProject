# Step 1: Build
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve build folder with static server
FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
