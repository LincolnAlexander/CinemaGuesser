import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LeaderboardContainer()
{
    let res;
    useEffect(() =>
      {
      loadLeaderboard();
        },[]);

    const [page,setPage] = useState(0);
    const colNames = ['Rank', 'Name', 'Score'];
    let list = [];
    const loadLeaderboard = async(event) => 
    {
      
      let obj = {
        page: page,
        per_page: 10,
        sortby: 'Score'
        
      };
      let js = JSON.stringify(obj);
      try 
      {
        let bp = require('./Paths.js');
        // 'https://cinema-guesser.herokuapp.com/api/leaderboard'
        // bp.buildPath('api/leaderboard')
        const response = await fetch('https://cinema-guesser.herokuapp.com/api/leaderboard', {
          method: 'POST',
          body: js,
          headers: { 'Content-Type': 'application/json' },
        });
        // console.log(res.value);
        res = JSON.parse(await response.text());
        
        console.log( res);
        let name = res.list[0].FirstName + " "+res.list[0].LastName.substring(0, 1).toUpperCase();
        
        
        for(let i = 0; i < 10; i++)
        {
          let n = {
          Rank: 1,
          Name: 'Test',
          Score: 1,
          }
          list.push(n);
        }
        console.log(name);
        console.log(list);
        

        //store refreshed token (has accessToken field)
        // storage.storeToken(res.jwtToken);
        
        if (res.error !== '') {
          // setMessage('Username is taken, please try a different one.');
        } else {
          
          
          // setMessage('');
          
        }
      } 
      catch (e) 
      {
        console.log(e);
        return;
      }

      
    }

    return(
        <>
            <div className='flex justify-center m-20 '>
                <div className='flex justify-center '>
                    <table className='table-fixed w-1/2 bg-slate-500 bg-opacity-10 backdrop-blur-sm rounded-md'>
                        <thead className='text-left bg-slate-500 bg-opacity-5 backdrop-blur-sm' >
                            <tr className='text-pr-yellow text-lg'>
                                {colNames.map((headerItem, index) =>(
                                  <th key = {index}>
                                    {headerItem}
                                  </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='text-left text-pr-white'>
                            <tr>
                                <th className=''>a</th>
                                <th>b</th>
                                <th>c</th>
                            </tr>
                            <tr>
                                <th className=''>a</th>
                                <th>a</th>
                                <th>s</th>
                            </tr>
                            <tr>
                                <th className=''>f</th>
                                <th>g</th>
                                <th>b</th>

                            </tr>
                            {/* {Object.values(list).map((obj,index) =>(
                              <tr key = {index}>
                                {Object.values(obj).map((value,index2) =>(
                                  <td key = {index2}>{value}</td>
                                ))}
                              </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </>
    )
}

export default LeaderboardContainer;