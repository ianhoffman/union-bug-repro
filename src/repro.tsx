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