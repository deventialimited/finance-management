import React from 'react';
import GaugeChart from 'react-gauge-chart';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-8">
      {/* Total Balance Card */}
      <div className="bg-white flex flex-col gap-3 py-5 p-3 rounded-2xl shadow">
        <h3 className="text-xl font-medium text-[#939393]">{cards[0].title}</h3>
        <div className="flex justify-between pl-2 items-center">
          <h3 className="text-xl font-extrabold text-black">
            {cards[0].value}
          </h3>
          <p className="text-gray-500 text-sm text-[#636363]">
            {cards[0].subTitle}
          </p>
        </div>
        <Slider {...settings}>
          {cards[0].accounts.map((account, index) => (
            <div key={index} className="pl-2">
              <div className="flex items-center bg-[#71299d] text-white p-4 rounded-md">
                <div className="flex-grow">
                  <p className="text-sm text-[#ecebeb]">Account Type</p>
                  <p className="text-lg font-extrabold">{account.type}</p>
                  <p className="text-sm text-[#ecebeb]">{account.number}</p>
                </div>
                <div className="flex flex-col items-end">
                  <img
                    src={account.icon}
                    alt="Credit Card"
                    className="h-8 w-max"
                  />
                  <div className="flex flex-wrap ml-4 items-center gap-2">
                    <p className="text-lg font-bold ">{account.balance}</p>
                    <img src="/images/icon/icon-titled-arrow.svg" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Goals Card */}
      <div className="bg-white flex flex-col gap-3 justify-between py-5 p-3 rounded-2xl shadow">
        <h3 className="text-xl font-medium text-[#939393]">{cards[1].title}</h3>
        <div className="flex justify-between pl-2 items-center">
          <div className="flex gap-1 items-center">
            <h3 className="text-xl font-extrabold text-black">
              {cards[1].value}
            </h3>
            <span className="bg-[#d3d3d3] p-1 rounded-md">
              <img src="/images/icon/icon-black-edit.svg" />
            </span>
          </div>
          <p className="text-gray-500 text-sm text-[#636363]">
            {cards[1].subTitle}
          </p>
        </div>
        <div className="pl-2 flex flex-col lg:justify-between lg:flex-wrap lg:flex-row gap-2">
          <div className="flex sm:min-w-max sm:flex-col gap-3">
            <div className="">
              <div className="flex items-center gap-2">
                <img src="/images/icon/icon-gray-award.svg" />
                <p className="text-[#636363] text-sm">Target Achieved</p>
              </div>
              <p className="text-md ml-4 text-black font-extrabold">
                {cards[1].targetAchieved}
              </p>
            </div>
            <div className="">
              <div className="flex items-center gap-2">
                <img src="/images/icon/icon-gray-target.svg" />
                <p className="text-[#636363] text-sm">This month Target</p>
              </div>
              <p className="text-md ml-4 text-black font-extrabold">
                {cards[1].thisMonthTarget}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-black">
            <GaugeChart
              id="gauge-chart1"
              percent={0.8}
              nrOfLevels={1}
              colors={['#71299d']}
              needleColor="#71299d"
              hideText={true}
              style={{
                width: '120px',
              }}
              className="w-[120px]"
            />
            <div className=" -mt-2 gap-3 flex justify-between items-center">
              <p className="text-center text-[10px] text-[#939393] font-bold">
                $0k
              </p>
              <p className="text-center text-md font-bold">
                {cards[1].progress}
              </p>
              <p className="text-center text-[10px] text-[#939393] font-bold">
                ${cards[1].progress}
              </p>
            </div>
            <p className="text-center text-xs text-black font-semibold">
              Target vs Achievement
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Bill Card */}
      <div className="bg-white flex flex-col justify-between gap-3 py-5 p-3 rounded-2xl shadow">
        <h3 className="text-xl font-medium text-[#939393]">{cards[2].title}</h3>
        <div className="pl-2 text-[#636363] overflow-y-auto h-40 sm:h-56 xl:h-40 flex flex-col gap-4">
          {cards[2].bills?.map((bill, idx) => (
            <div key={idx} className="flex items-center gap-1 md:gap-3">
              <div className="bg-[#f3f3f3] flex flex-col w-12 items-center px-2 py-3 rounded-md">
                <p>{getMonth(bill.dueDate)}</p>
                <p className="text-black font-extrabold">
                  {getDate(bill.dueDate)}
                </p>
              </div>
              <div className='flex-1'>
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
      </div>
    </div>
  );
};

export default TopThreeCards;
