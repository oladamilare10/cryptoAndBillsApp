import { Fragment, useState } from 'react'
import {
  ChevronDownIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { BiWallet, BiLogoBitcoin, BiMoney } from 'react-icons/bi'
import { BsCashCoin } from 'react-icons/bs'
import { MdAccountBalance } from 'react-icons/md'
import { ImSpinner11 } from 'react-icons/im'
import { VscVmActive } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from './useFetch'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const user_id = localStorage.getItem("user_id");
const url = 'https://api.allbillsarena.com.ng/profile.php';
const method = "POST"
const urlHeader2 = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
const body = JSON.stringify(
  {
    user_id: user_id
  }
)

  
  let NigerianNaira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  })

const Wallet = (props) => {
  const wallet = props.wallet;
  const handleDonate = props.handleDonate;
  const fetchWallet = props.fetchWallet
  const user = props.username
  const username = user.data.data.l_name + ' ' + user.data.data.f_name

  const balance = wallet.result.data.w_balance;
  const accNum = wallet.result.data.w_id;
  const navigate = useNavigate()
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className='py-8 mx-auto px-8 w-4/5 mb-63relative bg-white rounded-xl shadow-lg space-y-2 sm:py-3 sm:items-center sm:space-y-0 sm:space-x-6'>
            <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              {user && <div>
                {username && <h2 className="text-2xl capitalize font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {username}
                </h2>}
              </div>}
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BiWallet className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="currentColor" />
                   {NigerianNaira.format(balance)}
                   <ImSpinner11 onClick={fetchWallet} className='ml-4 h-5 w-5 px-1 py-1' />
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500" >
                  <MdAccountBalance className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="currentColor" aria-hidden="true" />
                   {accNum}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <VscVmActive className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="currentColor" aria-hidden="true" />
                  Active
                </div>
                
              </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
              <span className="hidden sm:block">
                <button type="button" onClick={handleDonate} className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <BsCashCoin className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" aria-hidden="true" />
                   Withdraw
                </button>
              </span>

              <span className="ml-3 hidden sm:block">
                <button onClick={()=> navigate("/Crypto")} type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <BiLogoBitcoin className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" aria-hidden="true" />
                    
                  Sell
                </button>
              </span>

              <span className="sm:ml-3">
              <button type="button" 
                    onClick={handleDonate} 
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                  <BiMoney className="-ml-0.5 mr-1.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
                    
                   Fund Wallet
                </button>
              </span>

             {/* Dropdown */}
        <Menu as="div" className="relative ml-3 sm:hidden">
          <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
            More
            <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                  to={"/Crypto"}
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  sell Crypto
                </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                     withdraw
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>

            </div>
          </div>

          </div>
        </div>
      </main>
    
    </>
  )
}

export default Wallet
