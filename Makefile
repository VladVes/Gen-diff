install:
	npm install

start:
	npm run babel-node -- 'src/bin/gendiff.js'

test:
	npm test

jwatch:
	jest --watch

build:
	npm run build

publish:
	npm publish

lint:
	npm run eslint ./src/**

fixlint:
	npm run eslint --fix ./src/**
