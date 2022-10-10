import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { COLUMN } from 'components/dnd/constants';
import DropZone from 'components/dnd/DropZone/DropZone';
import Component from 'components/dnd/Component/Component';

const style = {};
const Column = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);
  console.table(data);
  const [{ isDragging }, drag] = useDrag({
    item: {
      id: data.id,
      children: data.children,
      path
    },
    type: COLUMN,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return <Component key={component.id} data={component} components={components} path={currentPath} />;
  };

  return (
    <div ref={ref} style={{ ...style, opacity }} className='base draggable column'>
      {data.id}
      {data.children.map((component, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
  );
};
export default Column;
