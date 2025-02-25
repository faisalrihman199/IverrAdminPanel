import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import ProfileForm from '../../Components/Profile/profileForm';

const Profile = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Profile Management
        </h1>
        <ProfileForm />
        </section>

    </MainLayout>
  )
}

export default Profile