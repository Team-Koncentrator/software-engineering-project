import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT } from 'components/Dnd/constants';

const style = {
  border: '1px dashed black',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move'
};
const Component = ({ data, components, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { id: data.id, path },
    type: COMPONENT,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];

  const content = component.content;
  return (
    <div ref={ref} style={{ ...style, opacity }} className='component draggable'>
      <div style={{ display: 'none' }}>{data.id}</div>
      <div type='text'>{content.name}</div>
      <div type='text'>{content.surname}</div>
      <div type='text'>{content.age}</div>
      <div type='text'>{content.gender}</div>
    </div>
  );
};
export default Component;
