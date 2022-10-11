import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@mui/material';
import DropZone from 'components/Dnd/DropZone/DropZone';
import TrashDropZone from 'components/Dnd/TrashDropZone/TrashDropZone';
import SideBarItem from 'components/Dnd/SideBarItem/SideBarItem';
import Row from 'components/Dnd/Row/Row';
import initialData from 'components/Dnd/initial-data';
import NumericInput from 'react-numeric-input';
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout
} from 'components/Dnd/helpers';

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from 'components/Dnd/constants';
import { nanoid } from 'nanoid';

import './Assign.css';

const Container = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;

  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split('-');
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log('item before', item);
      if (item.data) {
        item = item.data;
      }

      console.log('dropZone', dropZone);
      console.log('item', item);

      const splitDropZonePath = dropZone.path.split('-');
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: nanoid(),
          ...item.component
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent
        });
        setLayout(handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem));
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split('-');
      const pathToItem = splitItemPath.slice(0, -1).join('-');

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(handleMoveWithinParent(layout, splitDropZonePath, splitItemPath));
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem));
        return;
      }

      // 3. Move + Create
      setLayout(handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem));
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    return <Row key={row.id} data={row} handleDrop={handleDrop} components={components} path={currentPath} />;
  };

  const [inputList, setInputList] = useState([]);
  const handleAddNewEntity = (e) => {
    e.preventDefault();
    const { eName, eSurname, eAge, eGender } = e.target.elements;
    if (eName.value.trim() == '' || eSurname.value.trim() == '' || eAge.value.trim() == '' || eGender.value.trim() == '') {
      alert('Wypełnij wszystkie pola!');
    } else {
      const sideBarItem = {
        id: nanoid(),
        type: SIDEBAR_ITEM,
        component: {
          type: 'input',
          content: { name: eName.value, surname: eSurname.value, age: eAge.value, gender: eGender.value }
        }
      };
      setInputList(inputList.concat(<SideBarItem key={sideBarItem.id} data={sideBarItem} value='aaaa' />));
    }
  };

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='body'>
        <div className='sideBar'>
          <form id='add-entity' className='add-entity' onSubmit={handleAddNewEntity}>
            <input type='text' name='eName' placeholder='Wpisz imię' />
            <input type='text' name='eSurname' placeholder='Wpisz nazwisko' />
            <input type='number' min='1' max='99' name='eAge' placeholder='Wpisz wiek' />
            <input type='text' name='eGender' maxLength={1} placeholder='Wpisz plec(m/k)' />
            <Button variant='contained' type='submit' fullWidth>
              Dodaj uczestnika
            </Button>
          </form>
          {inputList}
          {/*Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
            <SideBarItem key={sideBarItem.id} data={sideBarItem} />
          ))*/}
        </div>
        <div className='pageContainer'>
          <div className='page'>
            {layout.map((row, index) => {
              const currentPath = `${index}`;
              return (
                <React.Fragment key={row.id}>
                  <DropZone
                    data={{
                      path: currentPath,
                      childrenCount: layout.length
                    }}
                    onDrop={handleDrop}
                    path={currentPath}
                  />
                  {renderRow(row, currentPath)}
                </React.Fragment>
              );
            })}
            <DropZone
              data={{
                path: `${layout.length}`,
                childrenCount: layout.length
              }}
              onDrop={handleDrop}
              isLast
            />
          </div>

          <TrashDropZone
            data={{
              layout
            }}
            onDrop={handleDropToTrashBin}
          />
        </div>
      </div>
    </DndProvider>
  );
};
export default Container;
