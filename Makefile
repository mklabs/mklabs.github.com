
include node_modules/tiny-lr/tasks/tiny-lr.mk

SITE ?= _site
SITE_FILES ?= $(shell find $(SITE) -name '*.html' \! -name '*.js' \! -name '*.css')

JEKYLL_DIR ?= .
JEKYLL_FILES = $(shell find _posts -name '*.md')
JEKYLL_FILES += $(shell find stylesheets -name '*.css' \! -name '*.sass' \! -name '*.scss')

jekyll:
	bundle exec jekyll

$(SITE)/site.watch: $(SITE_FILES)
	@echo >&2 ... Files have changed. Reload ...
	@touch $@
	@curl -s -X POST http://localhost:35729/changed -d '{ "files": "$?" }'

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

site: start $(SITE)/site.watch

.PHONY: jekyll serve site
