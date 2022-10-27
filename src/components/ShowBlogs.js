import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import parse from 'html-react-parser';

import { getUser ,getToken} from '../services/authorize';

const ShowBlogs = () => {

    const [blogs, setBlogs] = useState([])

    // const [data,setData] = useState(blogs)

    //prn section
    //test filter prn_type
    let [data, setData] = useState([])
    const [typeActive, setTypeActive] = useState(false)
    const filterType = (prn_type) => {
        setData(
            data = blogs.filter((blog) => {
                return blog.prn_type === prn_type
            })
        )
        //alert("Sdf")
    }

    //
    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_API}/blogs`)
            .then((res) => {

                console.log("get all data success !")
                console.log(res)
                setBlogs(res.data)

                //test if remove during filter system


            })
            .catch((err) => {
                //alert(err)
                console.log("Can't get data")
            })
    }

    // Fetch data when web is open or refresh
    useEffect(() => {
        fetchData()
    }, [])

    //remove by slug
    const confirmRemove = (slug) => {
        Swal.fire({
            title: "Do you want to delete this blog?",
            icon: "warning",
            showCancelButton: true
        }).then((result) => {

            if (result.isConfirmed) {
                //alert(slug)

                //send request API for delete
                removeBlog(slug)
            }
        })
    }

    const removeBlog = (slug) => {
        axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,{
            //validate token for delete data
            headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })
            .then((res) => {
                console.log("remove ...")
                // console.log(res)
                Swal.fire({
                    title: `${res.data.msg}`,
                    icon: "success"
                })

                //fetch all available
                fetchData();
                //if it's in filter system then refresh whole web 
                if (typeActive) {
                    window.location.reload(false)
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className=' w-full  mt-2'>
            {/* {JSON.stringify(blogs)} */}

            {/* select type Controller */}
            <div className='p-4 flex flex-col justify-between flex-wrap sm:flex-row'>
                <div className='mt-3'>
                    <button className='px-7 py-3 bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-orange-600 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'
                        onClick={() => {

                            filterType("Art")
                            setTypeActive(true)
                        }}>Art</button>
                </div>
                <div className='mt-3'>
                    <button className='px-7 py-3 bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-orange-600 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'
                        onClick={() => {

                            filterType("Business")
                            setTypeActive(true)
                        }}>Business</button>
                </div>
                <div className='mt-3'>
                    <button className='px-7 py-3 bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-orange-600 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'
                        onClick={() => {

                            filterType("Money")
                            setTypeActive(true)
                        }}>Money</button>
                </div>
                <div className='mt-3'>
                    <button className='px-7 py-3 bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-orange-600 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'
                        onClick={() => {

                            filterType("Psychology")
                            setTypeActive(true)
                        }}>Psychology</button>
                </div>
                <div className='mt-3'>
                    <button className='px-7 py-3 bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-orange-600 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'
                        onClick={() => {

                            filterType("Science")
                            setTypeActive(true)
                        }}>Science</button>
                </div>

                <div className='mt-3'>
                    <button className='px-7 py-3 bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-orange-600 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'
                        onClick={() => {

                            filterType("Technology")
                            setTypeActive(true)
                        }}>Technology</button>
                </div>

            </div>

            {/*  render when select a type*/}
            {(typeActive) && data.map((blog, index) => (
                <div className='mb-2 p-4 border-b-[1px]' key={index}>
                    <Link to={`/blog/${blog.slug}`} >
                        <h2 className='font-bold'>{blog.title}</h2>
                        <p className='font-light'>Category : {blog.prn_type} </p>
                    </Link>

                    <div>{parse(blog.content.substring(0, 220))} <span className='font-light'>...</span></div>
                    <p className='font-light'>Author : {blog.author} </p>
                    <p className='font-light'>Published : {new Date(blog.createdAt).toLocaleString()}</p>

                    {/* only the same admin with token can use update and delete feature */}
                    {getUser()==blog.author &&
                        <div className='mt-2'>
                            <Link to={`/blog/update/${blog.slug}`}>
                                <button className='mr-2 bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-green-500 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'>
                                    Update
                                </button>
                            </Link>
                            <button className='bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-red-600 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'
                                onClick={() => confirmRemove(blog.slug)}> Delete </button>
                        </div>
                    }
                </div>
            ))}

            {/* render at the first time ()not select type yet */}
            {!(typeActive) && blogs.map((blog, index) => (
                <div className='mb-2 p-4 border-b-[1px]' key={index}>
                    <Link to={`/blog/${blog.slug}`}>
                        <h2 className='font-bold text-3xl'>{blog.title}</h2>
                        <p className='font-light'>Category : {blog.prn_type} </p>
                    </Link>

                    <div>{parse(blog.content.substring(0, 220))} <span className='font-light'>...</span></div>
                    <p className='font-light'>Author : {blog.author} </p>
                    <p className='font-light'>Published : {new Date(blog.createdAt).toLocaleString()}</p>
                    {/* only the same admin with token can use update and delete feature */}
                    {getUser()==blog.author &&
                        <div className='mt-2'>
                            <Link to={`/blog/update/${blog.slug}`}>
                                <button className='mr-2 bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-green-500 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'>
                                    Update
                                </button>
                            </Link>
                            <button className='bg-transparent rounded-full text-black font-medium  uppercase shadow-md hover:bg-red-600 hover:text-white focus:shadow-lg focus:outline-none transition duration-150 ease-in-out'
                                onClick={() => confirmRemove(blog.slug)}> Delete </button>
                        </div>
                    }
                </div>
            ))}


        </div>
    )
}

export default ShowBlogs