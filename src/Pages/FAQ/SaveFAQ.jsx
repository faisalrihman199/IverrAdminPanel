import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import FAQ_Form from '../../Components/FAQ/FAQ_Form';

const SaveFAQ = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>FAQ Management
        </h1>
        <FAQ_Form />
        </section>

    </MainLayout>
  )
}

export default SaveFAQ