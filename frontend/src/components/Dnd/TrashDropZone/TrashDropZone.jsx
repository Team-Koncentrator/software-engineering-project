import React from 'react';
import { useDrop } from 'react-dnd';
import { COMPONENT, ROW, COLUMN } from 'components/Dnd/constants';

const ACCEPTS = [ROW, COLUMN, COMPONENT];

const TrashDropZone = ({ data, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item, monitor) => {
      const layout = data.layout;
      const itemPath = item.path;
      const splitItemPath = itemPath.split('-');
      const itemPathRowIndex = splitItemPath[0];
      const itemRowChildrenLength = layout[itemPathRowIndex] && layout[itemPathRowIndex].children.length;

      // prevent removing a col when row has only one col
      if (item.type === COLUMN && itemRowChildrenLength && itemRowChildrenLength < 2) {
        return false;
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  return (
    <div className={['trashDropZone', isActive ? 'active' : ''].join(' ')} ref={drop}>
      TRASH
    </div>
  );
};
export default TrashDropZone;
