import React, { useEffect, useState } from 'react';
import { ResourceContextProvider, List } from 'react-admin';
import { useRecordContext } from 'ra-core';
import get from 'lodash/get';

export const ParentRecordContext = React.createContext();

const DefaultActions = (props) => {

};

export const ReferenceList = ({ children, reference, source, target = '_id', filter = {}, ...props }) => {

  const [finalFilter, setFinalFilter] = useState({});
  const record = useRecordContext();
  const basePath = `/${reference}`;

  useEffect(() => {
    setFinalFilter({
      ...filter,
      [target]: get(record, source)
    });
  }, [record]);

  return (
    <ResourceContextProvider value={reference}>
      <ParentRecordContext.Provider value={record}>
        <List syncWithLocation={false} {...props} resource={reference} basePath={basePath} filter={finalFilter}>
          {children}
        </List>
      </ParentRecordContext.Provider>
    </ResourceContextProvider>
  );

};

export const useParentRecord = () => React.useContext(ParentRecordContext);

export default ReferenceList;