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
}

interface ProductLine {
  _id: string;
  name: string;
  slug: string;
  skin_type: SkinType;
  sensitivity: SkinType | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProductLinesPage(): React.JSX.Element {
  const [productLines, setProductLines] = React.useState<ProductLine[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProductLines = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<any>('api/admin/product-lines?page=1&limit=100');
      console.log('Product Lines API Response:', response);
      setProductLines(response.data);
    } catch (error) {
      console.error('Error fetching product lines:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch product lines');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProductLines();
  }, [fetchProductLines]);

  const columns: DataTableColumn[] = React.useMemo(() => [
    {
      id: 'name',
      label: 'Product Name',
      width: 200,
      format: (value: any) => (
        <div style={{ fontWeight: 600, fontSize: '1rem' }}>
          {value}
        </div>
      ),
    },
    {
      id: 'slug',
      label: 'Slug',
      width: 180,
      format: (value: any) => (
        <div style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: 'text.secondary' }}>
          {value}
        </div>
      ),
    },
    {
      id: 'skin_type',
      label: 'Skin Type',
      width: 200,
      format: (value: any) => {
        if (!value) {
          return <span style={{ color: 'text.secondary', fontSize: '0.875rem' }}>-</span>;
        }
        
        // Handle array of skin types
        if (Array.isArray(value)) {
          if (value.length === 0) {
            return <span style={{ color: 'text.secondary', fontSize: '0.875rem' }}>-</span>;
          }
          
          return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {value.map((skinType: any, index: number) => (
                <Chip
                  key={skinType._id || index}
                  label={skinType.name}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))}
            </div>
          );
        }
        
        // Handle single skin type object
        return (
          <Chip
            label={value.name}
            size="small"
            variant="outlined"
            color="primary"
          />
        );
      },
    },
    {
      id: 'skin_concern',
      label: 'Skin Concern',
      width: 150,
      format: (value: any) => (
        value ? (
          <Chip
            label={value.name}
            size="small"
            variant="outlined"
            color="info"
          />
        ) : (
          <span style={{ color: 'text.secondary', fontSize: '0.875rem' }}>-</span>
        )
      ),
    },
    {
      id: 'sensitivity',
      label: 'Sensitivity',
      width: 120,
      format: (value: any) => (
        value ? (
          <Chip
            label={value.name}
            size="small"
            variant="outlined"
            color="secondary"
          />
        ) : (
          <span style={{ color: 'text.secondary', fontSize: '0.875rem' }}>None</span>
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

  const handleEdit = React.useCallback((productLine: any) => {
    console.log('Edit product line:', productLine);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = React.useCallback((productLine: any) => {
    console.log('Delete product line:', productLine);
    // TODO: Implement delete functionality
  }, []);

  const handleAdd = React.useCallback(() => {
    console.log('Add new product line');
    // TODO: Implement add functionality
  }, []);

  const handleRefresh = React.useCallback(() => {
    fetchProductLines();
  }, [fetchProductLines]);

  console.log('Current product lines state:', productLines);
  console.log('Product lines length:', productLines?.length);

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
      title={`Product Lines (${productLines?.length || 0} total)`}
      columns={columns}
      data={productLines || []}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      addButtonText="Add Product Line"
    />
  );
} 