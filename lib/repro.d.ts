/// <reference types="react" />
interface A {
    foo: string;
}
interface B {
    bar: string;
}
declare type C = A | B;
export declare const Component: (_props: C) => JSX.Element;
export {};
