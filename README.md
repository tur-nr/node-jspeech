# jspeech

![Dependencies Status](https://david-dm.org/tur-nr/node-jspeech.svg)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

[Node.js](https://nodejs.org) module for creating [JSpeech Grammar Formats, _JSGF_](https://www.w3.org/TR/jsgf).

_Note_: `jspeech` is just a api for creating JSGF. The format specification can be read here: [https://www.w3.org/TR/jsgf](https://www.w3.org/TR/jsgf).

## Usage

```javascript
import jspeech from 'jspeech';

const grammar = jspeech('cockney');

grammar.rule('stairs', 'apples and pears');

grammar.stringify(); // #JSGF V1.0 utf-8 en; grammar cockney; <stairs> = apples and pears;
```

### Creating Grammar

To create a speech grammar simply call the factory function from `jspeech` with the name of the grammar and any header options.

```javascript
const grammar = jspeech('name', {
    version: 'V1.0',
    lang: 'en',
    encoding: 'utf-8',
});
```

### Adding Rules

Add rules to the grammar object via the `.rule()` method. A rule must have a name and an valid JSGF rule token(s).

```javascript
grammar.rule('hello', 'hello'); // <name> = hello'
grammar.rule('greeting', '(<hello> | hey | sup)'); // <greeting> = (<hello> | hey | sup);
grammar.rule('greet', '<greeting> buddy'); // <greet> = <greeting> buddy;
```

#### Public Rules

Only public rules are exported to a recogniser. To make a rule public use the `.public` API on the grammar object.

```javascript
grammar.public.rule('friend', 'everyone'); // public <friend> = everyone;
```

#### Sequences

To ensure that a rule keeps a sequence of tokens together use the `.word()` method to wrap the tokens in quotes.

```javascript
grammar.word('nyc', 'New York City'); // <nyc> = "New York City";
```

#### Alternatives, Weights and Groups

Alternatives allow variations of different rules and/or rule tokens. This allows for a more complex grammar format. Use the `.alt()` method to create different rule alternatives.

```javascript
grammar.alt('cities', ['London', 'Sydney', 'Tokyo']); // <cities> = London | Sydney | Tokyo;
grammar.alt('colours', [
    ['red', 0.5],
    ['green', 0.3],
    ['blue', 0.8],
]); // <colours> = /0.5/ red | /0.3/ green | /0.8/ blue;
```

Alternatives can also accept options which allow token groups.

```javascript
grammar.alt('answer', ['yes', 'no', 'maybe'], {
    group: true,    // creates group
    optional: true, // wrap in [] instead of ()
}); // <answer> = [yes | no | maybe];
```

### Generating Format

Once a grammar has been created and all rules are defined. It can be used to generate the JSGF for use with a [SpeechGrammarList](https://developer.mozilla.org/en-US/docs/Web/API/SpeechGrammarList).

```javascript
import window from 'global/window';
import grammar from './grammar';

const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

const list = new SpeechGrammarList();
list.addFromString(grammar.stringify());
```

## API

#### `#jspeech(<name>, [header])`

- `name` _String_ Grammar name.
- `header` _Object_ Grammar header information.

_Returns a grammar object._

### Grammar Object

#### `grammar.rule(<name>, [token, [opts]])`
#### `grammar.public.rule(<name>, [token, [opts]])`

- `name` _String_ Name of token.
- `token` _String|Array_ Token or array of alternative tokens.
- `opts` _Object_ Rule options.

_Returns Void_.

#### `grammar.word(<name>, [word, [opts]])`
#### `grammar.public.word(<name>, [word, [opts]])`

- `name` _String_ Name of word token.
- `word` _String_ Word token.
- `opts` _Object_ Rule options.

_Returns Void_.

#### `grammar.alt(<name>, [alternatives, [opts]])`
#### `grammar.public.alt(<name>, [alternatives, [opts]])`

- `name` _String_ Name of word token.
- `alternatives` _Array_ Array of alternative tokens.
- `opts` _Object_ Rule options.

_Returns Void_.

#### `grammar.tokens()`

_Returns an Array of rule definitions._

#### `grammar.stringify()`

_Returns a String of the generated JSGF._

## License

[MIT](LICENSE)

Copyright (c) 2017 [Christopher Turner](https://github.com/tur-nr)
