import React from 'react';
import Breakdown from './Breakdown';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';
const RevenueBreakdown = () => {
  const { revenues } = useBackendDataStore();
  return (
    <div className='mt-10'>
      <h2 className="text-2xl mb-4 text-[#7c7c80]">RevenueBreakdown</h2>

      {revenues?.length > 0 ? (
        <Breakdown />
      ) : (
        <h3 className=" text-center my-6 text-black">No Data</h3>
      )}
    </div>
  );
};

export default RevenueBreakdown;
