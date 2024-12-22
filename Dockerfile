FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN useradd -m appuser
USER appuser
EXPOSE 3007
CMD ["npm", "run", "dev"]