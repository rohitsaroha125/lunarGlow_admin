'use client';

import * as React from 'react';
import dayjs from 'dayjs';

import { DataTable, type DataTableColumn } from '@/components/dashboard/shared/data-table';
import { Chip } from '@mui/material';

// Mock data for assessments
const assessmentsData = [
  {
    id: 'ASS-001',
    user: 'Sarah Johnson',
    type: 'Skin Type Assessment',
    status: 'completed',
    score: 85,
    completionDate: dayjs().subtract(2, 'days').toDate(),
    duration: '15 min',
  },
  {
    id: 'ASS-002',
    user: 'Michael Chen',
    type: 'Skin Concerns Assessment',
    status: 'in_progress',
    score: null,
    completionDate: null,
    duration: '10 min',
  },
  {
    id: 'ASS-003',
    user: 'Emily Davis',
    type: 'Product Recommendation',
    status: 'completed',
    score: 92,
    completionDate: dayjs().subtract(1, 'day').toDate(),
    duration: '20 min',
  },
  {
    id: 'ASS-004',
    user: 'David Wilson',
    type: 'Skin Type Assessment',
    status: 'abandoned',
    score: null,
    completionDate: null,
    duration: '5 min',
  },
  {
    id: 'ASS-005',
    user: 'Lisa Brown',
    type: 'Skin Concerns Assessment',
    status: 'completed',
    score: 78,
    completionDate: dayjs().subtract(3, 'days').toDate(),
    duration: '18 min',
  },
];

export default function AssessmentsPage(): React.JSX.Element {
  const columns: DataTableColumn[] = React.useMemo(() => [
    {
      id: 'user',
      label: 'User',
      width: 150,
    },
    {
      id: 'type',
      label: 'Assessment Type',
      width: 200,
    },
    {
      id: 'status',
      label: 'Status',
      width: 120,
      format: (value: any) => {
        const statusConfig = {
          completed: { color: 'success', label: 'Completed' },
          in_progress: { color: 'warning', label: 'In Progress' },
          abandoned: { color: 'error', label: 'Abandoned' },
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
      id: 'score',
      label: 'Score',
      width: 100,
      align: 'center',
      format: (value: any) => value ? `${value}%` : '-',
    },
    {
      id: 'duration',
      label: 'Duration',
      width: 100,
      align: 'center',
    },
    {
      id: 'completionDate',
      label: 'Completion Date',
      width: 150,
      format: (value: any) => value ? dayjs(value).format('MMM DD, YYYY') : '-',
    },
  ], []);

  const handleEdit = React.useCallback((assessment: any) => {
    console.log('Edit assessment:', assessment);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = React.useCallback((assessment: any) => {
    console.log('Delete assessment:', assessment);
    // TODO: Implement delete functionality
  }, []);

  const handleAdd = React.useCallback(() => {
    console.log('Add new assessment');
    // TODO: Implement add functionality
  }, []);

  return (
    <DataTable
      title="Assessments"
      columns={columns}
      data={assessmentsData}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      addButtonText="Create Assessment"
    />
  );
} 