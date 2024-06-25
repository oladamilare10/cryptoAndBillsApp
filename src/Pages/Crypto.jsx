import React, { useState } from 'react'
import Header from '../Components/Header'
import FormReUsableCrypto from '../Components/FormReUsableCrypto'
import { useEffect } from 'react'
import useFetch from '../Components/useFetch'
import { useParams } from 'react-router-dom'
import { RiLoader5Fill } from 'react-icons/ri'



const url = 'https://api.ufitpay.com/v1/banks'
const method = 'POST'
const urlHeader = {
    'Content-Type': 'application/json',
    'Api-Key': 'TSVLWCB5TO5RfJFCNkwSX8z0F8ZwD91',
    'Api-Token': 'TS66uEwtekJEcWiwzC1gDdiDzKcJFk1'
}
const urlBody = JSON.stringify({
  country: 'ng'
});

const Crypto = () => {

const {data: country, isLoading, error} = useFetch(url, method, urlHeader, urlBody);


  return (
    <div>
      <Header />
      {error && <div>{error}</div>}
      {isLoading && <RiLoader5Fill className='logo font-bold mt-16 text-indigo-600 hover:text-indigo-500' />}
      {country && <FormReUsableCrypto data={country} selectionTitle="Select Bank" pageTitle='Sell Crypto' button='Sell' />}
    </div>
  )
}

export default Crypto
