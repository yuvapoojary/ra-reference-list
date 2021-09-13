# ReferenceList

For displaying the related resources in the `Show` component in addition to create, edit and delete records.

## Installation

```sh
npm install ra-reference-list
```

## Usage

```js
import React from 'react';
import { ReferenceList, useParentRecord } from 'ra-reference-list';
import { List, TextField, TabbedShowLayout, Tab, Datagrid, ShowButton, EditButton } from 'react-admin';

const ArticleShow = (props) => (
  <List {...props}>
    <TabbedShowLayout>
      <Tab label="Overview">
        <TextField source="title" />
        <TextField source="content" />
      </Tab>
      <Tab label="comments">
        <ReferenceList reference="comments" source="id" target="article_id">
          <Datagrid>
            <TextField source="text" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceList>
      </Tab>
    </TabbedShowLayout>
  </List>
);
```

## Properties

| Name      | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| reference | string | true     | Resource name to fetch               |
| source    | string | true     | Source name                          |
| target    | string | false    | Target field name, defaults to `_id` |

also accepts all [List](https://marmelab.com/react-admin/List.html#title) component props.

## Note

* You must add a `<Resource>` for the reference resource. You can omit the list prop in this `<Resource>` if you want to hide it in the sidebar menu.


## Hooks
* useParentRecord() 

```js
import React from 'react';
import { Create, SimpleForm, TextField } from 'react-admin';
import { ReferenceList, useParentRecord } from 'ra-reference-list';

const SubResourceCreate = (props) => {
  const record = useParentRecord();
  
  return (
    <Create {...props}>
      <SimpleForm>
        <TextField source="somefield" />
        <TextField disabled source="article_id" defaultValue={record.id} />
      </SimpleForm>
    </Create>
  )
};
```