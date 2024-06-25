import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import PayPopUp from '../Components/PayPopUp'



  let NigerianNaira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  })
const Load = (props) => {
  const packs = props.data;
  const isLoading = props.isLoading;
  const Error = props.Error
  const ver = props.ver
  const ser = props.ser
  const fetchWallet = props.fetchWallet
  const user_id = localStorage.getItem("user_id");
  const packages = packs.data
  const selectionTitle = props.selectionTitle
  const checkAirtime = props.checkAirtime
  const [number, setNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [payPopUp, setPayPopUp] = useState(false)
  const [selected, setSelected] = useState(packages[ver].packages[0])
  const displayAmount = Number(amount)
  const vendors = packages[ver].vendor_id;
  const vendor_title = packages[ver].vendor_name;
  const curBalance = props.wallet.result.data.w_balance
  const current_balance = Number(curBalance);
  const newBal = current_balance - amount;
  const ref_id = Math.floor((Math.random()*1000000)+1);
  const [text, setText] = useState("")
  const [msg, setMsg] = useState(null)
  const dateData = new Date();
  const url = 'https://api.allbillsarena.com.ng/update_wallet.php'
  const payUrl = 'https://api.ufitpay.com/v1/pay';

  const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const payHeader = {
    'Content-Type': 'application/json',
    'Api-Key': 'TSVLWCB5TO5RfJFCNkwSX8z0F8ZwD91',
    'Api-Token': 'TS66uEwtekJEcWiwzC1gDdiDzKcJFk1'
  }
  const body = JSON.stringify(
    {
      user_id: user_id,
      new_balance: newBal,
      t_amount: amount,
      desc: vendor_title,
      t_id: ref_id,
      date: dateData
    }
  )

  const payBody = JSON.stringify(
    {
      service_id: ser, 
      vendor_id: vendors, 
      package_id: selected.package, 
      account_number: number, 
      amount: amount, 
      request_ref: ref_id
    }
  )

  function classNames(...classes) {
    setAmount(selected.price)
    return classes.filter(Boolean).join(' ')
  }
  const handlePayPopUp = ()=> {
    if (payPopUp) {
      setPayPopUp(false)
    }else{
      setPayPopUp(true)
    }
  }

  const handlePayService = ()=> {
    fetch(payUrl, {
      method: "POST",
      header: payHeader,
      body: payBody
    })
    .then(res => {
      return res.json();
    })
    .then(payData => {
      // console.log(payData);
    })
  }

  const handleBuy = (e)=> {
    e.preventDefault();
    if (amount === "") {
      setMsg("please Select A Package Amount!");
    }else {
      if(number === ""){
        setMsg("Please provide your account ID or number for this service!")
      }else {
        handlePayService();
        fetch(url, {
          method: "POST",
          header: header,
          body: body
        })
        .then(res => {
          return res.json();
        })
        .then(msg => {
          console.log(msg.result.data)
          fetchWallet();
          setMsg(null)
          setText("Your Payment Of " + NigerianNaira.format(amount) + " was successful and purchase of " + selected.package_name + " was Complete")
          handlePayPopUp();
        })
      }
    }
  }


  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <div className="py-8 mx-auto px-8 w-4/5 mb-6 relative bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
        <h3 className='mb-4 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900'>{vendor_title}</h3>
        {Error && <div>{Error}</div>}
        {isLoading && <div>Loading...</div> }
        <form className="text-center space-y-2 sm:text-left ">
          
          
        {!checkAirtime && <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className='flex items-center justify-between'>
              <Listbox.Label className="block text-sm font-medium leading-7 text-gray-900">
                {selectionTitle}
              </Listbox.Label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  price: {NigerianNaira.format(amount)}
                </a>
              </div>
            </div>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selected.package_name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {packages[ver].packages.map((packager) => (
                    <Listbox.Option
                      key={packager.package}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={packager}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {packager.package_name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>}

      {checkAirtime && <div>
        <div className="flex items-center justify-between">
          <label htmlFor="Amount" className="block text-sm font-medium leading-6 text-gray-900">
            Amount:
          </label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              you Will Pay: {NigerianNaira.format(displayAmount)}
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="Amount"
            name="Amount"
            type="number"
            onChange={(event) => setAmount(event.target.value)}
            placeholder='Amount'
            autoComplete="current-password"
            value={amount}
            min={"50"}
            required
            className="block pl-2 w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>}


      <div>
          <div className="flex items-center justify-between">
            <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
              Number/Id
            </label>
            <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  {number}
                </a>
              </div>
          </div>
          <div className="mt-2">
            <input
              id="number"
              name="number"
              type="text"
              onChange={(event) => setNumber(event.target.value)}
              placeholder='Your Number/ID'
              autoComplete="number"
              value={number}
              minLength={4}
              required
              className="block pl-2 w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {msg && <div className='text-center text-sm text-red-500'> {msg} </div>}
      {payPopUp && <PayPopUp title={"Transaction Completed"} text={text} handlePayPopUp={handlePayPopUp} />}

        <div>
          <button
            type="submit"
            onClick={handleBuy}
            className="flex w-full justify-center mt-7 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Buy
          </button>
        </div>


        </form>
      </div>
    </div>
  )
}

export default Load
