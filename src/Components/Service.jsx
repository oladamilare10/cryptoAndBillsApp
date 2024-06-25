import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineNetworkCell, MdOutlineNetworkWifi3Bar, MdRoomService, MdSportsBaseball } from 'react-icons/md'
import { GiElectricalResistance } from 'react-icons/gi'
import { BsCashCoin, BsFillTelephonePlusFill } from 'react-icons/bs'
import { PiTelevisionBold } from 'react-icons/pi'
import { FaSpinner, FaUserGraduate } from 'react-icons/fa'

const servicer = [
    { id: 1, name: 'Sell Crypto', img: '11,504.99', href: '/sell' },
    { id: 2, name: 'Buy Crypto', img: '11,504.99', href: '/buy' },
    { id: 3, name: 'Airtime', img: '11,504.99', href: 'Airtime' },
    { id: 4, name: 'Cable Tv Subscription', img: '11,504.99', href: 'Cable' },
    { id: 5, name: 'Utility Bills', img: '11,504.99', href: 'Bills' },
  ]

const Service = (props) => {
  const services = props.data;
  const isLoading = props.isLoading;
  const Error = props.Error

  const user_id = localStorage.getItem("user_id");
  

  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <div className="py-8 mx-auto px-8 w-4/5 relative bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
        <h3 className='mb-4 text-left text-2xl flex justify-start font-bold leading-9 tracking-tight text-gray-900'>
          Services
          <MdRoomService className='px-1 py-1 ml-3 -mb-4 w-10 h-10 text-gray-500' />
        </h3>
        {Error && <div>{Error}</div>}
        {isLoading && <div><FaSpinner className='animate-spin'/></div> }
        {services && <div className="text-left space-y-2 sm:text-left">
          <div className="grid gap-4 grid-cols-3 grid-rows-3 content-center">
            <div className='h-auto text-center shadow-sm content-center' >
            <Link to={"/Vendors/0001"} className='text-gray-600' >
              <BsFillTelephonePlusFill className='w-7 h-7 px-1 py-1 mb-1 mx-auto' />
              Buy Airtime
            </Link>
            </div>
            <div className='h-auto text-center shadow-sm content-center' >
            <Link to={"/Vendors/0002"} className='text-gray-600' >
              <MdOutlineNetworkCell className='w-7 h-7 px-1 py-1 mb-1 mx-auto' />
              Buy Data
            </Link>
            </div>
            <div className='h-15 shadow-sm content-end text-center content-center' >
            <Link to={"/Vendors/0003"} className='text-gray-600' >
              <GiElectricalResistance className='w-7 h-7 px-1 py-1 mb-1 mx-auto' />
              Electricity Bill
            </Link>
            </div>
            <div className='h-15 shadow-sm content-end text-center content-center' >
            <Link to={"/Vendors/0004"} className='text-gray-600' >
              <MdOutlineNetworkWifi3Bar className='w-7 h-7 px-1 py-1 mb-1 mx-auto' />
              Internet Bills
            </Link>
            </div>
            <div className='h-15 shadow-sm content-end text-center content-center' >
            <Link to={"/Cable"} className='text-gray-600' >
              <PiTelevisionBold className='w-7 h-7 px-1 py-1 mb-1 mx-auto' />
              Cable TV Subscription
            </Link>
            </div>
            <div className='h-15 shadow-sm content-end text-center content-center' >
            <Link to={"/Vendors/0028"} className='text-gray-600' >
              <FaUserGraduate className='w-7 h-7 px-1 py-1 mb-1 mx-auto' />
              Education Bills
            </Link>
            </div>
            <div className='h-15 shadow-sm content-end text-center content-center' >
            <Link to={"/Vendors/0036"} className='text-gray-600' >
              <MdSportsBaseball className='w-7 h-7 px-1 py-1 mb-1 mx-auto' />
              Sports & Betting
            </Link>
            </div>
            <div className='h-15 shadow-sm content-end text-center content-center' >
            <Link to={"/Vendors/0078"} className='text-gray-600' >
            <BsCashCoin className='w-7 h-7 px-1 py-1 mb-1 mx-auto' />
              Airtime to Cash
            </Link>
            </div>
              {/* {services.data.map((service) => (
                  <Link to={'/Vendors/' + service.service_id} key={service.service_id} className="text-slate-500 block mr-2 font-medium">
                      {service.service_name}
                  </Link> 
              ))} */}
            
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Service
