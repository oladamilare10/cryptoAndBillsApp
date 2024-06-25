import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Networks from './Networks'
import { Link } from 'react-router-dom'
import useFetch from './useFetch'
import PayPopUp from './PayPopUp'
import { AiFillSlackCircle } from 'react-icons/ai'

const networks = [
  {
    id: 1,
    name: 'Select Coin',
    avatar:
      'https://previews.123rf.com/images/ikalvi/ikalvi1712/ikalvi171200304/92411494-technology-and-network-icon-design-networking-and-internet-symbol-template.jpg',
  },
  {
    id: 2,
    name: 'BTC',
    avatar:
      'https://th.bing.com/th/id/OIP.Og7n6Xfry_wsuuh5wxucxwHaHa?pid=ImgDet&rs=1',
  },
  {
    id: 3,
    name: 'ETH',
    avatar:
      'https://th.bing.com/th/id/R.885a120ce6f74437a9092bb15f133812?rik=g8mDPvgucZRHNw&pid=ImgRaw&r=0',
  },
  {
    id: 4,
    name: 'USDT',
    avatar:
      'https://th.bing.com/th/id/R.ded9ec4ca6bb7fffd9d814bbe6fe9924?rik=SRodUWoQRTKPEQ&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fcjdowner%2fcryptocurrency-flat%2f1024%2fTether-USDT-icon.png&ehk=IT1RX%2b8v8hAQLprQLJbOWmW3UaelZIlgy0Q7iypa%2bwk%3d&risl=&pid=ImgRaw&r=0',
  }
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const FormReUsableCrypto = (props) => {
  const count = props.data;
const pageTitle = props.pageTitle
const pageButton = props.button
const country = count.data
const selectionTitle = props.selectionTitle
const rate = 1000
const [amount, setAmount] = useState(false)
const [phone, setPhone] = useState("")
const [email, setEmail] = useState("")
const [tId, setTId] = useState("")
const [bank, setBank] = useState(country[0])
const [number, setNumber] = useState("")
const [submitMessage, setSubmitMessage] = useState(null)
const price = amount * rate;
let NigerianNaira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN'
})
const url = 'https://api.ufitpay.com/v1/bank_validate'
const method = 'POST'
const urlHeader = {
    'Content-Type': 'application/json',
    'Api-Key': 'TSVLWCB5TO5RfJFCNkwSX8z0F8ZwD91',
    'Api-Token': 'TS66uEwtekJEcWiwzC1gDdiDzKcJFk1'
}
const urlBody = JSON.stringify({
  account_number: number,
  bank_code: bank.bank_code
});
const {data: acc, isLoading, error} = useFetch(url, method, urlHeader, urlBody)


if (number) {
const numberLength = number.length;
}

const handleSubmission = (event) => {
  event.preventDefault();
  setSubmitMessage("Form Submission Success! The account you provided will be credited as soon as Coin as been received.")
}
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <AiFillSlackCircle className="mx-auto h-10 w-auto text-white font-bold px-1 py-1 rounded-md bg-indigo-600"/>
        
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {pageTitle}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmission}>
            <Networks networks={networks} title="Select Coin" rate={rate} />

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {phone}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(event => setPhone(event.target.value))}
                  placeholder='ie. 08012345678'
                  autoComplete="phone"
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {email}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event => setEmail(event.target.value))}
                  placeholder='ie. example@emailDomain.com'
                  autoComplete="email"
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="tId" className="block text-sm font-medium leading-6 text-gray-900">
                  Transaction ID
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="tId"
                  name="tId"
                  type="text"
                  value={tId}
                  onChange={(event => setTId(event.target.value))}
                  placeholder='ie. fc8a2017c0a8140a430a15976a97c1066f3af4b90749f6a5b6fecf2fec77450f'
                  autoComplete="off"
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Amount" className="block text-sm font-medium leading-6 text-gray-900">
                  Amount in USD
                </label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      You Will Receive: {NigerianNaira.format(price)}
                    </a>
                  </div>
              </div>
              <div className="mt-2">
                <input
                  id="Amount"
                  name="Amount"
                  type="number"
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder='Tell Us How Much You sent'
                  autoComplete="current-password"
                  value={amount}
                  min={"50"}
                  required
                  className="block pl-2 w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {country && <Listbox value={bank} onChange={setBank}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-7 text-gray-900">{selectionTitle}</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">{bank.bank_name}</span>
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
                        {country.map((banks) => (
                          <Listbox.Option
                            key={banks.bank_code}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={banks}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                  >
                                    {banks.bank_name}
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

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="tId" className="block text-sm font-medium leading-6 text-gray-900">
                  Account Number/ID
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {isLoading && <div>Loading</div>}
                    {error || number && <div>{error}</div>}
                    {acc && <div>{acc.data.account_name}</div>}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="tId"
                  name="tId"
                  type="text"
                  value={number}
                  onChange={(event => setNumber(event.target.value))}
                  placeholder='ie. 1234567890'
                  autoComplete="off"
                  maxLength={'10'}
                  minLength={10}
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className='text-center text-sm text-green-600 font-medium'>
                {submitMessage && <PayPopUp title="Request Sent!" text={submitMessage} />}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {pageButton}
              </button>
            </div>
            <div>
              <Link
                to={"/Crypto/Buy"}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Click Here To Buy Crypto
              </Link>
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-bold text-gray-500">
            All Bills Arena&#8482; {' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              A Crypto Revolution Has Just Begone
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default FormReUsableCrypto
