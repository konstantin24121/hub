### Instalation
For project setup we recomend to use [yarn](https://yarnpkg.com/) insted of npm. But it's just a recomendation and you can use npm with this project all the same.
After cloning repository use command
```js
yarn
```
or
```js
npm i
```
for installing packages.

### Cli commands

Более актуальный список консольных команд можно найти в секции *script* в файле package.json. Данные команды так же доступны через `npm run` если
по каким-то причинем пользоватся yarn нету никакого желания. Некоторые скрипты используют пакет better-npm-scripts. К тому-же эти команды используют
.env файл файл окружения из которого берут переменные для бандлера.

* `yarn build` - build an application, generate statistic and page for analysis
* `yarn start` - start dev server with HMR and DevTools
* `yarn start:prod` - start prod server and generate dist files
* `yarn lint` - lint js and styles with eslint and stylelint
* `yarn stylelint` - lint styles by stylelint
* `yarn eslint` - lint js by eslint
* `yarn flow` - static lint js by flowtypes
* `yarn styleguide` - start styleguide server
* `yarn styleguide:build` - build styleguide for production

### ENV variables

Настроить окружение можно при помощи .env файла. Его слепок распространяется системой контроля версий в виде .env.dist файла. Просто создайте дубликат файла без .dist. Следите за тем чтобы файл окружения не попал в систему контроля, так как это нарушит окружение другим разработчикам.
* NODE_ENV - среда разработки. указывает в какой среде происходит запуск или сборка проекта. Может принимать "development" или "production".
* HOST - адрес хоста для сервера
* PORT - порт для сервера
* DEVTOOLS - включить средства разработки. В случае если установлен ReduxDevtools то будет установлена связь с ним. В случае отсутствия оного, будет встроен компонент для отладки.
* LOGLEVEL - уровень логирования. Подробнее в модуле <https://github.com/pimterry/loglevel>
* STYLEGUIDE_PORT - порт на котором запустится Styleguide для dev-режима. В случае если не указан будет использовано значение PORT + 1, либо 3001, если PORT не указан