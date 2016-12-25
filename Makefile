all:
	browserify -t babelify -o frontend_build/ompe_bundle.js frontend/main.js
	uglifyjs -o frontend_build/ompe_bundle.min.js frontend_build/ompe_bundle.js -m
