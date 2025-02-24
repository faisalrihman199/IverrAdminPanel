import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import { useAPP } from '../../contexts/Appcontext'
import CityFrom from '../../Components/City/CityForm';
import CouponForm from '../../Components/Coupon/CouponForm';

const SaveCoupon = () => {
 const {theme} =useAPP();
  return (
    <MainLayout>
        <section>
        <h1 className={`font-semibold mb-4 ${theme=='dark'?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Coupon Management
        </h1>
        <CouponForm />
        </section>

    </MainLayout>
  )
}

export default SaveCoupon