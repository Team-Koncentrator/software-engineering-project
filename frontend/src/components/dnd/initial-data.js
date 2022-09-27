import { COMPONENT, ROW, COLUMN } from './constants';

const initialData = {
  layout: [
    {
      type: ROW,
      id: 'domek1',
      children: [
        {
          type: COLUMN,
          id: 'pookoj1',
          children: [
            {
              type: COMPONENT,
              id: 'component0'
            },
            {
              type: COMPONENT,
              id: 'component0'
            }
          ]
        },
        {
          type: COLUMN,
          id: 'pookoj2',
          children: [
            {
              type: COMPONENT,
              id: 'component0'
            }
          ]
        }
      ]
    },
    {
      type: ROW,
      id: 'domek2',
      children: [
        {
          type: COLUMN,
          id: 'pookoj1',
          children: [
            {
              type: COMPONENT,
              id: 'component0'
            },
            {
              type: COMPONENT,
              id: 'component0'
            },
            {
              type: COMPONENT,
              id: 'component0'
            }
          ]
        },
        {
          type: COLUMN,
          id: 'pookoj2',
          children: [
            {
              type: COMPONENT,
              id: 'component0'
            },
            {
              type: COMPONENT,
              id: 'component0'
            }
          ]
        }
      ]
    }
  ],
  components: {
    component0: { id: 'component0', type: 'input', content: 'Nowy uczestnik' },
    component1: { id: 'component1', type: 'image', content: 'Some image' },
    component2: { id: 'component2', type: 'email', content: 'Some email' },
    component3: { id: 'component3', type: 'name', content: 'Some name' },
    component4: { id: 'component4', type: 'phone', content: 'Some phone' }
  }
};

export default initialData;
