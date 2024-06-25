import React, { useState } from 'react'
import { AiFillSlackCircle } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { ImSpinner } from 'react-icons/im'




const RegisterComponent = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCon, setPasswordCon] = useState("")
  const [msg, setMsg] = useState(null)
  const [msgColor, setMsgColor] = useState('text-red-500')
  const [load, setLoad] = useState(false)
  const [passMsg, setPassMsg] = useState(null)

  let login = localStorage.getItem("login")
  if(login) {
    navigate("/")
  }
  let loginStatus = localStorage.getItem("loginStatus");
  if (loginStatus){
    setMsg(loginStatus);
    setMsgColor("text-red-500");
    setTimeout(()=> {
      localStorage.clear();
      window.location.reload();
    }, 1000)
  }



const url = 'https://api.allbillsarena.com.ng/register.php'
const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
const apiBody = JSON.stringify(
  {
    fname: firstName,
    lname : lastName,
    username: username,
    email : email,
    dob : dob,
    phone: phone,
    password: password
  }
)
const matchConfirm = (e)=> {
  setPasswordCon(e.target.value)
}


  const handleLoginReq = (e) => {
    e.preventDefault();

    if (password === passwordCon) {
      setLoad(true)
      setPassMsg(null)

      fetch(url, {
        method: "POST",
        header: header,
        body: apiBody
      })
      .then(res => {
        return res.json()
      })
      .then(resData => {
        if (resData.data.status === 'Error') {
          throw Error(resData.data.message)
        }else{
          setMsg(resData.data.data)
          setMsgColor('text-green-600')
          setTimeout(() => {
            navigate("/Login")
          }, 5000)
        }
        
      })
      .catch(err => {
        setMsg(err.message)
        setMsgColor('text-red-500')
        setLoad(false)
      })
    }else{
      setPassMsg("Password doesn't match")
    }
    
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
            Create account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLoginReq}>
            <div className='flex justify-between'>
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="firstname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lastname"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="phone"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                Date Of Birth
              </label>
              <div className="mt-2">
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  autoComplete="dob"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                 
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md py-1.5 px-3 bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="text-sm">
                  
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={passwordCon}
                  onChange={matchConfirm}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md py-1.5 px-3 bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {passMsg && <div>{passMsg}</div>}
              </div>
            </div>
            
               {msg && <div className={'text-center text-sm ' + msgColor} > {msg} </div>}

            <div>
              {!load && <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>}
              {load && <button
                type="submit"
                disabled
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ImSpinner className='w-5 h-auto animate-spin ' />
              </button>}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link
             to={"/Login"}
             className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterComponent
