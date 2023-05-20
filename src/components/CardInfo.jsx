import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CardInfo = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [model, setModal] = useState(false)
    const [updateModel, setUpdateModel] = useState(false)
    const [selled_id, setSellerid] = useState("")

    const [productInfo, setProductInfo] = useState({
        name: "", price: "", desc: "", pic: ""
    })

    const closeModel = () => {
        setModal(false)
        setSellerid("")
    }
    const openModel = () => {
        setModal(true)
    }

    const closupdteModel = () => {
        setUpdateModel(false)
        setSellerid("")
    }
    const openupdtModel = () => {
        setProductInfo({ ...product, name: product[0].name, price: product[0].price, desc: product[0].desc, pic: product[0].pic })
        setUpdateModel(true)
    }

    const inputhandle = (e) => {
        let { name, value } = e.target
        setProductInfo((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const deleteProduct = async () => {
        try {
            const res = await fetch(`https://crud-api-sooty.vercel.app/products/${id}`, {
                method: "DELETE",
                headers: {
                    autherization: Cookies.get("Role") + " " + Cookies.get("Token")
                }
            })
            let data = await res.json()
            if (data.data) setProduct(data.data)
            console.log(data)

            if (res.status === 500) {
                toast.error(`${data.message}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            if (res.status === 201) {
                toast.success(`${data.message}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(`${error}`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const fetchProduct = async () => {
        try {
            const res = await fetch(`https://crud-api-sooty.vercel.app/products/${id}`, {
                method: "GET",
                headers: {
                    autherization: Cookies.get("Role") + " " + Cookies.get("Token")
                }
            })
            let data = await res.json()
            if (data.data) {
                setProduct(data.data)

            }
            console.log(data)

            if (res.status === 500) {
                toast.error(`${data.message}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/signin")
            }
        } catch (error) {
            console.log(error)
            toast.error(`${error}`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const updateProduct = async () => {
        try {
            const { name, price, desc, pic } = productInfo
            console.log(productInfo)
            const res = await fetch(`https://crud-api-sooty.vercel.app/products/${id}`, {
                method: "PATCH",
                mode:"cors",
                headers: {
                    autherization: Cookies.get("Role") + " " + Cookies.get("Token"),
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    name, price, desc, pic
                })
            })
            let data = await res.json()
            console.log(data)

            if (res.status === 500) {
                toast.error(`${data.message}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            if (res.status === 201) {
                toast.success(`${data.message}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            setUpdateModel(!updateModel)
            fetchProduct()
        } catch (error) {
            console.log(error)
            toast.error(`${error}`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    useEffect(() => {
        fetchProduct()

    }, [])



    return (
        <div className='p-11'>
            {
                product[0] ?
                    <div className='flex flex-col lg:flex-row w-full justify-start md:px-16 items-start'>
                        <div className='w-[80%] lg:w-[70vh] flex justify-center'>
                            <img className=" w-full overflow-hidden" src={product[0].pic} alt="" />
                        </div>
                        <div className='flex flex-col p-4 md:p-8'>

                            <h5 className="text-[35px] font-bold tracking-tight text-gray-900 dark:text-white">
                                {product[0].name}
                            </h5>
                            <p className="mb-3 text-gray-700 dark:text-gray-400 text-[25px] font-bold">
                                ₹ <span className='md:text-[80px] text-[50px]'>{product[0].price}</span>
                            </p>
                            <p className="font-semibold text-gray-700 dark:text-gray-400 'md:text-[30px] text-[25px]">
                                {product[0].desc}
                            </p>
                            <NavLink to={`/`} className="w-[140px] text-[20px] p-3 justify-center inline-flex m-3 items-center  text-sm font-medium text-center text-black bg-[#ffe053] rounded-lg hover:bg-[#ffce2e] ">
                                Buy now!
                            </NavLink>
                        </div>

                    </div> : null
            }
            {
                Cookies.get("Role") === "Seller" &&
                <div className='pt-8 w-full flex justify-center'>
                <p
                    onClick={openModel}
                    className="inline-flex cursor-pointer m-3 text-[20px] p-3 items-center  text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 ">
                    Delete Product
                </p>
                <p
                    onClick={openupdtModel}
                    className="inline-flex cursor-pointer m-3 text-[20px] p-3 items-center  text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 ">
                    Update Product
                </p>
            </div>
            }

            {
                model &&
                <div className='absolute left-[30%] top-[15vh] bg-gray-200 p-8 rounded w-[40%]'>
                    <div className='text-[25px] font-bold pb-3'>Are you Sure</div>
                    <div className='text-[18px] font-semibold pb-3'>
                        Are you sure to remove this product from this plateform, enter your Seller ID here

                    </div>
                    <input
                        autoComplete="false"
                        autoSave="false"
                        aria-autocomplete="false"
                        type="text"
                        name="seller_id"
                        value={selled_id}
                        onChange={(e) => setSellerid(e.target.value)}
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter Seller ID"
                        required />
                    <div className='flex flex-row items-center justify-start'>
                        <div onClick={deleteProduct} className='mr-2 p-2 rounded bg-red-500 hover:bg-red-600 cursor-pointer text-white'>
                            Confirm
                        </div>
                        <div onClick={closeModel} className='mr-2 p-2 rounded bg-gray-800 hover:bg-gray-900 cursor-pointer text-white'>
                            Cancel
                        </div>
                    </div>
                </div>
            }
            {
                updateModel &&
                <div className='absolute left-[30%] top-[20vh] bg-gray-200 p-8 rounded w-[40%]'>
                    <div className='text-[25px] font-bold pb-3'>Update Prodyct Details</div>
                    <div className='text-[18px] font-semibold pb-3'>
                        Are you sure to remove this product from this plateform, enter your Seller ID here

                    </div>
                    <input
                        autoComplete="false"
                        autoSave="false"
                        aria-autocomplete="false"
                        type="text"
                        name="name"
                        value={productInfo.name}
                        onChange={inputhandle}
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter product name"
                        required />
                    <input
                        autoComplete="false"
                        autoSave="false"
                        aria-autocomplete="false"
                        type="text"
                        name="price"
                        value={productInfo.price}
                        onChange={inputhandle}
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter price"
                        required />
                    <input
                        autoComplete="false"
                        autoSave="false"
                        aria-autocomplete="false"
                        type="text"
                        name="desc"
                        value={productInfo.desc}
                        onChange={inputhandle}
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter description"
                        required />
                    <input
                        autoComplete="false"
                        autoSave="false"
                        aria-autocomplete="false"
                        type="text"
                        name="pic"
                        value={productInfo.pic}
                        onChange={inputhandle}
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter pic URL"
                        required />
                    <div className='flex flex-row items-center justify-start'>
                        <div onClick={updateProduct} className='mr-2 p-2 rounded bg-red-500 hover:bg-red-600 cursor-pointer text-white'>
                            Confirm
                        </div>
                        <div onClick={closupdteModel} className='mr-2 p-2 rounded bg-gray-800 hover:bg-gray-900 cursor-pointer text-white'>
                            Cancel
                        </div>
                    </div>
                </div>
            }





            <ToastContainer />
        </div>
    )

}



export default CardInfo