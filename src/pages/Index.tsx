
import React from 'react';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardStats from '@/components/Dashboard/DashboardStats';
import TodaysSchedule from '@/components/Dashboard/TodaysSchedule';
import DashboardQuickActions from '@/components/Dashboard/DashboardQuickActions';
import RecentActivity from '@/components/Dashboard/RecentActivity';
import ProgressSummary from '@/components/Dashboard/ProgressSummary';

const Index = () => {
  return (
    <div className="space-y-4">
      <DashboardHeader />
      <DashboardStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <TodaysSchedule />
        <DashboardQuickActions />
      </div>

      <RecentActivity />
      <ProgressSummary />
    </div>
  );
};

export default Index;
