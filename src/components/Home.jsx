import { useState, useEffect } from "react"
import Card from "./Card"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate()
    const [product, setProducts] = useState([])


    const fetchProducts = async () => {
        try {
            const res = await fetch(`https://crud-api-sooty.vercel.app/products`, {
            method: "GET",
            headers: {
                autherization: Cookies.get("Role") +" " + Cookies.get("Token")
            }
        })
        let data = await res.json()
        if (data.data) setProducts(data.data)

        if (res.status === 401) {
            
            navigate("/signin")
        }
        } catch (error) {
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
        fetchProducts()
    }, [])


    return (
        <div className=" flex items-start justify-between mx-auto p-16 flex-wrap">

            {
                product && product.map((card, key) => {
                    return (
                        <Card pic={card.pic} key={key} card={card}/>
                    )
                })
            }
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Home