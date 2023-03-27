APP_VERSION := latest
DOCKER_TAG := 270498/qwapp:$(APP_VERSION)

build:
	docker build . -t $(DOCKER_TAG)

push:
	docker push $(DOCKER_TAG)

deploy:
	make build
	make push