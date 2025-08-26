import app from './src/app.js'

import conexao from './infra/conexao.js'

const port = 3000

// //  Estabelecer a conexao
// conexao.connect((error) => {
//     if (error) {
//         console.log('Erro ao conectar com o banco de dados:', error)
//         return
//     } else {
//         console.log('Conexão com o banco de dados estabelecida com sucesso!')
//     }
// })

// // Listening (Escutando)
// app.listen(port, () => {
//     console.log(`servidor rodando em http://localhost:${port}`)
// })

// Listening (Escutando)
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})