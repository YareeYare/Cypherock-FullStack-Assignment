declare module 'buffer' {
  global {
    let Buffer: typeof import('buffer').Buffer;
  }
}