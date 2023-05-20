import { useState } from "react"
import Cookies from "js-cookie"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate()
    const [productInfo, setProductInfo] = useState({
        name: "", price: "", desc: "", pic: ""
    })

    const inputhandle = (e) => {
        let { name, value } = e.target
        setProductInfo((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        const auth_token = "token " + Cookies.get("Token")

        const { name, price, desc, pic } = productInfo

        console.log(auth_token, JSON.stringify({
            name,
            price: parseInt(price),
            desc,
            pic
        }))


        const res = await fetch("https://crud-api-sooty.vercel.app/products", {
            mode: 'cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "autherization": auth_token
            },
            body: JSON.stringify({
                name,
                price: parseInt(price),
                desc,
                pic
            })
        })
        const data = await res.json()
        if (res.status === 201) {
            setTimeout(() => navigate("/"), 3500)
            return toast.success(`${data.message}`, {
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
        else {
            return toast.error(`${data.message}`, {
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


    return (
        <div className='flex justify-center items-start pt-8 px-11 h-[100vh]'>
            <form className='w-[500px] bg-white border border-gray-200 rounded-lg shadow  p-8' method="POST" >
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input
                        value={productInfo.name}
                        name="name"
                        onChange={inputhandle}
                        autoCorrect='false'
                        aria-autocomplete='false'
                        type="text" id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pricing</label>
                    <input
                        value={productInfo.price}
                        name="price"
                        onChange={inputhandle}
                        autoCorrect='false'
                        aria-autocomplete='false'
                        type="text"
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input
                        value={productInfo.desc}
                        name="desc"
                        onChange={inputhandle}
                        autoCorrect='false'
                        aria-autocomplete='false'
                        type="text"
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pic URL</label>
                    <input
                        value={productInfo.pic}
                        name="pic"
                        onChange={inputhandle}
                        autoCorrect='false'
                        aria-autocomplete='false'
                        type="text"
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submitHandle}>Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Create