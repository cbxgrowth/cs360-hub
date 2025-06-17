
import React from 'react';
import { NPSCharts } from './NPSCharts';

interface NPSOverviewTabProps {
  data: any[];
}

export const NPSOverviewTab = ({ data }: NPSOverviewTabProps) => {
  return <NPSCharts data={data} />;
};
