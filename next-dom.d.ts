export { };

// fix image
declare global {
  interface HTMLElement {
    scheme?: string;
  }
}
declare module 'react' {
  interface HTMLAttributes<T> {
    scheme?: string;
  }
}
