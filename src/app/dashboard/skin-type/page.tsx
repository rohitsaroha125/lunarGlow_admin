'use client';

import * as React from 'react';
import dayjs from 'dayjs';

import { DataTable, type DataTableColumn } from '@/components/dashboard/shared/data-table';
import { Chip } from '@mui/material';
import { Alert, CircularProgress, Box, Button } from '@mui/material';
import { apiClient } from '@/lib/api-client';

interface SkinType {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalSkinTypes: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

interface SkinTypesResponse {
  success: boolean;
  data: SkinType[];
  pagination: PaginationInfo;
}

export default function SkinTypePage(): React.JSX.Element {
  const [skinTypes, setSkinTypes] = React.useState<SkinType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pagination, setPagination] = React.useState<PaginationInfo | null>(null);

  const fetchSkinTypes = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<any>('/api/admin/skin-types');
      console.log('Skin Types API Response:', response);
      setSkinTypes(response.data);
      // @ts-ignore
      setPagination(response.pagination);
    } catch (err) {
      console.error('Error fetching skin types:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch skin types');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSkinTypes();
  }, [fetchSkinTypes]);

  const columns: DataTableColumn[] = React.useMemo(() => [
    {
      id: 'name',
      label: 'Skin Type',
      width: 150,
      format: (value: any) => (
        <div style={{ fontWeight: 600, fontSize: '1rem' }}>
          {value}
        </div>
      ),
    },
    {
      id: 'slug',
      label: 'Slug',
      width: 150,
      format: (value: any) => (
        <div style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: 'text.secondary' }}>
          {value}
        </div>
      ),
    },
    {
      id: 'createdAt',
      label: 'Created Date',
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

  const handleEdit = React.useCallback((skinType: any) => {
    console.log('Edit skin type:', skinType);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = React.useCallback((skinType: any) => {
    console.log('Delete skin type:', skinType);
    // TODO: Implement delete functionality
  }, []);

  const handleAdd = React.useCallback(() => {
    console.log('Add new skin type');
    // TODO: Implement add functionality
  }, []);

  const handleRefresh = React.useCallback(() => {
    fetchSkinTypes();
  }, [fetchSkinTypes]);

  console.log('Current skin types state:', skinTypes);
  console.log('Current pagination state:', pagination);
  console.log('Skin types length:', skinTypes?.length);

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
      title={`Skin Types (${pagination?.totalSkinTypes || skinTypes?.length || 0} total)`}
      columns={columns}
      data={skinTypes || []}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      addButtonText="Add Skin Type"
    />
  );
} 