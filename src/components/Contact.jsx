import contact from '../assets/contact.jpg'

const Contact = () => {
  return (
     <div className='flex flex-col md:flex-row justify-center mx-auto p-16'>
        <div className='flex justify-center items-center lg:text-[8vh] md:text-[6vh] text-[35px] md:w-[60%] w-auto'>
            <span className='lg:pl-0 pl-11'>
            Direct <span className='font-bold text-white bg-[#ff6d63] rounded p-2 hover:bg-[#fd584c] cursor-pointer'><a href="mailto:shreyopaul403@gmail.com">mail</a></span> us if getting trouble while visiting <span className='font-semibold'>Shopaul</span>
            </span>
        </div>
        <div>
        <img className="rounded-t-lg w-[650px]" src={contact} alt="" />

        </div>
    </div>
  )
}

export default Contact