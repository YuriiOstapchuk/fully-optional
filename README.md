# fully-optional

<div align="center">

[![npm package](https://img.shields.io/npm/v/fully-optional/latest.svg)](https://www.npmjs.com/package/fully-optional)
[![Build Status](https://travis-ci.com/YuriiOstapchuk/fully-optional.svg?branch=master)](https://travis-ci.com/YuriiOstapchuk/fully-optional)
[![Coverage Status](https://img.shields.io/codecov/c/github/YuriiOstapchuk/fully-optional/master.svg)](https://codecov.io/gh/YuriiOstapchuk/fully-optional)
[![dependencies Status](https://david-dm.org/YuriiOstapchuk/fully-optional/status.svg)](https://david-dm.org/YuriiOstapchuk/fully-optional)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

### Handle null and undefined in safe and composable way.

</div>

## Reasoning

When dealing with nullability in Typescript you need to create a union type `T | undefined` and then rely on Typescript control flow analysis to make sure you don't use undefined where you want something else

However this approach has its flaws:

- The code is imperative, you do not immediately see the business logic or data manipulation
- The code can quickly become a mess when you nest if statements or check multiple values for null

```typescript
type Data = {
  data?: {
    date?: string;
  };
};

declare const getData: () => Data | undefined;

declare const parseDate: (date: string) => Date | undefined;
```

Default approach

```typescript
const f = () => {
  const data = getData();

  let date: Date | undefined;

  if (data && data.data) {
    const dateString = data.data.date;

    if (dateString) {
      date = parseDate(dateString);
    }
  }

  date = date || new Date();

  return date.toLocaleDateString();
};
```

Using `fully-optional`

```typescript
import { flow } from 'lodash/fp';
import { bind, withDefaultLazy } from 'fully-optional';

const f = flow(
  getData,
  bind(data => data.data),
  bind(data => data.date),
  bind(parseDate),
  withDefaultLazy(() => new Date()),
  date => date.toLocaleDateString(),
);
```

This library provides an abstraction over manual handling of null values with a concise and composable API

There are, however, other approaches to solve null problem with composability in mind: `Maybe` or `Option` monads.

So why should you use `fully-optional` instead of a Maybe monad?

- When using Maybes you introduce a new wrapper datatype that does not integrate well into an existing javascript ecosystem
- There is no need to introduce a new way to handle null values when we have a good standart solution with union types
- Union types scale better than Maybe monad.

  For example you have a function

  ```typescript
  declare const f: (value: number) => Maybe<T>;
  ```

  When you refactor it's type to

  ```typescript
  declare const f: (value: number) => T;
  ```

  You will break all the callers of this function, but you will not break them by changing the return type from `T | undefined` to `T`

## Install

```bash
npm install fully-optional
```

```bash
yarn add fully-optional
```

## Usage

```typescript
import { bind } from 'fully-optional';

declare const a: string | undefined;

bind(a, parseInt); // inferred type number | undefined
```

#### All functions are also curried data-last to allow composition

```typescript
import { flow } from 'lodash/fp';
import { bind } from 'fully-optional';

type X = {
  a?: {
    b?: string;
  };
};

declare const f: (...args: any[]) => X | undefined;

const r = flow(
  f,
  bind(e => e.a),
  bind(e => e.b),
  bind(parseInt),
); // inferred type number | undefined
```

## API

#### `all`

_Apply a function to an array of values if all of them are not null or undefined_

```ts
declare const arr: [string | undefined, number | undefined];

all(arr, ([s, n]) => parseInt(s) * n); // number | undefined
```

#### `bind`

_Apply a function to a value if it is not null or undefined_

```ts
declare const a: string | undefined;

bind(a, e => e.toUpperCase()); // string | undefined
```

#### `isEmpty`

_Check if value is null or undefined_

```ts
isEmpty(a);
```

#### `isNotEmpty`

_Check if value is not null or undefined_

```ts
isNotEmpty(a);
```

#### `match`

_Give two functions to handle both empty and non empty cases_

```ts
declare const a: string | undefined;

match(a, {
  some: e => e.toUpperCase(),
  none: () => '',
});
```

#### `withDefault`

_Return default value if the argument is null or undefined_

```ts
declare const a: string | undefined;

withDefault(a, '');
```

#### `withDefaultLazy`

_Calculate and return default value if the argument is null or undefined_

```ts
declare const a: string | undefined;
declare const expensiveDefaultValue: () => string;

withDefault(a, expensiveDefaultValue);
```

## Contributing

Pull requests are welcome.  
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
