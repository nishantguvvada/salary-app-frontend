'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export const DisplayResult = ({percentile}) => {
    const [maxSalary, setMaxSalary] = useState(0);
    const [avgSalary, setAvgSalary] = useState(0);
    const [peers, setPeers] = useState(0);

    useEffect(()=>{
        
        const fetchStats = async () => {

            const maxSal = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/maximumsalary`);

            setMaxSalary(maxSal.data.maximum);
            
            const avgSal = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/averagesalary`);

            setAvgSalary(avgSal.data.average);

            const contributors = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/totalusers`);

            setPeers(contributors.data.total)
            
        };

        fetchStats();

    }, []);

    return <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                <li className="w-full">
                    <button id="stats-tab" data-tabs-target="#stats" type="button" role="tab" aria-controls="stats" aria-selected="true" className="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Statistics</button>
                </li>
            </ul>
            <div className="border-t border-gray-200 dark:border-gray-600">
                <div className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
                    <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-4 dark:text-white sm:p-8">
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{percentile === undefined ? 0 : percentile}</dt>
                            <dd className="text-center font-bold dark:text-gray-400">Your Percentile</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{maxSalary === undefined ? 0 : maxSalary.toLocaleString('en-IN')}</dt>
                            <dd className="text-center text-gray-500 dark:text-gray-400">Maximum Salary</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{avgSalary === undefined ? 0 : avgSalary.toLocaleString('en-IN')}</dt>
                            <dd className="text-center text-gray-500 dark:text-gray-400">Average Salary</dd>
                        </div>
                         <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{peers === undefined ? 0 : peers.toLocaleString('en-IN')}</dt>
                            <dd className="text-center text-gray-500 dark:text-gray-400">Contributors (Peers)</dd>
                        </div>
                        {/*
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">90+</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Top Forbes companies</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Organizations</dd>
                        </div> */}
                    </dl>
                </div>
            </div>
        </div>
    </div>
    
}
