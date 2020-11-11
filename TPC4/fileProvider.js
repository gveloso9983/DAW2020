var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function (req, res) {
    console.log(req.method + "" + req.url)
    console.log(url.parse(req.url,true).query)
    console.log(url.parse(req.url,true).pathname)
    
    var num = req.url.split("/")[req.url.length-1]

    fs.readFile('pages/arq'+ num + '.html', function (err, data) {
        if(err){
            res.writeHead(200, {'Content-Type': 'text/html ; charset=utf-8'})
            res.write('Erro a ler o ficheiro pretendido')
            res.end()
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'})
           res.write(data)
            res.end()
        }
    })

    // if(req.url.match(/\/[1-]$/)){
    //     var num = req.url.split("/")[req.url.length-1];
    //     fs.readFile('pages/arq' + num +'.html', function(err, data){
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.write(data)
    //         res.end()
    //     });
    // }else{
    //     res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.write("Url doesnt match the expected")
    //         res.end()
    // }
}).listen(7777)
console.log('Server runing on port 7777')