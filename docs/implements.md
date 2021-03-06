### [Editorconfig](http://editorconfig.org/)

Утилита (на самом деле файл с конфигом) который позволяет разработчикам независимо от редактора или IDE сгладить различия в стиле кода (табуляция, окончания строк и тд.). В данном проекте оговорен следующий стиль

* Табуляция - 2 пробела, распространяется на все файлы
* Окончание строк - LF
* Максимально допустимая длинна строки - 100 символов, включая табуляции.

Некоторые IDE приучены понимать файл настроек из коробки. Но так же научить можно и редактор, плагины есть для всех известных редакторов, список [тут](http://editorconfig.org/#download).


### [ESlint](http://eslint.org/)

Статический линтинг js кода, показывает ошибки в коде, дает советы по стилю написания, основывающийся на пресете airbnb. Соблюдать стиль написания кода это обязательное требование. К списку правил добавлены [react](https://github.com/yannickcr/eslint-plugin-react) (линтинга классов написанных для реакта), [import](https://github.com/benmosher/eslint-plugin-import) (для соблюдения правильной записи подключаемых пакетов), [jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) (для линтинга jsx) и json.

Чтобы пользоватся линтером в редакторе кода необходимо поставить плагины, если редактор не умеет конечно из коробки пользоватся eslint. Плагины есть для всех известных редакторов, список [тут](http://eslint.org/docs/user-guide/integrations#editors).

Так же есть консольная утилита, запустить ее можно командой `yarn eslint`.

### [FlowType](https://flow.org/)

Строгая типизация js кода, показывает ошибки типизации. Использование строгой типизации желательно, как минимум для utils и components.

Чтобы пользоватся строгой типизацией и всеми ее преимуществами в редакторе кода необходимо поставить плагины, если редактор не умеет конечно из коробки пользоватся flowType (нет не умеет). Плагины есть для всех известных редакторов, список [тут](https://flow.org/en/docs/editors/).

Так же есть консольная утилита, запустить ее можно командой `yarn flow`.

### [Stylelint](https://stylelint.io/)

Линтинг pcss/css кода, показывает ошибки в стилях, дает советы по стилю написания, основывающийся на пресете stylelint-config-standard. Соблюдать стиль написания стилей это обязательное требование.

Чтобы пользоватся линтером в редакторе кода необходимо поставить плагины. Плагины вроде есть для многих известных редакторов, списка нету, искать самостоятельно под свой. Могу посоветовать только под Atom [тут](https://atom.io/packages/linter-stylelint).

Так же есть консольная утилита, запустить ее можно командой `yarn stylelint`.

### [TernJs](http://ternjs.net/)

Автокомплит js кода. Очень полузная штука показывающая и документацию, и набор всех аргументов. Минус пока что один и он существенный - не поддержка jsx. Посему внутри jsx классов автокомплит не работает. Но в остальных случайх он прекрасно помогает. Его использование не обязательно, он лишь облегчает разработку.

Чтобы пользоватся им в редакторе кода необходимо поставить плагины. Ничего не могу сказать про иные редакторы, но в Atom работает хорошо. Список редакторов для которых есть плагины по ссылке [тут](http://ternjs.net/).

### [Yarn](https://yarnpkg.com/)

Он просто прекрасен. Чтобы пользоватся просто ставь yarn.
