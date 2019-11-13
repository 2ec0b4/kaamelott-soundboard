FROM alpine:3.10 AS builder
WORKDIR /app
COPY . /app
RUN set -xe && \
    apk -U add git curl wget npm && \
    npm install -g bower && \
    bower install --allow-root

FROM httpd:2.4
COPY --from=builder /app /usr/local/apache2/htdocs
