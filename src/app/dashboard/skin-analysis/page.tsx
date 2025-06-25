'use client';

import * as React from 'react';
import dayjs from 'dayjs';

import { DataTable, type DataTableColumn } from '@/components/dashboard/shared/data-table';
import { Chip } from '@mui/material';

// Mock data for skin analysis
const skinAnalysisData = [
  {
    id: 'ANAL-001',
    user: 'Sarah Johnson',
    analysisType: 'AI Skin Assessment',
    results: 'Combination skin with mild acne',
    confidenceScore: 92,
    analysisDate: dayjs().subtract(1, 'day').toDate(),
    status: 'completed',
  },
  {
    id: 'ANAL-002',
    user: 'Michael Chen',
    analysisType: 'Pore Analysis',
    results: 'Enlarged pores in T-zone area',
    confidenceScore: 88,
    analysisDate: dayjs().subtract(2, 'days').toDate(),
    status: 'completed',
  },
  {
    id: 'ANAL-003',
    user: 'Emily Davis',
    analysisType: 'Wrinkle Detection',
    results: 'Fine lines around eyes and forehead',
    confidenceScore: 95,
    analysisDate: dayjs().subtract(3, 'days').toDate(),
    status: 'completed',
  },
  {
    id: 'ANAL-004',
    user: 'David Wilson',
    analysisType: 'Pigmentation Analysis',
    results: 'Hyperpigmentation on cheeks',
    confidenceScore: 87,
    analysisDate: dayjs().subtract(4, 'days').toDate(),
    status: 'completed',
  },
  {
    id: 'ANAL-005',
    user: 'Lisa Brown',
    analysisType: 'Moisture Level Test',
    results: 'Dehydrated skin, needs hydration',
    confidenceScore: 91,
    analysisDate: dayjs().subtract(5, 'days').toDate(),
    status: 'completed',
  },
  {
    id: 'ANAL-006',
    user: 'Alex Rodriguez',
    analysisType: 'Sensitivity Assessment',
    results: 'Mild sensitivity detected',
    confidenceScore: 84,
    analysisDate: dayjs().subtract(6, 'days').toDate(),
    status: 'processing',
  },
];

export default function SkinAnalysisPage(): React.JSX.Element {
  const columns: DataTableColumn[] = React.useMemo(() => [
    {
      id: 'user',
      label: 'User',
      width: 150,
    },
    {
      id: 'analysisType',
      label: 'Analysis Type',
      width: 180,
      format: (value: any) => (
        <div style={{ fontWeight: 500 }}>
          {value}
        </div>
      ),
    },
    {
      id: 'results',
      label: 'Results',
      width: 250,
    },
    {
      id: 'confidenceScore',
      label: 'Confidence',
      width: 120,
      align: 'center',
      format: (value: any) => {
        let color: 'success' | 'warning' | 'error' = 'success';
        if (value < 80) color = 'error';
        else if (value < 90) color = 'warning';
        
        return (
          <Chip
            label={`${value}%`}
            size="small"
            color={color}
            variant="filled"
          />
        );
      },
    },
    {
      id: 'status',
      label: 'Status',
      width: 120,
      align: 'center',
      format: (value: any) => {
        const statusConfig = {
          completed: { color: 'success', label: 'Completed' },
          processing: { color: 'warning', label: 'Processing' },
          failed: { color: 'error', label: 'Failed' },
        };
        const config = statusConfig[value as keyof typeof statusConfig] || { color: 'default', label: value };
        return (
          <Chip
            label={config.label}
            size="small"
            color={config.color as any}
            variant="filled"
          />
        );
      },
    },
    {
      id: 'analysisDate',
      label: 'Analysis Date',
      width: 150,
      format: (value: any) => dayjs(value).format('MMM DD, YYYY'),
    },
  ], []);

  const handleEdit = React.useCallback((analysis: any) => {
    console.log('Edit skin analysis:', analysis);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = React.useCallback((analysis: any) => {
    console.log('Delete skin analysis:', analysis);
    // TODO: Implement delete functionality
  }, []);

  const handleAdd = React.useCallback(() => {
    console.log('Add new skin analysis');
    // TODO: Implement add functionality
  }, []);

  return (
    <DataTable
      title="Skin Analysis"
      columns={columns}
      data={skinAnalysisData}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      addButtonText="New Analysis"
    />
  );
} 