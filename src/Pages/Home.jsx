import { useEffect, useState } from 'react'
import React from 'react'
import Header from '../Components/Header'
import Wallet from '../Components/Wallet'
import Service from '../Components/Service'
import useFetch from '../Components/useFetch'
import Transactions from '../Components/Transactions'
import SlideOver from '../Components/SlideOver'

const url = 'https://api.ufitpay.com/v1/services';
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
const urlBody = JSON.stringify(
  {
    user_id: user_id
  }
)

const Home = () => {
  const [donate, setDonate] = useState(false)
  const [bitcoin, setBitcoin] = useState(false)
  const [walletInfo, setWalletInfo] = useState(null)
  const [loading, setLoading] = useState(true);
  const [balError, setBalError] = useState(null)

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
   const { data: services, isLoading, error } = useFetch(url, method, urlHeader)
   
const urlName = 'https://api.allbillsarena.com.ng/profile.php';
  const {data: user, isLoading: loader, error: err} = useFetch(urlName, method, urlHeader2, urlBody)

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
        setBalError(err.message)
        setLoading(null)
        setWalletInfo(null)
      }
    })
   }
   useEffect(()=> {
    fetchWallet();
   }, [])
  

  return (
    <>
      <Header />
      {user && <div>
        {walletInfo && <Wallet handleDonate={handleDonate} username={user} fetchWallet={fetchWallet} wallet={walletInfo} loading={loading} balError={balError} />}
      </div>}
      {donate && <SlideOver handleDonate={handleDonate} handleBitcoin={handleBitcoin} bitcoin={bitcoin} wallet={walletInfo} />}
      <Service data={services} isLoading={isLoading} Error={error} />
      <Transactions />
    </>
  )
}

export default Home
