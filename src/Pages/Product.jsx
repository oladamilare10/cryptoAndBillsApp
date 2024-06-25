import React from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import useFetch from '../Components/useFetch';
import AccountValidation from '../Components/AccountValidation';

const Product = () => {
    const p_id = useParams();
    const s_id = useParams()
    const v_id = useParams()
    const pack_id = p_id.p_id;
    const service_id = s_id.s_id
    const vendor_id = v_id.v_id

    const url = 'https://api.ufitpay.com/v1/price_list';
    const method = 'POST';
    const urlHeader = {
    'Content-Type': 'application/json',
    'Api-Key': 'TSVLWCB5TO5RfJFCNkwSX8z0F8ZwD91',
    'Api-Token': 'TS66uEwtekJEcWiwzC1gDdiDzKcJFk1'
    }
    const urlBody = JSON.stringify({
        'service_id': service_id
    })

    const { data: price, isLoading, error } = useFetch(url, method, urlHeader, urlBody)
    console.log(price)
   
    
  return (
    <div>
      <Header />
      {isLoading && <div>Loading...</div> }
      {error && <div>{error}</div>}
      {price && <AccountValidation result={price} isLoading={isLoading} Error={error} ver={vendor_id} />}
    </div>
  )
}

export default Product
