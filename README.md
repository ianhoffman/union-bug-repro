# What Is This?

This is a minimal repro of a bug in the [babel-plugin-typescript-to-proptypes](https://github.com/milesj/babel-plugin-typescript-to-proptypes) Babel Plugin.

Say we have a union of two interfaces. We should generate code requiring that a value satisfy (at least) one of those two interfaces; however, we generate code requiring that it satisfies both.

## Example

For example, assume we have the following types:

```typescript
import React from 'react';

interface A {
    foo: string;
}

interface B {
    bar: string;
}

type C = A | B;

export const Component = (_props: C) => {
    return <React.Fragment></React.Fragment>;
}
```

Then babel-plugin-typescript-to-proptypes will generate the following (incorrect) code:

```js
var Component = function Component(_props) {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
};

exports.Component = Component;
Component.propTypes = {
  foo: _propTypes["default"].string.isRequired,
  bar: _propTypes["default"].string.isRequired
};
```

(See `src` and `lib` for the entire repro.)

## Expected Behavior

Given the above typescript, babel-plugin-typescript-to-proptypes should generate code which looks something like this:

```js
var Component = function Component(_props) {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
};

exports.Component = Component;
Component.propTypes = _propTypes["default"].oneOfType([
    _propTypes["default"].shape({
        foo: _propTypes["default"].string.isRequired,
    }),
    _propTypes["default"].shape({
        bar: _propTypes["default"].string.isRequired
    }),
]).isRequired;
```