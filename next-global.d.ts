declare global {
  interface VirtualKeyboard {
    overlaysContent?: boolean | undefined;
  }

  interface Navigator {
    virtualKeyboard?: VirtualKeyboard | undefined;
  }
}

export type {}
