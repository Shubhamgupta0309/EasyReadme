/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'react' {
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  interface ReactPortal extends ReactElement {
    children: ReactNode;
  }

  type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
}

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode
    }
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }

    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
