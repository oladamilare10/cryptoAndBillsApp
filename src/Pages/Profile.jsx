import React from 'react'
import Header from '../Components/Header'
import UserInfo from '../Components/UserInfo'
import useFetch from '../Components/useFetch';
import { ImSpinner11 } from 'react-icons/im';



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

const Profile = () => {

  const {data: profileDet, isLoading, error} = useFetch(url, method, urlHeader2, body);
  return (
    <>
      <Header />
      {isLoading && <ImSpinner11 className='animation:spin' />}
      {error && <div>{error}</div>}
      {profileDet && <UserInfo profile={profileDet} />}
    </>
  )
}

export default Profile
