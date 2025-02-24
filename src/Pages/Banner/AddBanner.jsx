import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import AddBannerForm from '../../Components/Banner/AddBannerForm';

const AddBanner = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Banner Management
        </h1>
        <AddBannerForm />
        </section>

    </MainLayout>
  )
}

export default AddBanner