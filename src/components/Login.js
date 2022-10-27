import React, { useState, useEffect } from 'react'
import Footer from './Footer';
import axios from 'axios';
import Swal from 'sweetalert2'
import { authenticate } from '../services/authorize'
import { useNavigate } from 'react-router-dom'

import { getUser } from '../services/authorize';

const Login = () => {

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const submitLoginForm = (e) => {
    e.preventDefault();
    console.log("Gonna req GG")
    axios.post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((res) => {
        //Login success
        console.log(res)
        authenticate(res, () => {
          // navigate to /
          navigate('/');
        })
      })
      .catch((err) => {
        // console.log("error login !")
        // console.log(err.response.data.err_login)
        Swal.fire({
          icon: 'error',
          title: 'Warning...',
          text: `${err.response.data.err_login}`
        })
      })
  }

  //if admin is already log in , can not go to login route
  //redirect it back to / path
  useEffect((() => {
    getUser() && navigate('/')
  }), [])

  return (

    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
        >
          <div
            className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

            <form onSubmit={submitLoginForm}>

              <div
                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
              >
                <p className="text-center font-semibold mx-4 mb-0 text-xl md:text-2xl lg:text-4xl">
                  <span className='text-teal-400'>S A I G</span> B l o g
                </p>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type='submit'
                  className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />

    </section>

  )
}

export default Login