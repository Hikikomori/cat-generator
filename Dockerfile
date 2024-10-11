FROM node:20-alpine
WORKDIR /opt/app
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm i
ADD . .
ENV NODE_ENV=production
RUN npm run build
RUN npm prune --omit=dev
CMD ["npm", "start"]
EXPOSE 3000
