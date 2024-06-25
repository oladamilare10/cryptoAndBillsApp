import React from 'react'
import Header from '../Components/Header'
import FormReUsableCryptoBuy from '../Components/FormReUsableCryptoBuy'
import { useEffect } from 'react'
import useFetch from '../Components/useFetch'
import { useParams } from 'react-router-dom'

const BuyCrypto = () => {

  const url = 'https://api.ufitpay.com/v1/price_list'
  const method = 'POST'
  const urlHeader = {
      'Content-Type': 'application/json',
      'Api-Key': 'TSVLWCB5TO5RfJFCNkwSX8z0F8ZwD91',
      'Api-Token': 'TS66uEwtekJEcWiwzC1gDdiDzKcJFk1'
  }
  const urlBody = JSON.stringify({
    service_id: '0002'
  });

  


  return (
    <div>
      <Header />
      <FormReUsableCryptoBuy pageTitle='Buy Crypto' button='Buy' />
    </div>
  )
}

export default BuyCrypto
