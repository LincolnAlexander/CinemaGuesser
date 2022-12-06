import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieModal from './modals/MovieModal';

function WatchlistContainer()
{
const [list, setList] = useState([]);
let [maxPage, setMaxPage] = useState();
let [page, setPage] = useState(0);
const [login, setLogin] = useState(JSON.parse(localStorage.getItem('user_data')).login)
const [turnOn, setModal] = useState(false);

const[searchMovie, setSearchMovie] = useState('');

const[poster, setPoster] = useState(false);
const[year, setYear] = useState(false);
const[title, setTitle] = useState(false);
const [desc, setDesc] = useState(false);
const [boxOffice, setBoxOffice] = useState(false);
const [genre, setGenre] = useState(false);
const [actors, setActors] = useState(false);
const [source, setSource] = useState(false);
const [rating, setRating] = useState(0);
const [director, setDirector] = useState(false);
const [writer, setWriter] = useState(false);
const [runtime, setRuntime] = useState(false);
const [totalSeasons, setSeasons] = useState(false);
const [released, setRelease] = useState(false);
const [rated, setRated] = useState(false);

//load watchlist on render
useEffect(() => {
    loadWatchList();  
}, []);

const loadMovie = async (movie) => {
    //state page, per_number const, and only score
    let obj = {
        movie_requests: [movie]
    };

    let js = JSON.stringify(obj);
    try {
        let bp = require('./Paths.js');
        // 'https://cinema-guesser.herokuapp.com/api/movies_get'
        // bp.buildPath('api/movies_get')
        const response = await fetch(
        'https://cinema-guesser.herokuapp.com/api/movies_get',
        {
            method: 'POST',
            body: js,
            headers: { 'Content-Type': 'application/json' },
        }
        );

        let res = JSON.parse(await response.text());
        let movie = res.omdb[0];

        if (res.error && res.error !== '') {
            console.log(res.error);
        } else {
            setPoster(movie.Poster)
            setYear(movie.Year)
            setTitle(capitalize(movie.Title))
            setDesc(movie.Plot)
            setActors(movie.Actors)
            setRating(movie.Rating)
            setGenre(movie.Genre);
            setBoxOffice(movie.BoxOffice)
            if(!movie.BoxOffice)
                setBoxOffice("N/A");
            //movie source
            if(movie.Source === 'Internet Movie Database'){
                setRating(movie.Ratings);
                setSource("IMDB");
            }
            else if(movie.Source === 'Rotten Tomatoes'){
                setRating(movie.Ratings);
                setSource(movie.Source);
            }
            setDirector(movie.Director)
            setWriter(movie.Writer)
            setRuntime(movie.Runtime)
            setSeasons(movie.totalSeasons)
            setRelease(movie.Released)
            setRated(movie.Rated)
        }
    } catch (e) {
        console.log(e);
        return;
    }
}

const loadWatchList = async (event) => {
    const per_number = 10
    //state page, per_number const, and only score
    let obj = {
    page: page,
    per_page: per_number,
    login: login
    };
    console.log(page * per_number + " " + (page * per_number + per_number))
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

async function openModal(movie){
    await loadMovie(movie)
    setModal(true)
}
function closeRoundModal() {
    setModal(false);
}

const capitalize = (str, lower = false) =>
(lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());


// Write new api code here
async function searchList(movie)
{
    setSearchMovie(movie);
    console.log(movie);
}

return (
    <>
        {/*whole box that leaderboard will lay on*/}
        <div className='flex flex-col  m-8 md:m-10 min-h-[46rem]'>
        <div className='flex justify-center'>
            <input className='w-80 h-8 border-pr-white bg-slate-300 bg-opacity-20  backdrop-blur-sm rounded hover:border-2 focus:border-2 focus:outline-none text-pr-white pl-1' placeholder='Enter Movie to Seach' type = 'search' alt = "seach-bar" onChange={(e)=>{searchList(e.target.value)}} value = {searchMovie}></input>
        </div>
        {/*the actual table*/}
        <table className='w-screen sm:w-1/6 max-w-2xl bg-slate-500 bg-opacity-10 backdrop-blur-sm rounded-lg self-center mb-4 mt-10'>
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
                key={listItem}
                onClick = {() => openModal(listItem)}>

                {/*define data cell
                rank, first and last name, then score*/}
                <td className='text-md text-white font-medium px-4 py-4 whitespace-nowrap hover:cursor-pointer'>
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
        <MovieModal
        value={turnOn}
        closeRoundModal={closeRoundModal}
        poster = {poster}
        title = {title}
        year = {year}
        desc = {desc}
        boxOffice = {boxOffice}
        source = {source}
        actors = {actors}
        genre = {genre}
        rating = {rating}

        director = {director}
        writer = {writer}

        runtime = {runtime}
        totalSeasons = {totalSeasons}
        released = {released}

        rated = {rated}
      />
    </>
    );
}

export default WatchlistContainer;