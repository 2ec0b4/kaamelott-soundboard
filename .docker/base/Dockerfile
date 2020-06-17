FROM alpine:3.10
WORKDIR /app
RUN set -xe && \
    apk -U add bash git curl wget npm && \
    npm install -g bower && \
    npm install -g gulp
