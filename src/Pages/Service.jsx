import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Wallet from '../Components/Wallet'
import { useParams } from 'react-router-dom'
import useFetch from '../Components/useFetch'
import Vendors from '../Components/Vendors'
import SlideOver from '../Components/SlideOver'

const url = 'https://api.ufitpay.com/v1/price_list';
const url2 = 'https://api.allbillsarena.com.ng/wallet.php'
const method = 'POST';
const user_id = localStorage.getItem("user_id");


const urlHeader2 = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
const urlHeader = {
  'Content-Type': 'application/json',
  'Api-Key': 'TSVLWCB5TO5RfJFCNkwSX8z0F8ZwD91',
  'Api-Token': 'TS66uEwtekJEcWiwzC1gDdiDzKcJFk1'
}
const body = JSON.stringify(
  {
    user_id: user_id
  }
)

const Service = () => {
    const s_id = useParams()
    const service_id = s_id.s_id;
    
    
    const urlBody = JSON.stringify({
        'service_id': service_id
    })
    const urlName = 'https://api.allbillsarena.com.ng/profile.php';
    const {data: user, isLoading: loader, error: err} = useFetch(urlName, method, urlHeader2, body)
  

    const [donate, setDonate] = useState(false)
  const [bitcoin, setBitcoin] = useState(false)

  const handleDonate = () => {
    if (!donate){
      setDonate(true)
    }else {
      setDonate(false)
      setBitcoin(false)
    }
  }
  const handleBitcoin = ()=> {
    if (!bitcoin){
      setBitcoin(true)
    }
  }
  
  const fetchWallet = ()=> {
    fetch(url2, {
      method: "POST",
      header: urlHeader2,
      body: urlBody
    })
    .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch Data for this particular resource.')
        }
        return res.json();
    })
    .then(data => {
        if (data.status === 'error') {
            throw Error(data.message)
        }
        setWalletInfo(data);
        setLoading(false)
        setBalError(null)
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        //console.log("Result Aborted!")
      }else{
        setError(err.message)
        setLoading(null)
        setWalletInfo(null)
      }
    })
   }
   useEffect(()=> {
    fetchWallet();
   }, [])

    const {data: walletInfo, isLoading: loading, error: balError} = useFetch(url2, method, urlHeader2, body)
  const { data: vendors, isLoading, error } = useFetch(url, method, urlHeader, urlBody)

  return (
    <div>
      <Header />
      {user && <div>
        {walletInfo && <Wallet handleDonate={handleDonate} username={user} fetchWallet={fetchWallet} wallet={walletInfo} loading={loading} balError={balError} />}
      </div>}
      {donate && <SlideOver handleDonate={handleDonate}  handleBitcoin={handleBitcoin} bitcoin={bitcoin} wallet={walletInfo} />}
      {vendors && <Vendors data={vendors} isLoading={isLoading} Error={error} ser={service_id} />}
    </div>
  )
}

export default Service
