import React, { useEffect, useState } from 'react'
import useFetch from './useFetch'

const AccountValidation = (props) => {
    const vendor_id = props.ver
    const [iuc, setIuc] = useState()

    const url = 'https://api.ufitpay.com/v1/account_validate';
    const method = 'POST';
    const urlHeader = {
    'Content-Type': 'application/json',
    'Api-Key': 'TSVLWCB5TO5RfJFCNkwSX8z0F8ZwD91',
    'Api-Token': 'TS66uEwtekJEcWiwzC1gDdiDzKcJFk1'
    }
    const urlBody = JSON.stringify({
        'vendor_id': vendor_id,
        'account_number': iuc
    })
  return (
    <div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="iuc" className="block text-sm font-medium leading-6 text-gray-900">
                  IUC Number
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    grow
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="iuc"
                  name="iuc"
                  type="text"
                  value={iuc}
                  onChange={(event => setIuc(event.target.value))}
                  placeholder='ie. 72677775'
                  autoComplete="iuc"
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buy
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
    </div>
  )
}

export default AccountValidation
