build:
	npm run build

dev-server:
	npm run dev-server

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint . --fix
