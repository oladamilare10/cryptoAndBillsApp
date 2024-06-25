import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Wallet from '../Components/Wallet'
import Load from '../Components/Load'
import { useParams } from 'react-router-dom'
import useFetch from '../Components/useFetch'
import SlideOver from '../Components/SlideOver'

const Pack = () => {
    const v_id = useParams()
    const s_id = useParams()
    const vendor_id = v_id.v_id;
    const service_id = s_id.s_id
    const [walletInfo, setWalletInfo] = useState(null)
    const [loading, setLoading] = useState(true);
    const [balError, setBalError] = useState(null)
        
    const urlBody = JSON.stringify({
      'service_id': service_id
  })

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


  const [donate, setDonate] = useState(false)
  const [bitcoin, setBitcoin] = useState(false)
  const [checkAirtime, setCheckAirtime] = useState(true)
  

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
    body: body
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
      console.log("Result Aborted!")
    }else{
      setBalError(err.message)
      setLoading(null)
      setWalletInfo(null)
    }
  })
  console.log("reload")
 }
 useEffect(()=> {
  fetchWallet();
 }, [])
   
  
  const { data: packages, isLoading, error } = useFetch(url, method, urlHeader, urlBody)
  const handleAirtime = ()=> {
    if (packages) {
      setTimeout(() => {
        setCheckAirtime(false)
      }, 200);
    }
  }
    const urlName = 'https://api.allbillsarena.com.ng/profile.php';
  const {data: user, isLoading: loader, error: err} = useFetch(urlName, method, urlHeader2, body)

  if (packages) {
    
    const pack_length = packages.data[vendor_id].packages.length;
    if (pack_length > 1 & service_id !== "0001"){
      handleAirtime();
    }

  }

  return (
    <div>
      <Header />
      {user && <div>
        {walletInfo && <Wallet handleDonate={handleDonate} username={user} fetchWallet={fetchWallet} wallet={walletInfo} loading={loading} balError={balError} />}
      </div>}
      {donate && <SlideOver handleDonate={handleDonate} handleBitcoin={handleBitcoin} bitcoin={bitcoin} wallet={walletInfo} />}
      {walletInfo && <div>
        {packages && <Load data={packages} isLoading={isLoading} fetchWallet={fetchWallet} wallet={walletInfo} checkAirtime={checkAirtime} Error={error} ver={vendor_id} ser={service_id} selectionTitle="Select Package" />}
        </div>}
      
    </div>
  )
}

export default Pack
