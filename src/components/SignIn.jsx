import { NavLink } from "react-router-dom"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie"
import { ContextAPI } from "../App";


const SignIn = () => {
    const {state, dispatch} = useContext(ContextAPI)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "", password: ""
    })

    const [check,setCheck] = useState(false)

    const inputhandle = (e) => {
        let { name, value } = e.target
        setUser((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const signIn = async (e) => {
        e.preventDefault()

        const { email, password } = user
        console.log(check)
        try {
            const res = await fetch(`https://crud-api-sooty.vercel.app/signin`, {
                mode: 'cors',
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),

            })
            // console.log(await res.json())
            const data = await res.json()
            if (res.status === 201) {
                setTimeout(() => navigate("/"), 3500)
                if(check) {
                    Cookies.set("Token", data.token)
                    Cookies.set("User", JSON.stringify({
                        name: data.user.name,
                        email: data.user.email
                    }))
                    Cookies.set("Role",data.user.role)
                    Cookies.set("seller_id", data.user.user_id)
                }
                dispatch({ type: "USER", payload: {
                    auth: true,
                    role: Cookies.get("Role")
                } })
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
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className='flex flex-col md:flex-row justify-center mx-auto p-16'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6"  method="POST" onSubmit={signIn}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                            autoComplete="false"
                            autoSave="false"
                            aria-autocomplete="false"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={inputhandle}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                            autoComplete="false"
                            autoSave="false"
                            aria-autocomplete="false"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={inputhandle}
                            placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input 
                                autoComplete="false" 
                                autoSave="false" 
                                aria-autocomplete="false" 
                                id="remember" 
                                type="checkbox" 
                                value={check} 
                                name="remember"
                                onChange={()=>setCheck(!check)} 
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <NavLink to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</NavLink>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div >

    )
}

export default SignIn