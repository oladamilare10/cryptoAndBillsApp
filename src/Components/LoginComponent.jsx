import React, { useState } from 'react'
import { AiFillSlackCircle } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { ImSpinner } from 'react-icons/im'




const LoginComponent = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassord] = useState("")
  const [msg, setMsg] = useState(null)
  const [msgColor, setMsgColor] = useState('text-red-500')
  const [load, setLoad] = useState(false)

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



const url = 'https://api.allbillsarena.com.ng/login.php'
const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
const apiBody = JSON.stringify(
  {
    username: username,
    password : password
  }
)


  const handleLoginReq = (e) => {
    e.preventDefault();
    setLoad(true)

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
          localStorage.setItem("user_id", resData.data.user_id)
        setTimeout(() => {
          localStorage.setItem("login", true)
          localStorage.setItem("active", "logged in!")
          navigate("/")
        }, 3000)
      }
      
    })
    .catch(err => {
      setMsg(err.message)
      setMsgColor('text-red-500')
      setLoad(false)
    })
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLoginReq}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address/Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassord(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md py-1.5 px-3 bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
               {msg && <div className={'text-center text-sm ' + msgColor} > {msg} </div>}

            <div>
              {!load && <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
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
            Not a member?{' '}
            <Link to={"/Register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginComponent
