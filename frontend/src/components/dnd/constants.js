//import shortid from "shortid";
import { nanoid } from 'nanoid';
export const SIDEBAR_ITEM = 'sidebarItem';
export const ROW = 'row';
export const COLUMN = 'column';
export const COMPONENT = 'component';

export const SIDEBAR_ITEMS = [
  {
    id: nanoid(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'input',
      content: 'Some input'
    }
  },
  {
    id: nanoid(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'name',
      content: 'Some name'
    }
  },
  {
    id: nanoid(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'email',
      content: 'Some email'
    }
  }
];
