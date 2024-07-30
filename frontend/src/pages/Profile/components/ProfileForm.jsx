import { useState, useEffect } from 'react';
import { getProfileById, image_base } from '../../../libs/getApis';
import { updateProfile } from '../../../libs/putApis';
import { useSidebarStore } from '../../../Store Management/useSidebarStore';

export default function ProfileForm() {
  const [initialFormData, setInitialFormData] = useState(null);
  const { profileData } = useSidebarStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    password: '',
    image: null,
  });
  const [uploadImage, setUploadImage] = useState(null);
  const id = '66a8bf4318f7ecfb60b31755'; // Profile ID
  const [isLoading, setIsloading] = useState(null);
  useEffect(() => {
    setInitialFormData(profileData);
    setFormData({
      ...profileData,
      image: profileData?.image,
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setUploadImage(true);
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateForm = () => {
    // Check if all fields are filled
    for (const key in formData) {
      if (formData[key] === '' || formData[key] === null) {
        return false;
      }
    }
    // Check if at least one field is different from the initial values
    for (const key in formData) {
      if (formData[key] !== initialFormData[key]) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();
    if (!validateForm()) {
      alert(
        'All fields are required and at least one field must be different from the initial values.',
      );
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    await updateProfile(id, formDataToSend);
    // Optionally, you can refetch the profile data here to refresh the form with updated data
    setIsloading(false);
  };

  return (
    <div className="flex justify-center text-black items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 w-full">
        <div className="flex mb-6">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full"
              src={
                uploadImage
                  ? URL.createObjectURL(formData?.image)
                  : image_base + formData?.image
              }
              alt="Profile"
            />
            <div className="absolute bottom-0 left-0 top-0 flex justify-center items-center right-0 bg-black/40 rounded-full p-2 shadow-lg">
              <img src="/images/icon/icon-white-camera.svg" />
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            placeholder="Email address"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            placeholder="Enter here"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-[#F4EFFA] py-3 outline-none px-4 shadow-sm sm:text-sm"
            placeholder="Enter here"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center rounded-full border border-transparent bg-[#71299d] px-4 sm:px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
          >
            {isLoading ? 'loading...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}
