'use client';

import * as React from 'react';

import { DataTable, type DataTableColumn } from '@/components/dashboard/shared/data-table';
import { Chip } from '@mui/material';
import { Alert, CircularProgress, Box, Button } from '@mui/material';
import { apiClient } from '@/lib/api-client';

interface SkinType {
  _id: string;
  name: string;
  slug: string;
}

interface SkinConcern {
  _id: string;
  name: string;
  slug: string;
}

interface ProductLine {
  _id: string;
  name: string;
  slug: string;
  skin_type: SkinType;
  skin_concern: SkinConcern;
  sensitivity: SkinType | null;
}

interface ProductIndia {
  _id: string;
  name: string;
  productLine: ProductLine;
  amazonLink: string;
  ratings: number;
  image: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export default function ProductIndiaPage(): React.JSX.Element {
  const [products, setProducts] = React.useState<ProductIndia[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pagination, setPagination] = React.useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);

  const fetchProducts = React.useCallback(async (page: number = 1, limit: number = 50) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<any>(`api/admin/products-india?page=${page}&limit=${limit}`);
      console.log('Product India API Response:', response);
      setProducts(response.data);
      // @ts-ignore
      setPagination(response.pagination);
      setCurrentPage(page);
      setPageSize(limit);
    } catch (error) {
      console.error('Error fetching India products:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch India products');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProducts(1, 50);
  }, [fetchProducts]);

  const handlePageChange = React.useCallback((newPage: number) => {
    fetchProducts(newPage, pageSize);
  }, [fetchProducts, pageSize]);

  const handlePageSizeChange = React.useCallback((newPageSize: number) => {
    fetchProducts(1, newPageSize);
  }, [fetchProducts]);

  const columns: DataTableColumn[] = React.useMemo(() => [
    {
      id: 'name',
      label: 'Product Name',
      width: 300,
      format: (value: any) => (
        <div style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: '1.4' }}>
          {value}
        </div>
      ),
    },
    {
      id: 'image',
      label: 'Image',
      width: 100,
      format: (value: any) => (
        value ? (
          <img
            src={value}
            alt="Product"
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: 8,
              border: '1px solid #e0e0e0'
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              color: '#999',
              border: '1px solid #e0e0e0'
            }}
          >
            No Image
          </div>
        )
      ),
    },
    {
      id: 'productLine',
      label: 'Product Line',
      width: 150,
      format: (value: any) => (
        <div style={{ fontSize: '0.875rem' }}>
          <div style={{ fontWeight: 500 }}>{value.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: 'monospace' }}>
            {value.slug}
          </div>
        </div>
      ),
    },
    {
      id: 'skin_type',
      label: 'Skin Type',
      width: 100,
      format: (value: any, row: any) => (
        row.productLine?.skin_type ? (
          <Chip
            label={row.productLine.skin_type.name}
            size="small"
            variant="outlined"
            color="primary"
          />
        ) : (
          <span style={{ color: 'text.secondary', fontSize: '0.875rem' }}>-</span>
        )
      ),
    },
    {
      id: 'skin_concern',
      label: 'Skin Concern',
      width: 120,
      format: (value: any, row: any) => (
        row.productLine?.skin_concern ? (
          <Chip
            label={row.productLine.skin_concern.name}
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
      id: 'sensitivity',
      label: 'Sensitivity',
      width: 100,
      format: (value: any, row: any) => (
        row.productLine?.sensitivity ? (
          <Chip
            label={row.productLine.sensitivity.name}
            size="small"
            variant="outlined"
            color="warning"
          />
        ) : (
          <span style={{ color: 'text.secondary', fontSize: '0.875rem' }}>None</span>
        )
      ),
    },
    {
      id: 'ratings',
      label: 'Rating',
      width: 80,
      format: (value: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontWeight: 500 }}>{value}</span>
          <span style={{ color: 'text.secondary', fontSize: '0.75rem' }}>/5</span>
        </div>
      ),
    },
    {
      id: 'amazonLink',
      label: 'Amazon Link',
      width: 120,
      format: (value: any) => (
        <Button
          variant="outlined"
          size="small"
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontSize: '0.75rem' }}
        >
          View
        </Button>
      ),
    },
  ], []);

  const handleEdit = React.useCallback((product: any) => {
    console.log('Edit India product:', product);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = React.useCallback((product: any) => {
    console.log('Delete India product:', product);
    // TODO: Implement delete functionality
  }, []);

  const handleAdd = React.useCallback(() => {
    console.log('Add new India product');
    // TODO: Implement add functionality
  }, []);

  const handleRefresh = React.useCallback(() => {
    fetchProducts(currentPage, pageSize);
  }, [fetchProducts, currentPage, pageSize]);

  console.log('Current India products state:', products);
  console.log('Current pagination state:', pagination);
  console.log('India products length:', products?.length);

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
      title={`India Products (${pagination?.totalProducts || products?.length || 0} total)`}
      columns={columns}
      data={products || []}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      addButtonText="Add India Product"
      pagination={{
        currentPage: pagination?.currentPage || 1,
        totalPages: pagination?.totalPages || 1,
        totalItems: pagination?.totalProducts || 0,
        pageSize: pagination?.limit || 50,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }}
    />
  );
} 