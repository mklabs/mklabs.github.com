files = "_posts/**/* assets/**/*"
changed = "style.css"

jekyll:
	bundle exec jekyll

notify:
	curl http://localhost:35729/changed?files=$changed

tinylr:
	[ -e tiny-lr.pid ] || tiny-lr &

start:
	jekyll-preview

css:
	echo """
	TODO: build css here
	"""

watch: tinylr
	watchd $files -c 'bake css' &

all: watch start

