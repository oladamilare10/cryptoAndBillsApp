import React from 'react'
import { MdRoomService } from 'react-icons/md';
import { Link } from 'react-router-dom'
import Dstv from '../assets/R.jpg'
import Gotv from '../assets/OIP.jpg'
import Stime from '../assets/a4fef78.png'

const CableComponent = (props) => {
    const vendorer = props.data;
    const isLoading = props.isLoading;
    const Error = props.Error
    const s_id = props.ser
    const vendors = vendorer.data

  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <div className="py-8 mx-auto px-8 w-4/5 mb-6 relative bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-left sm:space-y-0 sm:space-x-6">
      <h3 className='mb-4 text-left flex justify-start text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        Services
        <MdRoomService className='px-1 py-1 ml-3 -mb-4 w-10 h-10 text-gray-500' />
      </h3>
      {Error && <div>{Error}</div>}
      {isLoading && <div>Loading...</div> }
      {vendors && <div className="text-left space-y-2 sm:text-left ">
        <div className="space-y-0.5 grid gaps-4 grid-cols-2">
            <Link to={'/Packages/0005/0'} className="text-slate-500 block mr-2 font-medium">
              <img src={Dstv} alt="DSTV" className='w-20' />
              DSTV
            </Link>
            <Link to={'/Packages/0005/1'} className="text-slate-500 block mr-2 font-medium">
              <img src={Gotv} alt="DSTV" className='w-20' />
              GoTv
            </Link>
            <Link to={'/Packages/0005/2'} className="text-slate-500 block mr-2 font-medium">
              <img src={Stime} alt="DSTV" className='w-20' />
              StarTimes
            </Link>
            {/* {vendors.map((vendor, index) => {
                return (
                  <Link key={index + 1} to={'/Packages/' + s_id + '/' + index} className="text-slate-500 block mr-2 font-medium">
                    {vendor.vendor_name}
                  </Link>
                )
              }
            )} */}
          
        </div>
      </div>}
    </div>
    </div>
  )
}

export default CableComponent
