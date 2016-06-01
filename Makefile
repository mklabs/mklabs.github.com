
all: help

help:
	bake -h

serve:
	jekyll-preview

watch:
	watchify gh-opns/search.js -p [livereactload] -o gh-opns/bundle.js &
	bake serve
