# fully-optional

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
