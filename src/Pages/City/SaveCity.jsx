import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import CityFrom from '../../Components/City/CityForm';

const SaveCity = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>City Management
        </h1>
        <CityFrom />
        </section>

    </MainLayout>
  )
}

export default SaveCity