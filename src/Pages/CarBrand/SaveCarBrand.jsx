import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import CarBrandForm from '../../Components/CarBrand/CarBrandForm';

const SaveCarBrand = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Car Brand Management

        </h1>
        <CarBrandForm />
        </section>

    </MainLayout>
  )
}

export default SaveCarBrand