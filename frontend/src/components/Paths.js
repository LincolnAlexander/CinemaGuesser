//change this later
const app_name = 'cinemaguesser'
//hi
exports.buildPath = 
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.xyz' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}