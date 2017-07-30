# Match 3 Gem Game

A match 3 gem game written JavaScript (ES6) using [phaser](https://phaser.io/), [webpack](https://webpack.github.io/), and [babel](https://babeljs.io/)

You can use run_containers (requires linux with docker & tmux installed) to start up a dev enviroment with nginx running on 127.0.0.1:8080

Credit for how to move the gems around in a sane way goes to [Emanuele Feronato](http://www.emanueleferonato.com/2016/05/17/match-3-bejeweled-html5-prototype-made-with-phaser/) that i ~~ripped off~~ was inspired by

## TODO
make it work :P

## Refactoring & Improvement TODO/Ideas

* Combine GridElement and Gem classes together or rename them
  * There is some cross over between responsibilities in that the element class stores a static gem position for that element but the gem class is used to actually change the visual position of the gem which makes sense when considering it with the game framework (i.e. gems/sprites are moved and the elements are containers for the gems/sprites) but seems somewhat counter intuitive with no knowlege of the framework (i.e. shouldn't grid elements be moving around the grid not the gems?)


* Use something like [redux](http://redux.js.org/) to help better structure communicating state between classes
