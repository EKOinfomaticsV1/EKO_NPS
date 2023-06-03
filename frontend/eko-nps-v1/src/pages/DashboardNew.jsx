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

const DashboardNew = () => {

        const data02 = [
            { name: 'A1', value: 100 },
            { name: 'A2', value: 300 },
            { name: 'B1', value: 100 },
            { name: 'B2', value: 80 },
            { name: 'B3', value: 40 },
            { name: 'B4', value: 30 },
            { name: 'B5', value: 50 },
            { name: 'C1', value: 100 },
            { name: 'C2', value: 200 },
            { name: 'D1', value: 150 },
            { name: 'D2', value: 50 },
        ];
        
        const ratingData = {
            rating: '3.8',
            stars: 3,
            total: '67',
            _5: '90%',
            _4: '60%',
            _3: '50%',
            _2: '70%',
            _1: '30%',
        };

        const sentiments = {
            positive: '36%',
            satisfactory: '23%',
            negative: '31%',
            extreame: '41%',
        };

        const smallCardData = [
            {title: 'Surveyed', score: '23,050'},
            {title: 'Comments', score: '16,315'},
            {title: 'Alerts', score: '32'},
        ];

        const [ratingCardData, setRatingCardData] = useState();

        const [smallCardApiData, setSmallCardApiData] = useState();

        const [reviewsData, setReviewsData] = useState();

        const [alertData, setAlertData] = useState();
        
        
        useEffect(() => {
            axios.post(VITE_BASE_LINK + 'google/get_rating').then((response) => {
                // console.log(response?.data);
                setRatingCardData(response?.data?.data)
            })

            axios.post(VITE_BASE_LINK + 'google/net_cards').then((response) => {
                // console.log(response?.data);
                setSmallCardApiData(response?.data?.data)
            })

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
        <div className='w-full max-w-[99wv] overflow-hidden'>
            {/* header */}
            <div className='w-full p-4 border-t-2 border-b-2 flex justify-end items-center  z-[200] '>
                <LogoutOutlinedIcon />
            </div>
            <div className='w-full'>

                {/* calender div */}
                <div className='w-full pt-4 pb-2 pl-4 flex justify-start items-center'>
                    <div className='w-full max-w-[250px] rounded-[10px] border p-3 text-[14px] flex justify-center items-center gap-5 bg-[#00ac6a1d]'>
                        <span><EventIcon /></span> Jan 2023 - Nov 2023
                    </div>
                </div>

                {/* main cards */}
                <div className='w-full px-4 mt-2 pt-4 border-t'>
                    <div className='w-full grid grid-cols-[auto_[60%] xl:flex gap-4'>

                        {/* card 1 */}
                        <div className='w-full max-w-[350px] xl:max-w-[400px] flex items-center border-2 p-4 rounded-[10px]'>
                            <div className='w-full'>
                                <div>
                                    <h1 className='text-6xl'>{ratingCardData?.rating}</h1>

                                    {/* ratings */}
                                    <div className='flex'>
                                    {
                                            ratingCardData?.star === 1 ?
                                        <>
                                        <StarRoundedIcon className='text-yellow-600'/>
                                        <StarOutlineRoundedIcon className='' />
                                        <StarOutlineRoundedIcon className='' />
                                        <StarOutlineRoundedIcon className='' />
                                        <StarOutlineRoundedIcon className='' />
                                        </>
                                            :
                                            ratingCardData?.star === 2 ?
                                        <>
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        </>
                                            :
                                            ratingCardData?.star === 3 ?
                                        <>
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        </>
                                            :
                                            ratingCardData?.star === 4 ?
                                        <>
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarOutlineRoundedIcon />
                                        </>
                                            :
                                            ratingCardData?.star === 5 ?
                                        <>
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        <StarRoundedIcon className='text-yellow-600' />
                                        </>
                                            :
                                            null
                                        }
                                        
                                        {/* <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon /> */}
                                    </div>
                                    <h1 className='text-[13px] mt-5'>{ratingCardData?.total} total</h1>
                                </div>
                            </div>

                            {/*horizontal bar graph */}
                            <div className='w-full flex flex-col translate-x-[12%] justify-start items-start gap-2'>
                                <div className='w-full text-[13px] flex gap-2'><span>5</span><div className='bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200' style={{width: ratingCardData?._5}}></div></div>
                                <div className='w-full text-[13px] flex gap-2'><span>4</span><div className='bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200' style={{width: ratingCardData?._4}}></div></div>
                                <div className='w-full text-[13px] flex gap-2'><span>3</span><div className='bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200' style={{width: ratingCardData?._3}}></div></div>
                                <div className='w-full text-[13px] flex gap-2'><span>2</span><div className='bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200' style={{width: ratingCardData?._2}}></div></div>
                                <div className='w-full text-[13px] flex gap-2 pr-2'><span>1</span><div className='bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200' style={{width: ratingCardData?._1}}></div></div>
                            </div>
                        </div>

                        {/* card 2 */}
                        <NSSCard />

                        {/* card 3 */}
                        <div className='w-full row-start-2 col-start-1 col-end-3 grid grid-cols-3 gap-4 '>
                            {
                                smallCardApiData?.map((data, i) => (
                                    <div key={i} className='border-2 rounded-[10px] flex flex-col gap-4 justify-center items-center w-full'>
                                        <h1 className='text-sm text-gray-400 font-[500]'>{data?.title}</h1>
                                        {
                                            data?.title === 'Surveyed' ?
                                            <PollOutlinedIcon className='text-gray-500' />
                                            :
                                            data?.title === 'Comments' ?
                                            <CommentOutlinedIcon className='text-gray-500' />
                                            :
                                            data?.title === 'Alerts' ?
                                            <AddAlertOutlinedIcon className='text-gray-500' />
                                            :
                                            null
                                        }
                                        <h1 className='text-lg font-[600] text-gray-600'>{data?.value}</h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
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
                                        <h1 className='text-xs xl:pr-6'>{data?.review}</h1>
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
                                        <h1 className='text-xs xl:pr-6'>{data?.review}</h1>
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

                {/* bar chart */}
                <div className='w-full p-4'>
                    <NSSOverTime />
                </div>
            </div>
        </div>
    )
}

export default DashboardNew