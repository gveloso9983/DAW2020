    var http = require('http')
const axios = require('axios')

http.createServer(function (req, res) {
    
    console.log(req.method + ' ' + req.url);

    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
            res.write('<h2> Escola de Música </h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos"> Lista de Alunos </a> </li>')
            res.write('<li><a href="/instrumentos"> Lista de Instrumentos </a> </li>')
            res.write('<li><a href="/cursos"> Lista de Cursos </a> </li>')
            res.write('</ul>')
        //Lista de Alunos    
        } else if(req.url == '/alunos'){
            axios.get('http://localhost:3000/alunos')
            .then( resp => {
                var alunos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                res.write('<h2> Escola de Música: Lista de Alunos </h2>')
                res.write('<ul>')
                alunos.forEach( a => {
                    res.write('<li><a href="/alunos/'+a.id+'">' + a.id + ' - ' + a.nome + '</a></li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/"> Voltar </a>]</address>')
                    
                // if(!req.url == '/alunos?_page=1'){
                //     xres.write('<address>[<a href=""> Página Anterior </a>]</address>')
                //     xres.write('<address>[<a href=""> Página Seguinte </a>]</address>')
                // } else if(req.url == '/alunos?_page=1'){
                //     xres.write('<address>[<a href=""> Página Seguinte </a>]</address>')
                // }
                
                res.end()
            }).catch(error => {
                console.log('Erro na obtenção da lista de alunos')
            })
        
            //Lista de Cursos
        } else if(req.url == '/cursos'){
            axios.get('http://localhost:3000/cursos')
            .then( resp => {
                var cursos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                res.write('<h2> Escola de Música: Lista de Cursos </h2>')
                res.write('<ul>')
                cursos.forEach( c => {
                    res.write('<li> <a href="/cursos/'+c.id+'">' + c.id + ' - ' + c.designacao + '</a></li>')
                    
                    if(req.url =='/cursos/'+c.id){
                        axios.get('http://localhost:3000/cursos/'+c.id)
                        .then(ans =>{
                            ans.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                            ans.write('<h2>Curso</h2>')
                            ans.write('Nome do Curso' + c.designacao)
                            res.write('<address>[<a href="/cursos"> Voltar </a>]')
                        })           
                    }
                });
                res.write('</ul>')
                res.end()
            }).catch(error => {
                console.log('Erro na obtenção da lista de cursos')
            })
            
            
        
            //Lista de Instrumentos
        } else if(req.url == '/instrumentos'){
            axios.get('http://localhost:3000/instrumentos')
            .then( resp => {
                var instrumentos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                res.write('<h2> Escola de Música: Lista de Instrumentos </h2>')
                res.write('<ul>')
                let prop = '#text'
                let map= instrumentos.map(x => x[prop])
               
                var u = 0
                instrumentos.forEach( i => {
                    res.write('<li>' + i.id + ' - ' +  map[u] + '</li>')
                    u += 1
                });

                res.write('</ul>')
                res.write('<address>[<a href="/"> Voltar </a>]')
                res.end()
            }).catch(error => {
                console.log('Erro na obtenção da lista de instrumentos')
            })
        // }else if(req.url == "/cursos/" ) {
        //     axios.get('http://localhost:3000/cursos/' + id)
        //     .then( resp => {
        //         res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
        //         res.write('<h2> Curso </h2>')
        //         res.write('<ul>')
        //     })
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write('Pedido nao suportado: ' + req.method + " " + req.url + " .") 
            res.end()
        }
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('Pedido nao suportado: ' + req.method + " " + req.url + " .")
        res.end()
    }
}).listen(4000)

console.log('Listening on 4000')