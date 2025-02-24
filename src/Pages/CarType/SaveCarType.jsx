import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import CarTypeForm from '../../Components/CarType/CarTypeForm';

const SaveCarType = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Car Type Management

        </h1>
        <CarTypeForm />
        </section>

    </MainLayout>
  )
}

export default SaveCarType