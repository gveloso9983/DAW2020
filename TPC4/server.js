var http = require('http');
var fs = require('fs')
var url = require('url')

http.createServer(function (req, res) {
    var partes = req.url.split('/')
    var pag = partes[partes.length-1];
        console.log(pag)
        if(pag == 'arq2html.xsl'){
            fs.readFile('arq2html.xsl' ,function(err,data){
        
            if(err){  
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("Ficheiro "+ pag+ " Inexistente!!");
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/xsl'})
                res.write(data)
                res.end()
            }
        })
        }
        else{
        fs.readFile('dataset/arq' + pag +'.xml',function(err,data){
        
            if(err){  
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("Ficheiro "+ pag+ " Inexistente!!");
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/xml'})
                res.write(data)
                res.end()
            }
        }
        )}
    
}).listen(7777)

console.log('servidor à escuta na porta 7777...')