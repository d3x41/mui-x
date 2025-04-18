import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridLogicOperator } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function QuickFilteringCustomizedGrid() {
  const { data, loading } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns],
  );

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        {...data}
        loading={loading}
        columns={columns}
        initialState={{
          ...data.initialState,
          filter: {
            ...data.initialState?.filter,
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLogicOperator.Or,
            },
          },
        }}
        slotProps={{
          toolbar: {
            quickFilterProps: {
              quickFilterParser: (searchInput) =>
                searchInput
                  .split(',')
                  .map((value) => value.trim())
                  .filter((value) => value !== ''),
            },
          },
        }}
        showToolbar
      />
    </Box>
  );
}
