import React, { useEffect } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import eko_logo from '../../assets/icons/eko_logo.png'
import { Link, useLocation, useParams } from 'react-router-dom';

const Sidebar = () => {

    const location = useLocation()

    useEffect(() => {
        console.log(location)
    }, [])


    return (
        <div className='w-full max-w-[200px] fixed border-2 h-screen'>

            <div className='w-full'>
                <div className='w-full'>
                    <div className='w-full flex justify-center items-center h-[100px]'>
                        <img src={eko_logo} className='w-full max-w-[100px]' alt="" />
                    </div>
                </div>
                <div className='relative mb-6 pl-4 mt-[20px]'>
                    <Link to='/'><h1 className={`w-full text-md  pt-2`}>Google Reviews</h1></Link>
                    <Link to='/sentiments'><h1 className={`text-sm text-gray-500 px-2 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-800 mr-2 my-1 ${location?.pathname?.includes('/sentiments') ? ' border-r-[3px] border-[var(--secondary-color)]' : ''}`}>Sentiments</h1></Link>
                    <Link to='/comments'><h1 className={`text-sm text-gray-500 px-2 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-800 mr-2 my-1 ${location?.pathname?.includes('/comments') ? ' border-r-[3px] border-[var(--secondary-color)]' : ''}`}>Comments</h1></Link>
                </div>

                <div className='w-full relative pl-4'>
                    <h1 className='w-full text-md '>NPS Dashboard</h1>
                    <h1 className={`text-sm text-gray-500 px-2 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-800 mr-2 my-1 ${location?.pathname?.includes('/google-sentiments') ? ' border-r-[3px] border-[var(--secondary-color)]' : ''}`}>Sentiments</h1>
                    <h1 className={`text-sm text-gray-500 px-2 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-800 mr-2 my-1 ${location?.pathname?.includes('/google-comments') ? ' border-r-[3px] border-[var(--secondary-color)]' : ''}`}>Comments</h1>
                </div>

            </div>
        </div>
    )
}

export default Sidebar