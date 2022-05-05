FROM node:14.16.1-alpine
WORKDIR /app

COPY . .

RUN apk update && \
    npm install && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init

# RUN npm run serve
CMD ["npm","run","serve"]