import { useState } from 'react';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Murphy',
    email: '',
    address: '',
    city: '100',
    state: '100',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex justify-center text-black items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 w-full"
      >
        <div className="flex mb-6">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full"
              src="/images/dummy-user.png"
              alt="Profile"
            />
            <div className="absolute bottom-0 left-0 top-0 flex justify-center items-center right-0 bg-black/40 rounded-full p-2 shadow-lg">
              <img src='/images/icon/icon-white-camera.svg'/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            placeholder="Enter here"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            placeholder="Enter here"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-full border border-gray-300 px-4 sm:px-8 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-full border border-transparent bg-[#71299d] px-4 sm:px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}