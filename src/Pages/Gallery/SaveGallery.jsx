import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import GalleryForm from '../../Components/Gallery/GalleryForm';

const SaveGallery = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Gallery Management

        </h1>
        <GalleryForm />
        </section>

    </MainLayout>
  )
}

export default SaveGallery