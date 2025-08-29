import express from 'express';
import conexao from './app/database/conexao.js'
import CursoController from './app/controllers/CursoController.js';
const app = express()

//indicar para o express ler o body como json

app.use(express.json())

// const cursos = [
//     {id: 1, disciplina: "ADS"},
//     {id: 2, disciplina: "ADS"},
//     {id: 3, disciplina: "ADS"},
//     {id: 4, disciplina: "ADS"},
// ]

// Retorna um objeto
function buscarCursosPorId(id) {
    return cursos.filter(cursos => cursos.id == id)
}

// Retorna um index
function buscarIndexCurso(id) {
    return cursos.findIndex(cursos => cursos.id == id)
}

// Criando uma rota default
// app.get('/', (req, res)=> {
//     res.send('Hello Wesley')
// })

// ROTAS

app.get('/cursos',CursoController.index)

//
app.post('/cursos',CursoController.index)
  

//
app.get('/cursos/:id',CursoController.index)
  

//
app.put('/cursos/:id',CursoController.index)


// 
app.delete('/cursos/:id',CursoController.index)
  

app.post('/cursos', (req, res)=> {
    cursos.push(req.body)
    res.status(200).send('Seleção cadastrada com sucesso!')
})

app.get('/cursos/:id', (req, res)=> {
    //let index = req.params.id
    //console.log(index)
    res.json(buscarCursosPorId(req.params.id))
    
})


// app.delete('/cursos/:id', (req, res)=> {
//     let index = BuscarIndexCurso(req.params.id)
//     console.log(index)
    
// })

app.delete('/cursos/:id',(req,res)=>{
    
    let index = buscarIndexCurso(req.params.id)
    cursos.splice(index,1)
    console.log(index)
    res.send(` o curso com id ${req.params.id} excluído com sucesso!`)
   

})

app.put('/cursos/:id',(req,res)=>{
    let index = buscarIndexCurso(req.params.id)
    cursos[index].disciplina=req.body.disciplina
    res.json(cursos)
    })


export default app

