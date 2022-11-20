import { localStorage } from '@vkontakte/vkjs';
import { nanoid } from 'nanoid';

const USER = 'user';

const create = () => `${Date.now().toString(32)}:${nanoid(26)}`;

export const user = () => {
  let saved = localStorage.getItem(USER);

  if (saved === null || saved.length === 0) {
    saved = create();
    localStorage.setItem(USER, saved);
  }

  return saved;
};
