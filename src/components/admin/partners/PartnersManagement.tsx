
import React, { useState } from 'react';
import { PartnerStats } from './PartnerStats';
import { PartnerFilters } from './PartnerFilters';
import { PartnersTable } from './PartnersTable';
import { CommissionSimulator } from './CommissionSimulator';

export const PartnersManagement = () => {
  const [filters, setFilters] = useState({
    type: 'todos',
    level: 'todos',
    status: 'todos'
  });

  return (
    <div className="space-y-6">
      <PartnerStats />
      <PartnerFilters filters={filters} onFiltersChange={setFilters} />
      <PartnersTable filters={filters} />
      <CommissionSimulator />
    </div>
  );
};
