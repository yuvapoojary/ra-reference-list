import React, { useEffect, useState, cloneElement } from 'react';
import { ResourceContextProvider, List, TopToolbar, Button, ExportButton } from 'react-admin';
import { Link, useLocation } from 'react-router-dom';
import { useRecordContext } from 'ra-core';
import get from 'lodash/get';
import qs from 'qs';
import CreateIcon from '@material-ui/icons/Add';

export const ParentRecordContext = React.createContext();

export const DefaultActions = (props) => {
  const record = useParentRecord();
  return (
    <TopToolbar>
      {props.filters && cloneElement(props.filters, { context: 'button' })}
      <Button 
        label="Create"
        component={Link}
        to={{ 
          pathname: props.basePath + '/create',
          search: qs.stringify(record)
        }}
      ><CreateIcon /></Button>
      <ExportButton />
    </TopToolbar>
  );
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
        <List syncWithLocation={false} actions={<DefaultActions basePath={basePath} source={source} />} {...props} resource={reference} basePath={basePath} filter={finalFilter}>
          {children}
        </List>
      </ParentRecordContext.Provider>
    </ResourceContextProvider>
  );

};

export const useParentRecord = () => {
  const value = React.useContext(ParentRecordContext);
  const { state, search } = useLocation();
  const data = qs.parse(search, { ignoreQueryPrefix: true });
  return value || data;
};

export default ReferenceList;