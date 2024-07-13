import React from 'react';
import GaugeChart from 'react-gauge-chart';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Statistics from './Statistics';

const TopThreeCards = ({ bills }) => {
  const getMonth = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short' };
    const month = date.toLocaleDateString('en-GB', options);
    return month;
  };
  const getDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short' };
    const month = date.toLocaleDateString('en-GB', options);
    const day = date.getDate();
    return day;
  };
  const getlastCharge = (dateString) => {
    const providedDate = new Date(dateString);
    const currentDate = new Date();

    const day = providedDate.getDate();
    const monthOptions = { month: 'short' };
    const month = currentDate.toLocaleDateString('en-GB', monthOptions);
    const year = currentDate.getFullYear();

    return `${day} ${month}, ${year}`;
  };
  const cards = [
    {
      title: 'Total Balance',
      value: '$240,399',
      subTitle: 'All Accounts',
      accounts: [
        {
          type: 'Credit Card',
          number: '**** **** **** 2598',
          balance: '$25000',
          icon: '/images/brand/mastercard.png',
        },
        {
          type: 'MasterCard',
          number: '**** **** **** 1234',
          balance: '$50000',
          icon: '/images/brand/mastercard.png',
        },
        {
          type: 'Visa Card',
          number: '**** **** **** 5678',
          balance: '$150000',
          icon: '/images/brand/mastercard.png',
        },
      ],
    },
    {
      title: 'Goals',
      value: '$20,000',
      subTitle: 'May, 2023',
      targetAchieved: '$12,500',
      thisMonthTarget: '$20,000',
      progress: '12K',
      icon: 'path/to/progress/icon.svg',
    },
    {
      title: 'Upcoming Bill',
      bills: bills,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
      {/* Upcoming Bill Card */}
      <div className="bg-white md:col-span-1 flex flex-col justify-between gap-3 p-2 rounded-2xl shadow">
        <h3 className="text-xl font-medium text-[#939393]">{cards[2].title}</h3>
        {cards[2]?.bills?.length > 0 ? (
          <div className="pl-1 text-[#636363] overflow-y-auto h-40 sm:h-72 xl:h-80 flex flex-col gap-4">
            {cards[2].bills?.map((bill, idx) => (
              <div key={idx} className="flex items-center gap-1 md:gap-3">
                <div className="bg-[#f3f3f3] flex flex-col w-12 items-center px-2 py-3 rounded-md">
                  <p>{getMonth(bill.dueDate)}</p>
                  <p className="text-black font-extrabold">
                    {getDate(bill.dueDate)}
                  </p>
                </div>
                <div className="flex-1">
                  <p>{bill.billName}</p>
                  <p className="font-extrabold">{bill.billType}</p>
                  <p className="text-gray-500 text-sm">
                    Last Charge: {getlastCharge(bill.dueDate)}
                  </p>
                </div>
                <div className="bg-white border-[#f1f0f0] border rounded-md shadow p-2 px-2.5">
                  <p className="text-lg font-bold">${bill.amount}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className=" text-center mb-16 text-black">No Bills</h3>
        )}
      </div>
      <div className=" md:col-span-2">
        <Statistics />
      </div>
    </div>
  );
};

export default TopThreeCards;
