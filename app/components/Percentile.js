"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DisplayResult } from './DisplayResult';


export const Percentile = () => {

    const [salary, setSalary] = useState();
    const [result, setResult] = useState(0);
    const [token, setToken] = useState();

    useEffect(() => {

        const localStorageToken = localStorage.getItem("token");
        setToken(localStorageToken);

    },[]);
    


    const refreshPage = () => {

        setResult(0);

    }


    async function fetchPercentile(e) {

        try {// every function causing a render should have preventDefault()
            e.preventDefault(); // without it the page re-renders causing the result to be wiped out within seconds
            const response = await axios.post(
                `${BACKEND_URL}/percentile`,
                {value: salary});
            const percentile = response.data;
            setResult(percentile.result);
            
        } catch(err) {

            alert("Error while fetching data!");

        }
    }

    return <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 text-center dark:text-white">Enter your salary</h2>
        <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                    <input onChange={(e) => {setSalary(e.target.value)}} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="INR 700000" required=""/>
                </div>
                {/* <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                    <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required=""/>
                </div>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="">Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                    <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required=""/>
                </div> 
                <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                </div> */}
            </div>
            <div className="grid grid-cols-6 place-content-around">
                <div className="col-start-1 col-span-1 ">
                    <button onClick={fetchPercentile} type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Submit
                    </button>
                </div>
                <div className="col-start-6 col-span-6 flex justify-end" href={"/percentile"}>
                    <button onClick={refreshPage} type="button" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-cyan rounded-lg focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:bg-cyan-800">
                        Refresh
                    </button>
                </div>
            </div>
        </form>
    </div>
    <DisplayResult percentile={result}/>
    {token === null ? <p className="text-center">Contribute to the database by becoming a peer!<a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> (Sign up)</a></p> : null}
  </section>
}
