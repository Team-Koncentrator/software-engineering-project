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
              id: 'component1'
            }
          ]
        },
        {
          type: COLUMN,
          id: 'pookoj2',
          children: [
            {
              type: COMPONENT,
              id: 'component2'
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
          id: 'pookoj3',
          children: [
            {
              type: COMPONENT,
              id: 'component3'
            },
            {
              type: COMPONENT,
              id: 'component4'
            },
            {
              type: COMPONENT,
              id: 'component5'
            }
          ]
        },
        {
          type: COLUMN,
          id: 'pookoj4',
          children: [
            {
              type: COMPONENT,
              id: 'component6'
            },
            {
              type: COMPONENT,
              id: 'component7'
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
    component4: { id: 'component4', type: 'phone', content: 'Some phone' },
    component5: { id: 'component5', type: 'input', content: 'Nowy uczestnik' },
    component6: { id: 'component6', type: 'input', content: 'Nowy uczestnik' },
    component7: { id: 'component7', type: 'input', content: 'Nowy uczestnik' }
  }
};

export default initialData;
