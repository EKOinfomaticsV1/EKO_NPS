import React from 'react'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const SecondaryHeader = () => {

    const logout = () => {
        localStorage?.clear();
        navigate('/login');
    }

    return (
        <div className='w-full p-4 border-t-2 border-b-2 flex justify-end items-center  z-[200] text-sky-600'>
            <span onClick={logout} className='cursor-pointer'><LogoutOutlinedIcon /></span>
        </div>
    )
}

export default SecondaryHeader