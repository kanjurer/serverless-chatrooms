# Use official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production=false

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight Node.js image for the production build
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV COGNITO_CLIENT_ID=6b7sgk770snkve37ddcieu6d7u
ENV COGNITO_CLIENT_SECRET=ts38rt06vt9fndis6aphdk453ms035t1obtd5kn31lfe5vgq5s6
ENV COGNITO_ISSUER=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_zDdElnbRB
ENV API_GATEWAY_URL=https://kwgmdwinkj.execute-api.us-east-1.amazonaws.com
ENV SOCKET_URL=wss://ip36v9dwrb.execute-api.us-east-1.amazonaws.com
ENV NEXTAUTH_URL=https://54.92.133.131.nip.io
ENV AUTH_URL=54.92.133.131.nip.io/api/auth
ENV NEXTAUTH_SECRET=secret

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install production dependencies
RUN npm install --production=true

# Expose the port on which Next.js will run
EXPOSE 3000

# Define the command to run the Next.js application
CMD ["npm", "start"]
