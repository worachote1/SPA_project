import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getToken } from '../services/authorize'

const UpdateForm = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [prn_type, set_prn_type] = useState("Art")
    const [author, setAuthor] = useState()
    
    const {slug} = useParams()

    const submitUpdateForm = (e) => {
        e.preventDefault();
        console.table({title,content,prn_type,author})
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,prn_type,author}
        ,{
            //validate token for update
            headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })
        .then((res)=>{
            console.log(res)
            //alert("Save data success")
            
            Swal.fire(
                'Warning',
                'Update blog success',
                'success'
              )

        })
        .catch((err)=>{
            //err.res.data.msg_err
            console.log(err)
            console.log(err.response.data.msg_error)
            Swal.fire({
                icon: 'error',
                title: 'Update Error !',
                text: `${err.response.data.msg_error}`
              })
        })
    }


    //fetch former data to be displayed
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then((res)=>{
            console.log("Former data -> ")
            console.log(res)
            const {content,author,title} = res.data
            setTitle(title)
            setContent(content)
            set_prn_type(prn_type)
            setAuthor(author)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


    return (
        <div
            className='max-w-[1640px] mx-auto p-3'
        >

            <NavBar />
            {/* 
           {console.log("title : ",title," content : ",content," prn_type : ",prn_type," author : ",author)}
           <p>{`title : ${title} content : ${content}, prn_type : ${prn_type}, author : ${author} `}</p> */}

            <div className='p-4 max-w-[1640px]'>
                <h1 className='font-bold text-3xl text-lime-300'>Update blog</h1>
                <form onSubmit={submitUpdateForm}>
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
                        <input type='submit' value="Update" className=' px-7 py-3 bg-green-600 rounded-full text-black font-medium text-md leading-snug uppercase shadow-md hover:scale-125 hover:cursor-pointer transition duration-150 ease-in-out"
             md:inline-block' />
                    </div>

                </form>
            </div>

            <Footer />
        </div>
    )
}

export default UpdateForm