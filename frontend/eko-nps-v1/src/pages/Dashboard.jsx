import React from 'react'
import NSSDetailedCard from '../components/individual-components/NSSDetailedCard'
import NSSAllCard from '../components/individual-components/NSSAllCard'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Dashboard = () => {
  return (
    <div>
    <div className='w-full p-4 border-t-2 border-b-2 flex justify-end items-center  z-[200] '>
        <LogoutOutlinedIcon />
    </div>
        <div className='p-4'>
        <NSSDetailedCard />
        </div>
        <div className='p-4'>
        <NSSAllCard />
        </div>
    </div>
  )
}

export default Dashboard