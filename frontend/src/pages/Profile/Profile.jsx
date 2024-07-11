import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
const Profile = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <ProfileForm />
    </DefaultLayout>
  );
};

export default Profile;
