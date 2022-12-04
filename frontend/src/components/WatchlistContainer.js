import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function WatchlistContainer()
{
const [list, setList] = useState([]);
let [maxPage, setMaxPage] = useState();
let [page, setPage] = useState(0);
const [login, setLogin] = useState(JSON.parse(localStorage.getItem('user_data')).login)

//load watchlist on render
useEffect(() => {
    loadWatchList();  
}, []);
const loadWatchList = async (event) => {
    const per_number = 10
    //state page, per_number const, and only score
    let obj = {
    page: page,
    per_page: per_number,
    login: login
};

let js = JSON.stringify(obj);
try {
    let bp = require('./Paths.js');
    // 'https://cinema-guesser.herokuapp.com/api/get_watchlist'
    // bp.buildPath('api/get_watchlist')
    const response = await fetch(
    bp.buildPath('api/get_watchlist'),
    {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
    }
    );

    let res = JSON.parse(await response.text());
    console.log(res);

    if (res.error && res.error !== '') {
    console.log(res.error);
    } else {
    setMaxPage(Math.ceil(res.total_length/ per_number));
    setList(res.list);
    }
} catch (e) {
    console.log(e);
    return;
}
};
//subtract 1 to page unless you're at page 0
function prevPage(e)
{
    //no browser reload or refresh on button click
    e.preventDefault();

    if(page === 0)
    {
        return;
    }
    else
    {
        //subtract 1 page then reload leaderboard
        setPage(page = page - 1);
        loadWatchList();
    }
}
//move to next page
function nextPage(e)
{
    //no browser reolad or refresh on button click
    e.preventDefault();
    //if 1 page before max page value, don't move
    if(page === maxPage - 1) 
    {
        return;
    }
    else
    {
        //add to page then reload leaderboard
        setPage(page = page + 1);
        loadWatchList();
    }
}

const capitalize = (str, lower = false) =>
(lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
;

return (
    <>
        {/*whole box that leaderboard will lay on*/}
        <div className='flex flex-col justify-between m-8 md:m-20 min-h-[46rem]'>
        {/*the actual table*/}
        <table className='w-screen sm:w-1/3 max-w-2xl bg-slate-500 bg-opacity-10 backdrop-blur-sm rounded-lg self-center mb-4'>
            {/*the above header for the table*/}
            <thead className='text-left bg-slate-500 bg-opacity-5 backdrop-blur-sm'>
            {/*Must be used at least once for thead, defines the values of the row*/}
            <tr className='text-pr-yellow text-xl'>
                {/*w is default width, sm is size on small screens, rounded-tl-lg is rounded corners?*/}
                <th className='w-20 sm:w-20 px-4 py-4 rounded-tl-lg'>Title</th>
            </tr>
            </thead>

            {/*The content of the tables from list state*/}
            <tbody className='text-left text-pr-white'>
            {/*sequentially add items to rows*/}
            {list.map((listItem, idx) => (
                //logic for borders only appearing in between data and hover, tr is row of cells
                <tr
                className='last:rounded-b-lg last:border-b-0 hover:bg-pr-black hover:bg-opacity-70 border-b border-pr-white border-opacity-10'
                key={listItem}>

                {/*define data cell
                rank, first and last name, then score*/}
                <td className='text-md text-white font-medium px-4 py-4 whitespace-nowrap'>
                    {capitalize(listItem)}
                    
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {/*button logic, define outside table so it doesn't move?*/}
        <div className='self-center '>
            {/* <button className = 'mr-5'onClick={prevPage}><img className = '' src = {leftArrow} alt = 'left-arrow'></img></button> */}
            {/*left button*/}
            <button
            className='m-4 bg-pr-yellow text-pr-black hover:bg-pr-yellow hover:text-pr-white w-12 h-12 rounded-3xl cursor-pointer outline-none'
            onClick={prevPage}
            >
            {/*the arrows and button position*/}
            <span className='leading-[1.2rem] text-3xl font-normal'>←</span>

            {/*right button*/}
            </button>
            {/* <button  onClick={nextPage  }> <img className = '' src = {rightArrow} alt = 'right-arrow'></img> </button> */}
            <button
            className='m-4 bg-pr-yellow text-pr-black hover:bg-pr-yellow hover:text-pr-white w-12 h-12 rounded-3xl cursor-pointer outline-none'
            onClick={nextPage}
            >
            <span className='leading-[1.2rem] text-3xl font-normal'>→</span>
            </button>
        </div>
        
        </div>
    </>
    );
}

export default WatchlistContainer;