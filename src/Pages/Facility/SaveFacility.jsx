import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import FacilityForm from '../../Components/Facility/FacilityForm';

const SaveFacility = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Facility Management

        </h1>
        <FacilityForm />
        </section>

    </MainLayout>
  )
}

export default SaveFacility