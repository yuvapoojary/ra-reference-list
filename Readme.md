# ReferenceList

For displaying the related resources in the `Show` component.

## Installation

```sh
npm install ra-reference-list
```

## Usage

```js
import React from 'react';
import { ReferenceList, useParentRecord } from 'ra-reference-list';

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
