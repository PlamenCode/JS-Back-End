const http = require('http');
const fs = require('fs/promises');
const querystring = require('querystring');
const { renderHome } = require('./render');


http.createServer(async (req, res) => {
    let [pathname, qs] = req.url.split('?');
    let params = querystring.parse(qs);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if(req.url == '/styles/site.css'){
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });

        let siteCss = await fs.readFile('./styles/site.css', 'utf-8');
        res.write(siteCss);
    } else if(req.url == '/cats/addCat'){
        let addCatPage = await fs.readFile('./views/addCat.html', 'utf-8');
        res.write(addCatPage);
    } else if(req.url == '/'){
        let homePage = await renderHome(params.name);
        res.write(homePage)
    };
    res.end();
 
}).listen(5000, () => console.log('Server is listening on port 5000...'));