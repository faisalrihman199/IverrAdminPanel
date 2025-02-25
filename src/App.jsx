import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import Home from './Pages/Home';
import AddBanner from './Pages/Banner/AddBanner';
import ListBanner from './Pages/Banner/ListBanner';
import DotLoader from './Components/Loaders/DotLoader';
import SaveCity from './Pages/City/SaveCity';
import ListCity from './Pages/City/ListCity';
import SaveCarType from './Pages/CarType/SaveCarType';
import ListCarType from './Pages/CarType/ListCarType';
import SaveCarBrand from './Pages/CarBrand/SaveCarBrand';
import ListCarBrand from './Pages/CarBrand/ListCarBrand';
import SaveGallery from './Pages/Gallery/SaveGallery';
import ListGallery from './Pages/Gallery/ListGallery';
import SaveFAQ from './Pages/FAQ/SaveFAQ';
import ListFAQs from './Pages/FAQ/ListFAQs';
import SaveFacility from './Pages/Facility/SaveFacility';
import ListFacility from './Pages/Facility/ListFacilty';
import Payment from './Pages/Payment/Payment';
import Payout from './Pages/Payout/Payout';
import SaveCoupon from './Pages/Coupon/SaveCoupon';
import ListCoupon from './Pages/Coupon/ListCoupon';
import SaveCar from './Pages/Car/SaveCar';
import ListCar from './Pages/Car/ListCar';
import Login from './Pages/Auth/Login';
import { ToastContainer } from 'react-toastify';

function App() {
  const [loading, setLoading] = useState(true);

  // After 2 seconds, hide the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        // Loader is centered relative to the viewport
        <div className="relative w-screen h-screen">
          <DotLoader />
        </div>
      ) : (
        <>
        
        <Routes>
          <Route path="/dashboard" element={<Home />} />

          {/* Auth  */}
          <Route path="/" element={<Login />} />
          {/* Banner  */}
          <Route path="/banners/add" element={<AddBanner />} />
          <Route path="/banners/list" element={<ListBanner />} />

          {/* City  */}
          <Route path="/cities/add" element={<SaveCity />} />
          <Route path="/cities/list" element={<ListCity />} />

          {/* Car Type  */}
          <Route path="/car-types/add" element={<SaveCarType />} />
          <Route path="/car-types/list" element={<ListCarType />} />

          {/* Car  */}
          <Route path="/cars/add" element={<SaveCar />} />
          <Route path="/cars/list" element={<ListCar />} />

          {/* Car Brand  */}
          <Route path="/car-brands/add" element={<SaveCarBrand />} />
          <Route path="/car-brands/list" element={<ListCarBrand />} />

          {/* Gallery  */}
          <Route path="/galleries/add" element={<SaveGallery />} />
          <Route path="/galleries/list" element={<ListGallery />} />

          {/* FAQs  */}
          <Route path="/faqs/add" element={<SaveFAQ />} />
          <Route path="/faqs/list" element={<ListFAQs />} />

          {/* facilities  */}
          <Route path="/facilities/add" element={<SaveFacility />} />
          <Route path="/facilities/list" element={<ListFacility />} />

          {/* Coupons  */}
          <Route path="/coupons/add" element={<SaveCoupon />} />
          <Route path="/coupons/list" element={<ListCoupon />} />

          {/* Payments and Payouts  */}
          <Route path="/payments" element={<Payment />} />
          <Route path="/payouts" element={<Payout />} />
        </Routes>
        <ToastContainer />

        </>
      )}
    </Router>
  );
}

export default App;
