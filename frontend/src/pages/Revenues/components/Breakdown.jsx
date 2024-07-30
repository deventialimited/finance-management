import React from 'react';
import { MdOutlineMapsHomeWork } from 'react-icons/md';
import { IoArrowDown } from 'react-icons/io5';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';
import { deleteRevenue } from '../../../libs/deleteApis';
import { getAllRevenues } from '../../../libs/getApis';
const formatDate = (dateString) => {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-GB',
    options,
  );

  // Extracting day, month, and year
  const dateObj = new Date(dateString);
  const day = dateObj.toLocaleString('en-GB', { day: '2-digit' });
  const month = dateObj.toLocaleString('en-GB', { month: 'short' });
  const year = dateObj.toLocaleString('en-GB', { year: 'numeric' });

  // Combining into desired format
  return `${day} ${month}, ${year}`;
};
const getArrow = (change) => {
  return change >= 10 ? '↑' : '↓';
};
const Breakdown = () => {
  const { revenues, updateAllRevenues } = useBackendDataStore();
  const handleDeleteRevenue = async (id) => {
    try {
      const result = await deleteRevenue(id);
      if (result) {
        console.log('Revenue deleted successfully', result);
        const fetchedExpenses = await getAllRevenues();
        console.log(fetchedExpenses);
        updateAllRevenues(fetchedExpenses || []);
      } else {
        console.warn('Deleted expense not found in the expenses array');
      }
    } catch (error) {
      console.error('Error deleting expense', error);
      // Handle error state or feedback to the user
    }
  };
  return (
    <div className=" grid sm:grid-cols-2 gap-5">
      {revenues?.map((revenue, index) => (
        <div key={index} className=" shadow-lg  ">
          <div className="flex justify-between items-center border-b py-4 bg-[#FAFAFA] p-4 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className=" bg-[#f3f3f3] flex flex-col h-full w-10 justify-center items-center px-2 py-3 rounded-md">
                <img src={revenue.icon} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-medium">{revenue.category}</div>
                <div className="text-xl font-bold text-black">
                  ${revenue.amount}
                </div>
              </div>
            </div>
            <div>
              <p className="text-md text-black font-semibold">
                {parseInt(revenue.percentage)}%*{' '}
                <span
                  style={{
                    color: parseInt(revenue.percentage) <= 10 ? 'red' : 'green',
                  }}
                >
                  {' '}
                  {getArrow(parseInt(revenue.percentage))}
                </span>
              </p>
              <div className="text-sm">last month</div>
            </div>
          </div>
          <ul className="flex flex-col max-h-44 overflow-y-auto gap-4 mt-5 p-4 ">
            {revenue.lists
              ?.slice()
              .reverse()
              .map((item) => (
                <li
                  key={item._id}
                  className=" grid grid-cols-5 items-start text-black font-semibold"
                >
                  <div className=" col-span-3">{item.revenueName}</div>
                  <div className=" col-span-2 flex sm:gap-4 lg:gap-8 justify-between items-start">
                    <div>
                      <div>${item.amount}</div>
                      <div className="font-light text-sm">
                        {formatDate(item.revenueDate)}
                      </div>
                    </div>
                    <img
                      onClick={() => handleDeleteRevenue(item._id)}
                      className=" cursor-pointer"
                      src="/images/icon/icon-gray-delete.svg"
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Breakdown;
