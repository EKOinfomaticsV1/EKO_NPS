import React, { useEffect } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import eko_logo from '../../assets/icons/eko_logo.png'
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link, useLocation, useParams } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';

const Sidebar = () => {

    const location = useLocation()

    useEffect(() => {
        console.log(location)
    }, [])


    return (
        <div className='w-full max-w-[200px] fixed bg-sky-50 h-screen'>

            <div className='w-full'>
                <div className='w-full'>
                    <div className='w-full flex justify-center items-center h-[100px]'>
                        <img src={eko_logo} className='w-full max-w-[100px]' alt="" />
                    </div>
                </div>
                <div className='relative mb-6 pl-4 mt-[20px]'>
                    <Link to='/' className='flex items-center gap-2'><GoogleIcon fontSize='small' className='text-sky-600' /><h1 className={`w-full transition-all duration-200 ease-out ${location?.pathname === '/' ? ' border-r-[5px] border-[var(--secondary-color)]' : ''} text-md  `}>Google Reviews</h1></Link>
                    <Link to='/sentiments' className='w-full flex items-center gap-2'><HexagonOutlinedIcon fontSize='extraSmall' className='scale-75 ml-2 text-sky-600' /><h1 className={`w-full text-sm text-gray-500 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-80 my-3 transition-all duration-200 ease-out ${location?.pathname?.includes('/sentiments') ? ' border-r-[5px] border-[var(--secondary-color)]' : ''}`}>Sentiments</h1></Link>
                    <Link to='/comments' className='w-full flex items-center gap-2'><HexagonOutlinedIcon fontSize='extraSmall' className='scale-75 ml-2 text-sky-600' /><h1 className={`w-full text-sm text-gray-500 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-80 my-3 transition-all duration-200 ease-out ${location?.pathname?.includes('/comments') ? ' border-r-[5px] border-[var(--secondary-color)]' : ''}`}>Comments</h1></Link>
                </div>

                <div className='w-full relative pl-4'>
                    <Link to='/nps-dashboard' className='flex items-center gap-2'><CampaignIcon fontSize='medium' className='text-sky-600' /><h1 className={`w-full transition-all duration-200 ease-out ${location?.pathname?.includes('nps-dashboard') ? ' border-r-[5px] border-[var(--secondary-color)]' : ''} text-md  `}>NPS Dashboard</h1></Link>
                    <Link to='/nps-sentiments' className='flex items-center gap-2'><HexagonOutlinedIcon fontSize='extraSmall' className='scale-75 ml-2 text-sky-600' /><h1 className={`w-full text-sm text-gray-500 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-80 my-3 transition-all duration-200 ease-out ${location?.pathname?.includes('/nps-sentiments') ? ' border-r-[5px] border-[var(--secondary-color)]' : ''}`}>Sentiments</h1></Link>
                    <Link to='/nps-comments' className='flex items-center gap-2'><HexagonOutlinedIcon fontSize='extraSmall' className='scale-75 ml-2 text-sky-600' /><h1 className={`w-full text-sm text-gray-500 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-80 my-3 transition-all duration-200 ease-out ${location?.pathname?.includes('/nps-comments') ? ' border-r-[5px] border-[var(--secondary-color)]' : ''}`}>Comments</h1></Link>
                </div>

            </div>
        </div>
    )
}

export default Sidebar