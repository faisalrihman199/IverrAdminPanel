import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import CarForm from '../../Components/Car/CarForm';
import CarLocationForm from '../../Components/Car/CarLocationForm';

const SaveCar = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Car Management
        </h1>
        <CarForm />
        {/* <CarLocationForm /> */}
        </section>

    </MainLayout>
  )
}

export default SaveCar