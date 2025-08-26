import express from 'express';
import conexao from '../infra/conexao.js'
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

app.get('/cursos', (req, res)=> {
    // res.status(200).send(cursos)
    const sql = "SELECT * FROM cursos;"
    conexao.query(sql, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200) .json(result)
        }
    })
})

//
app.post('/cursos', (req, res) => {
  const { disciplina } = req.body 

  if (!disciplina) { 
    return res.status(400).json({ erro: "Campo 'disciplina' é obrigatório" })
  }

  
  const sql = "INSERT INTO cursos (disciplina) VALUES (?)"
  conexao.query(sql, [disciplina], (error, result) => {
    if (error) {
      console.error("Erro ao inserir curso:", error)
      res.status(500).json({ erro: "Erro ao cadastrar curso" })
    } else {
      
      res.status(201).json({ id: result.insertId, disciplina })
    }
  })
})

//
app.get('/cursos/:id', (req, res) => {
  const { id } = req.params 

  const sql = "SELECT * FROM cursos WHERE id = ?"
  conexao.query(sql, [id], (error, results) => {
    if (error) {
      console.error("Erro ao buscar cursos:", error)
      res.status(500).json({ erro: "Erro ao consultar curso" })
    } else if (results.length === 0) {
      
      res.status(404).json({ msg: "Cursos não encontrado" })
    } else {
      res.status(200).json(results[0]) 
    }
  })
})

//
app.put('/cursos/:id', (req, res) => {
  const { id } = req.params            
  const { disciplina } = req.body      

  if (!disciplina) {
    return res.status(400).json({ erro: "Campo 'disciplina' é obrigatório" })
  }

  const sql = "UPDATE cursos SET disciplina = ? WHERE id = ?"
  conexao.query(sql, [disciplina, id], (error, result) => {
    if (error) {
      console.error("Erro ao atualizar cursos:", error)
      res.status(500).json({ erro: "Erro ao atualizar cursos" })
    } else if (result.affectedRows === 0) {
      
      res.status(404).json({ msg: "Cursos não encontrado" })
    } else {
      res.status(200).json({ id, disciplina }) 
    }
  })
})

// 
app.delete('/cursos/:id', (req, res) => {
  const { id } = req.params 

  const sql = "DELETE FROM cursos WHERE id = ?"
  conexao.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Erro ao excluir cursos:", error)
      res.status(500).json({ erro: "Erro ao excluir cursos" })
    } else if (result.affectedRows === 0) {
      res.status(404).json({ msg: "Cursos não encontrado" })
    } else {
      res.status(200).json({ msg: `Cursos ${id} excluído com sucesso!` })
    }
  })
})

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

