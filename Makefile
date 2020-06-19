init:
	docker build -t ks-base .docker/base

install:
	docker-compose -f docker-compose.builder.yml run --rm install

start:
	docker run -dit --rm --name ks-server -p 8000:80 -v `pwd`:/usr/local/apache2/htdocs/ httpd:2.4

stop:
	docker stop ks-server

build:
	docker-compose -f docker-compose.builder.yml run --rm build
