import React from 'react'
import Slider from '../Component/Slider/Slider'
import Facility from "../Component/Static/Facility/Facility"
import Sortintro from '../Component/Static/Sortintro/Sortintro'
import WhyChose from '../Component/Static/WhyChose/WhyChose'
import Footer from '../Component/Layout/Footer/Footer'
import Contact from './Contact'
import PatientReview from '../Component/Static/PatientReview/PatientReview'



const Home = () => {
  return (
   <>
   <Slider/>
   <Facility/>
   <Sortintro/>
   <WhyChose/>
   <Contact/>
   <PatientReview/>
  
   <Footer/>
  
 
   
   </>
  )
}

export default Home
