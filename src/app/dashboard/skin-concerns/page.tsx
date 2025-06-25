'use client';

import * as React from 'react';
import dayjs from 'dayjs';

import { DataTable, type DataTableColumn } from '@/components/dashboard/shared/data-table';
import { Chip } from '@mui/material';
import { Alert, CircularProgress, Box, Button } from '@mui/material';
import { apiClient } from '@/lib/api-client';

interface SkinConcern {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  score_map: string;
  face_map?: string;
}

export default function SkinConcernsPage(): React.JSX.Element {
  const [skinConcerns, setSkinConcerns] = React.useState<SkinConcern[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSkinConcerns = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<any>('api/admin/skin-concerns');
      console.log('Skin Concerns API Response:', response);
      setSkinConcerns(response.data);
    } catch (error) {
      console.error('Error fetching skin concerns:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch skin concerns');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSkinConcerns();
  }, [fetchSkinConcerns]);

  const columns: DataTableColumn[] = React.useMemo(() => [
    {
      id: 'name',
      label: 'Concern Name',
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
      id: 'score_map',
      label: 'Score Map',
      width: 150,
      format: (value: any) => (
        <Chip
          label={value}
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
    {
      id: 'face_map',
      label: 'Face Map',
      width: 150,
      format: (value: any) => (
        value ? (
          <Chip
            label={value}
            size="small"
            variant="outlined"
            color="secondary"
          />
        ) : (
          <span style={{ color: 'text.secondary', fontSize: '0.875rem' }}>-</span>
        )
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

  const handleEdit = React.useCallback((concern: any) => {
    console.log('Edit skin concern:', concern);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = React.useCallback((concern: any) => {
    console.log('Delete skin concern:', concern);
    // TODO: Implement delete functionality
  }, []);

  const handleAdd = React.useCallback(() => {
    console.log('Add new skin concern');
    // TODO: Implement add functionality
  }, []);

  const handleRefresh = React.useCallback(() => {
    fetchSkinConcerns();
  }, [fetchSkinConcerns]);

  console.log('Current skin concerns state:', skinConcerns);
  console.log('Skin concerns length:', skinConcerns?.length);

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
      title={`Skin Concerns (${skinConcerns?.length || 0} total)`}
      columns={columns}
      data={skinConcerns || []}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      addButtonText="Add Skin Concern"
    />
  );
} 