
include node_modules/tiny-lr/tinylr.mk

SITE ?= _site
SITE_FILES ?= $(shell find $(SITE) -name '*.html' \! -name '*.js' \! -name '*.css')

JEKYLL_DIR ?= .
JEKYLL_FILES += $(shell find assets -name '*.css' \! -name '*.sass' \! -name '*.scss')
JEKYLL_FILES += $(shell find assets -name '*.js')

# Docker

docker-build:
	docker build -t ubuntu_jekyll .

docker-run:
	echo docker run -p 4000:4000 -d --name jekyll -v $(PWD):/data ubuntu_jekyll

jekyll:
	bundle exec jekyll

$(SITE)/site.watch: $(SITE_FILES)
	@echo >&2 ... Files have changed. Reload ...
	@echo >&2 $?
	@curl -s -X POST http://localhost:35729/changed -d '{ "files": "$?" }'
	@touch $@

serve:
	h5bp serve

build: clean-assets
	h5bp replace _layouts/default.html \
		--prod   \
		--compress \
		--mount assets \
		--output assets \
		> build.html
	@cat build.html
	@echo ... Compiled assets and updated HTML with the content above ...
	@echo ... Copying to original content ...
	@cp build.html _layouts/default.html
	@rm build.html

clean:
	git clean -fdx -e node_modules -e Gemfile.lock -e components -e tiny-lr.pid

clean-assets:
	cd assets && git clean -fdx -e node_modules -e Gemfile.lock -e components -e tiny-lr.pid

clean-dry:
	git clean -fdx -e node_modules -e Gemfile.lock -e components -e tiny-lr.pid --dry-run

clean-s-dry:
	cd assets && git clean -fdx -e node_modules -e Gemfile.lock -e components -e tiny-lr.pid --dry-run

start: livereload serve
stop: livereload-stop

watch: $(SITE)/site.watch

.PHONY: jekyll serve site
