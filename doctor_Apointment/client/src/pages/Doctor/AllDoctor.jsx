import React, { useEffect } from 'react'
import './AllDoctor.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAllDoctors } from '../../redux/actions/doctorActions'
import { useTranslation } from 'react-i18next'   // ✅ ADD

const AllDoctor = () => {

  const dispatch = useDispatch()
  const { t } = useTranslation()   // ✅ ADD

  useEffect(() => {
    dispatch(getAllDoctors())
  }, [dispatch])

  const { doctors } = useSelector((state) => state.doctor)

  return (
    <>
      {/* TITLE */}
      <h4 className='text-container text-success mb-5'> 
        {t("selectDoctor")}
      </h4>

      <div className="container doc-container">
        {
          doctors?.length > 0 ? (
            doctors.map((d) => (
              <div className='doctor-card' key={d._id} style={{ width: '15rem' }}>

                <NavLink to={`/Doctors/${d._id}`}>
                  <img
                    src={`data:image/jpeg;base64,${d?.Image}`}
                    alt="doctor"
                    width={100}
                    height={100}
                    className='card-img-top'
                  />
                </NavLink>

                <div className='card-body'>

                  <h6>{t("name")}: {d?.name}</h6>

                  <p>{t("speciality")}: {d?.speciality}</p>

                  <p>
                    {d?.experince} {t("yearsExperience")}
                  </p>

                </div>
              </div>
            ))
          ) : (
            <h3>{t("noDoctors")}</h3>
          )
        }
      </div>
    </>
  )
}

export default AllDoctor
