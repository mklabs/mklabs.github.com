
all: help

help:
	bake -h

serve:
	jekyll-preview

browserify:
	browserify -e search/search.js -o search/bundle.js

watch:
	watchify search/search.js -p [livereactload] -o search/bundle.js &
	bake serve
