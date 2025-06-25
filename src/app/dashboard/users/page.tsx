'use client';

import * as React from 'react';
import dayjs from 'dayjs';

import { DataTable, type DataTableColumn } from '@/components/dashboard/shared/data-table';
import { Chip } from '@mui/material';
import { Avatar } from '@mui/material';
import { Alert, CircularProgress, Box, Button } from '@mui/material';
import { apiClient } from '@/lib/api-client';

interface User {
  _id: string;
  email: string;
  name: string;
  authProvider: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

interface PaginatedUsersResponse {
  success: boolean;
  data: User[];
  pagination: PaginationInfo;
}

export default function UsersPage(): React.JSX.Element {
  const [users, setUsers] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pagination, setPagination] = React.useState<any>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);

  const fetchUsers = React.useCallback(async (page: number = 1, limit: number = 50) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<PaginatedUsersResponse>(`/api/admin/users?page=${page}&limit=${limit}`);
  
      setUsers(response.data);
      // @ts-ignore
      setPagination(response.pagination);
      setCurrentPage(page);
      setPageSize(limit);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchUsers(1, 50);
  }, [fetchUsers]);

  const handlePageChange = React.useCallback((newPage: number) => {
    fetchUsers(newPage, pageSize);
  }, [fetchUsers, pageSize]);

  const handlePageSizeChange = React.useCallback((newPageSize: number) => {
    fetchUsers(1, newPageSize);
  }, [fetchUsers]);

  const columns: DataTableColumn[] = React.useMemo(() => [
    {
      id: 'avatar',
      label: 'User',
      width: 200,
      format: (value: any, row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            {row.name ? row.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{row.name || 'Unknown User'}</div>
            <div style={{ fontSize: '0.875rem', color: 'text.secondary' }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: 'authProvider',
      label: 'Auth Provider',
      width: 120,
      format: (value: any) => (
        <Chip
          label={value}
          size="small"
          color={value === 'google' ? 'primary' : 'default'}
          variant="outlined"
        />
      ),
    },
    {
      id: 'providerId',
      label: 'Provider ID',
      width: 150,
      format: (value: any) => (
        <div style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
          {value ? value.substring(0, 8) + '...' : '-'}
        </div>
      ),
    },
    {
      id: 'createdAt',
      label: 'Join Date',
      width: 150,
      format: (value: any) => dayjs(value).format('MMM DD, YYYY'),
    },
    {
      id: 'updatedAt',
      label: 'Last Updated',
      width: 150,
      format: (value: any) => dayjs(value).format('MMM DD, YYYY'),
    },
  ], []);

  const handleEdit = React.useCallback((user: any) => {
    console.log('Edit user:', user);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = React.useCallback((user: any) => {
    console.log('Delete user:', user);
    // TODO: Implement delete functionality
  }, []);

  const handleAdd = React.useCallback(() => {
    console.log('Add new user');
    // TODO: Implement add functionality
  }, []);

  const handleRefresh = React.useCallback(() => {
    fetchUsers(currentPage, pageSize);
  }, [fetchUsers, currentPage, pageSize]);

  console.log('Current users state:', users);
  console.log('Current pagination state:', pagination);
  console.log('Users length:', users?.length);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <DataTable
      title={`Users (${pagination?.totalUsers || 0} total)`}
      columns={columns}
      data={users || []}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      addButtonText="Add User"
      pagination={{
        currentPage: pagination?.currentPage || 1,
        totalPages: pagination?.totalPages || 1,
        totalItems: pagination?.totalUsers || 0,
        pageSize: pagination?.limit || 50,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }}
    />
  );
} 