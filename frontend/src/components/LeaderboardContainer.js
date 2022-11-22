import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LeaderboardContainer() {
  const [list, setList] = useState([]);
  useEffect(() => {
    loadLeaderboard();
  }, []);

  const [page, setPage] = useState(0);
  const colNames = ['Rank', 'Name', 'Score'];
  //   let list = [{
  //     "Rank":"1",
  //     "Name":"Lufy",
  //     "Score":"123"
  // },];
  const loadLeaderboard = async (event) => {
    let obj = {
      page: page,
      per_page: 10,
      sortby: 'Score',
    };
    let js = JSON.stringify(obj);
    try {
      let bp = require('./Paths.js');
      // 'https://cinema-guesser.herokuapp.com/api/leaderboard'
      // bp.buildPath('api/leaderboard')
      const response = await fetch(
        'https://cinema-guesser.herokuapp.com/api/leaderboard',
        {
          method: 'POST',
          body: js,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      // console.log(res.value);
      let res = JSON.parse(await response.text());

      setList(res.list);

      // console.log( res);

      for (let i = 0; i < 10; i++) {
        list.push({ 'Rank': '1', 'Name': 'Lufy', 'Score': '123' });
        list.map({ 'Rank': '1', 'Name': 'Lufy', 'Score': '123' });
      }
      // console.log(name);
      console.log(list);

      //store refreshed token (has accessToken field)
      // storage.storeToken(res.jwtToken);

      if (res.error !== '') {
        // setMessage('Username is taken, please try a different one.');
      } else {
        // setMessage('');
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

  function combineNames(firstName, lastName) {
    // let name = res.list[0].FirstName + " "+res.list[0].LastName.substring(0, 1).toUpperCase();
  }

  return (
    <>
      <div className='flex justify-center m-20 '>
        <div className='flex justify-center flex-col'>
          <table className='table-fixed w-1/2 bg-slate-500 bg-opacity-10 backdrop-blur-sm rounded-md self-center'>
            <thead className='text-left bg-slate-500 bg-opacity-5 backdrop-blur-sm'>
              <tr className='text-pr-yellow text-lg'>
                {colNames.map((headerItem, index) => (
                  <th key={index}>{headerItem}</th>
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
              {/* First Try */}
              {Object.values(list).map((obj, index) => (
                <tr key={index}>
                  {Object.values(obj).map((value, index2) => (
                    <td key={index2}>{value}</td>
                  ))}
                </tr>
              ))}
              {/* Second Try */}
              {list.map((element, index) => (
                <tr key={index}>
                  <td>{element.Rank}</td>
                  <td>{element.Name}</td>
                  <td>{element.Score}</td>
                </tr>
              ))}
              {list.map((listItem) => (
                <tr
                  className='border-b bg-gray-800 border-gray-900'
                  key={listItem.Login}
                >
                  <td className='text-sm text-white font-medium px-6 py-4 whitespace-nowrap'>
                    {listItem.FirstName}
                  </td>
                  <td className='text-sm text-white font-medium px-6 py-4 whitespace-nowrap'>
                    {listItem.LastName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LeaderboardContainer;
