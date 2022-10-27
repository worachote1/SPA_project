import { useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import Swal from 'sweetalert2'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getUser,getToken } from '../services/authorize'

const Form = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [prn_type, set_prn_type] = useState("Art")
    const [author, setAuthor] = useState(getUser())

    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/create`, { title, content, prn_type, author }
        ,{
            //validate token for save blog data to mongodb
            headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }
        )
            .then((res) => {
                console.log(res)
                //alert("Save data success")
                Swal.fire(
                    'Warning',
                    'Save data success',
                    'success'
                )

                //clear form 
                setTitle("")
                setContent("")
                set_prn_type("Art")
            })
            .catch((err) => {
                //err.res.data.msg_err
                console.log(err)
                console.log(err.response.data.msg_error)
                Swal.fire({
                    icon: 'error',
                    title: 'Warning...',
                    text: `${err.response.data.msg_error}`
                })
            })
    }

    return (
        <div
            className='max-w-[1640px] mx-auto p-3'
        >

            <NavBar />
            {/* 
           {console.log("title : ",title," content : ",content," prn_type : ",prn_type," author : ",author)}
           <p>{`title : ${title} content : ${content}, prn_type : ${prn_type}, author : ${author} `}</p> */}

            <div className='p-4 max-w-[1640px]'>
                <h1 className='font-bold text-3xl '>Write a Blog Post</h1>
                <form onSubmit={submitForm}>
                    <div className='mt-3'>
                        <label for="small-input" class="block mb-2 text-xl font-bold text-gray-900 dark:text-gray-300">Title : </label>
                        <input type="text" id="small-input" class="block p-2 w-[50%] text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
         focus:outline-none 
         md:text-xl
        "
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className='mt-3'>
                        <label for="countries" class="block mb-2 text-xl font-bold text-gray-900 dark:text-gray-300">Select Type :</label>
                        <select id="countries" class="bg-gray-50 border w-[50%] border-gray-300 text-gray-900 text-sm rounded-lg p-3 focus:outline-none "
                            onChange={(e) => set_prn_type(e.target.value)}>
                            <option value='Art'>Art</option>
                            <option value="Business">Business</option>
                            <option value="Money">Money</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Science">Science</option>
                            <option value="Technology">Technology</option>
                        </select>
                    </div>

                    <div className='mt-3'>
                        <label for="message" class="block mb-2 text-xl font-bold text-gray-900 dark:text-gray-400">Content : </label>
                        <ReactQuill
                            value={content}
                            onChange={(e) => setContent(e)}
                            className='w-[70%]'
                        />
                    </div>


                    <div className='mt-3'>
                        <label for="small-input" class="block mb-2 text-xl font-bold text-gray-900 dark:text-gray-300">Author : </label>
                        <input type="text" id="small-input" class="block p-2 w-[50%] text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
         focus:outline-none 
         md:text-xl
        " value={author} disabled
                        />
                    </div>

                    <div className='mt-8'>
                        <input type='submit' value="Save" className=' px-7 py-3 bg-green-600 rounded-full text-black font-medium text-md leading-snug uppercase shadow-md hover:scale-125 hover:cursor-pointer transition duration-150 ease-in-out"
             md:inline-block' />
                    </div>

                </form>


            </div>

            <Footer />
        </div>
    )
}

export default Form