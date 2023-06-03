import React, { useEffect, useState } from 'react'
import Sidebar from '../components/global-components/Sidebar'
import eko_logo from '../assets/icons/eko_logo.png'
import EventIcon from '@mui/icons-material/Event';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer } from 'recharts';
import NSSCard from '../components/individual-components/NSSCard';
import reviewData from '../helpers/reviewsTableData.json'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import axios from 'axios';
import { VITE_BASE_LINK } from '../../baseLink';
import NSSOverTime from '../components/individual-components/NSSOvertime';
import PositiveIcon from "../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../assets/img/NPS Dashboard/Extreme.svg";
import NeutralIcon from "../assets/img/NPS Dashboard/Neutral.svg";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const ReviewsTablePage = () => {

    const [reviewsData, setReviewsData] = useState();

    const [alertData, setAlertData] = useState();

    useEffect(() => {

        axios.post(VITE_BASE_LINK + 'google/all_comments').then((response) => {
            // console.log(response?.data);
            setReviewsData(response?.data)
        })

        axios.post(VITE_BASE_LINK + 'google/all_alerts').then((response) => {
            // console.log(response?.data);
            setAlertData(response?.data)
        })
    }, [])


    return (
        <div>
            <div className='w-full p-4 border-t-2 border-b-2 flex justify-end items-center  z-[200] '>
                <LogoutOutlinedIcon />
            </div>

            {/* comments & alerts */}
            <div className='w-full p-4'>

                {/* comments */}
                <div className='w-full border rounded-[10px]'>
                    <div className='w-full p-4'>
                        <h1 className='text-md'>Comments</h1>
                    </div>

                    {/* table heading */}
                    <div className='w-[98%] mx-auto grid grid-cols-[80px_150px_auto_150px_150px] border-b pb-2'>
                        <h1 className='text-xs text-gray-600 font-[500]'>Date</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Name</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Review</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Rating</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Sentiment</h1>
                    </div>


                    {/* table data */}
                    <div className='w-full px-4 max-h-[300px] overflow-y-scroll'>
                        {
                            reviewsData?.map((data, i) => (
                                <div key={i} className='w-full grid grid-cols-[80px_150px_auto_150px_150px] py-4 border-b'>
                                    <h1 className='text-xs'>{data?.date}</h1>
                                    <h1 className='text-xs'>{data?.name}</h1>
                                    <h1 className='text-xs pr-6'>{data?.review}</h1>
                                    <h1 className='text-xs pl-5'>{data?.rating}</h1>
                                    <h1 className='text-xs pl-5'>{
                                        data?.sentiment === 'Positive' ?
                                            <img src={PositiveIcon} alt="Positive" className="w-[20px]" />
                                            :
                                            data?.sentiment === 'Neutral' ?
                                                <img src={NeutralIcon} alt="Neutral" className="w-[20px]" />
                                                :
                                                data?.sentiment === 'Negative' ?
                                                    <img src={NegativeIcon} alt="Negative" className="w-[20px]" />
                                                    :
                                                    data?.sentiment === 'Extreme' ?
                                                        <img src={ExtremeIcon} alt="Extreme" className="w-[20px]" />
                                                        :
                                                        null
                                    }</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>


                {/* alerts */}
                <div className='w-full border rounded-[10px] mt-4'>
                    <div className='w-full p-4'>
                        <h1 className='text-md'>Alerts</h1>
                    </div>

                    {/* table heading */}
                    <div className='w-[98%] mx-auto grid grid-cols-[80px_150px_auto_150px_150px] border-b pb-2'>
                        <h1 className='text-xs text-gray-600 font-[500]'>Date</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Name</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Review</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Rating</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Sentiment</h1>
                    </div>


                    {/* table data */}
                    <div className='w-full px-4 max-h-[300px] overflow-y-scroll'>
                        {
                            alertData?.map((data, i) => (
                                <div key={i} className='w-full grid grid-cols-[80px_150px_auto_150px_150px] py-4 border-b'>
                                    <h1 className='text-xs'>{data?.date}</h1>
                                    <h1 className='text-xs'>{data?.name}</h1>
                                    <h1 className='text-xs pr-6'>{data?.review}</h1>
                                    <h1 className='text-xs pl-5'>{data?.rating}</h1>
                                    <h1 className='text-xs pl-5'>{
                                        data?.sentiment === 'Positive' ?
                                            <img src={PositiveIcon} alt="Positive" className="w-[20px]" />
                                            :
                                            data?.sentiment === 'Neutral' ?
                                                <img src={NeutralIcon} alt="Neutral" className="w-[20px]" />
                                                :
                                                data?.sentiment === 'Negative' ?
                                                    <img src={NegativeIcon} alt="Negative" className="w-[20px]" />
                                                    :
                                                    data?.sentiment === 'Extreme' ?
                                                        <img src={ExtremeIcon} alt="Extreme" className="w-[20px]" />
                                                        :
                                                        null
                                    }</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsTablePage