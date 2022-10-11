import { COMPONENT, ROW, COLUMN } from './constants';
/*
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

export default initialData;*/
const initialData = {
  layout: [
    {
      type: ROW,
      id: 'row0',
      name: 'domek1',
      children: [
        {
          type: COLUMN,
          name: 'pokoj1',
          id: 'column0',
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
          name: 'pokoj2',
          id: 'column1',
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
      id: 'row1',
      name: 'domek2',
      children: [
        {
          type: COLUMN,
          name: 'pokoj1',
          id: 'column2',
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
              id: 'component2'
            }
          ]
        }
      ]
    }
  ],
  components: {
    component0: { id: 'component0', type: 'input', content: { name: 'Agnieszka', surname: 'Łuczak', age: 18, gender: 'k' } },
    component1: { id: 'component1', type: 'input', content: { name: 'Andrzej', surname: 'Byk', age: 17, gender: 'm' } },
    component2: { id: 'component2', type: 'input', content: { name: 'Kaja', surname: 'Kucz', age: 17, gender: 'k' } },
    component3: { id: 'component3', type: 'input', content: { name: 'Bartek', surname: 'Rok', age: 15, gender: 'm' } },
    component4: { id: 'component4', type: 'input', content: { name: 'Natalia', surname: 'Beczka', age: 16, gender: 'k' } }
  }
};

export default initialData;
