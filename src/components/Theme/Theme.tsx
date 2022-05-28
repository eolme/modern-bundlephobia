import type { FC } from 'react';

const script = `body=document.body;typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches?(window.scheme="dark",body.className+="vkui--vkBase--dark",body.setAttribute("scheme","space_gray")):(window.scheme="light",body.className+="vkui--vkBase--light",body.setAttribute("scheme","bright_light"));`;
const key = 'theme';

export const Theme: FC = () => {
  return (
    <script
      key={key}
      nonce={key}
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
};
