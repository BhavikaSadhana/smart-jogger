# Use official Nginx image
FROM nginx:latest

# Copy all website files to Nginx web directory
COPY . /usr/share/nginx/html

# Expose default Nginx port
EXPOSE 80
