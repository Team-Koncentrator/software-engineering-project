import React from 'react';
import { useDrag } from 'react-dnd';
import { SIDEBAR_ITEM } from 'components/Dnd/constants';

const SideBarItem = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    item: {
      data
    },
    type: SIDEBAR_ITEM,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });

  return (
    <>
      <div className='sideBarItem' ref={drag} style={{ opacity }}>
        {data.component.content.name} | {data.component.content.surname}
        {data.component.content.age} | {data.component.content.gender}
      </div>
    </>
  );
};
export default SideBarItem;
