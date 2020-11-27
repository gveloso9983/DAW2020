var http = require('http')
var axios = require('axios')
var fs = require('fs')
var static = require('./static')
var {parse} = require('querystring')


function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

function geraPagTarefas( tarefas, d){
    let pagHTML = `
      <html>
          <head>
              <title>Lista de tarefas</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="favicon.png"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
              <div class="w3-container w3-teal">
                  <h2>Lista de Tarefas</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Responsável</th>
                      <th>Missão</th>
                      <th>Tipo</th>
                  </tr>
    `
    tarefas.forEach( t => {
        pagHTML +=`
        <tr>
          <td><a href="/tarefas/${t.id}"> ${t.responsavel} </a></td>
          <td>${t.missao}</td>
          <td>${t.tipo}</td>
          </tr>
        `
    })
    pagHTML += `
          </table>
          <div class="w3-container w3-teal">
              <address>Gerado por Gonçalo em ${d} --------------</address>
          </div>
      </body>
      </html>
    `
    return pagHTML
  }
  
  function geraPagTarefasFeitas( tarefas, d){
      let pagHTML = `
        <html>
            <head>
                <title>Lista de Tarefas Feitas</title>
                <meta charset="utf-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body>
                <div class="w3-container w3-teal">
                    <h2>Lista de Tarefas</h2>
                </div>
                <table class="w3-table w3-bordered">
                    <tr>
                        <th>Responsável</th>
                        <th>Missão</th>
                        <th>Tipo</th>
                    </tr>
      `
      tarefas.forEach( t => {
          pagHTML +=`
          <tr>
            <td><a href="/tarefas/${t.id}"> ${t.responsavel} </a></td>
            <td>${t.missao}</td>
            <td>${t.tipo}</td>
            </tr>
          `
      })
      pagHTML += `
            </table>
            <div class="w3-container w3-teal">
                <address>Gerado por Gonçalo em ${d} --------------</address>
            </div>
        </body>
        </html>
      `
      return pagHTML
    }
    
  //Gera página individual de tarefas
  function geraPagTarefa( tarefa, d ){
    return `
    <html>
    <head>
        <title>Aluno: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${tarefa.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Responsável </b> ${tarefa.responsavel}</li>
                    <li><b>Missão </b> ${tarefa.missao}</li>
                    <li><b>Tipo </b> ${tarefa.tipo}</a></li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

function geraFormTarefa( d ){
    return `
    <html>
       
        <body> 

            <div class="w3-container w3-teal">
                <h2>Registo de uma Tarefa</h2>
            </div>

            <form class="w3-container" action="/" method="POST">
                <label class="w3-text-teal"><b>Responsável</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">
          
                <label class="w3-text-teal"><b>Número / Identificador</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id">

                <label class="w3-text-teal"><b>Missao</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="missao">

                <label class="w3-text-teal"><b>Tipo de Tarefa</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="tipo">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( tarefa, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${tarefa.id} inserido</h1>
            </header>

            <div class="w3-container">
                <p><a href="/">Voltar à página principal.</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

  

var toDoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }
    else{
    switch(req.method){
        case "GET": 
            // GET /tarefas --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tarefas")){
                //Request nr 1 
                let one = "http://localhost:3000/tarefas?_sort=nome"
                const req1 = axios.get(one)
                //Request nr 2
                let two = "http://localhost:3000/tarefasFeitas?_sort=nome"
                const req2  = axios.get(two)
                axios.all([req1,req2])
                    .then(axios.spread((...responses) => {
                        var resp1 = responses[0]
                        var resp2 = responses[1]
                        var tarefas = resp1.data
                        var tarefasFeitas = resp2.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagTarefas(tarefas, d))
                        res.write(geraPagTarefasFeitas(tarefasFeitas, d))
                        res.write(geraFormTarefa(d))
                        res.end()
                    }))
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas...")
                        res.end()
                    })
            }
            //GET /tarefas/:id --------------------------------------------------------------------
            else if(/\/tarefas\/[0-9]+$/.test(req.url)){
                var idTarefa = req.url.split("/")[2]
                axios.get("http://localhost:3000/tarefas/" + idTarefa)
                    .then( response => {
                        let t = response.data
                        
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagTarefa(t, d))
                        res.end()
                       
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas...")
                        res.end()
                    })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        
        case "POST":
            recuperaInfo(req, resultado => {
                console.log('POST de tarefa:' + JSON.stringify(resultado))
                axios.post('http://localhost:3000/tarefas', resultado)
                    .then(resp => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPostConfirm( resp.data, d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Erro no POST: ' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
            })
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
        }
    }
})


toDoServer.listen(7779)
console.log('Servidor à escuta na porta 7779...')