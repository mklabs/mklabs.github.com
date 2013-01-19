
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

start: livereload serve
stop: livereload-stop

site: start $(SITE)/site.watch

.PHONY: jekyll serve site
