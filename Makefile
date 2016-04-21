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

post:
	git commit _posts -am 'Update post'
	git push origin master

new:
	touch _posts/`date +%y-%m-%d-$title.md`
	echo """
	Created  _posts/`date +%y-%m-%d-$title.md`
	"""

watch: tinylr
	watchd $files -c 'bake css' &

all: watch start
