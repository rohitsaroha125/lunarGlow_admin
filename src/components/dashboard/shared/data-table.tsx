'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { PencilSimple, Trash } from '@phosphor-icons/react';

export interface DataTableColumn {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  format?: (value: any, row?: any) => React.ReactNode;
  width?: string | number;
}

export interface DataTablePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export interface DataTableProps {
  title: string;
  columns: DataTableColumn[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onAdd?: () => void;
  addButtonText?: string;
  pagination?: DataTablePagination;
}

export function DataTable({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onAdd,
  addButtonText = 'Add New',
  pagination
}: DataTableProps): React.JSX.Element {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (pagination) {
      pagination.onPageChange(page);
    }
  };

  const handlePageSizeChange = (event: any) => {
    if (pagination) {
      pagination.onPageSizeChange(event.target.value);
    }
  };

  return (
    <Card>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        {onAdd && (
          <Button variant="contained" onClick={onAdd}>
            {addButtonText}
          </Button>
        )}
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ width: column.width }}
                  sx={{ fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell align="center" sx={{ width: 120 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {(data || []).map((row, index) => (
              <TableRow hover key={row._id || row.id || index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {column.format ? column.format(row[column.id], row) : row[column.id]}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      {onEdit && (
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => onEdit(row)}>
                            <PencilSimple size={16} />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error" onClick={() => onDelete(row)}>
                            <Trash size={16} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {pagination && (
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} of{' '}
              {pagination.totalItems} results
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={pagination.pageSize}
                onChange={handlePageSizeChange}
                displayEmpty
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Box>
      )}
    </Card>
  );
} 