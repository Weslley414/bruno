import conexao from '../database/conexao.js'

// Controller de Cursos
class CursoController {
    // index(): Listar tudo
    index(req, res) {
        const sql = "SELECT * FROM cursos;"
        conexao.query(sql, (error, result) => {
            if (error) {
                console.log(error)
                res.status(500).json({ erro: "Erro ao consultar cursos" })
            } else {
                res.status(200).json(result)
            }
        })
    }

    // show(): Lista por id
    show(req, res) {
        const { id } = req.params

        const sql = "SELECT * FROM cursos WHERE id = ?"
        conexao.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erro ao buscar curso:", error)
                res.status(500).json({ erro: "Erro ao consultar curso" })
            } else if (results.length === 0) {
                res.status(404).json({ msg: "Curso não encontrado" })
            } else {
                res.status(200).json(results[0])
            }
        })
    }

    // store(): Criar dados
    store(req, res) {
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
    }

    // update(): Atualizar dados
    update(req, res) {
        const { id } = req.params
        const { disciplina } = req.body

        if (!disciplina) {
            return res.status(400).json({ erro: "Campo 'disciplina' é obrigatório" })
        }

        const sql = "UPDATE cursos SET disciplina = ? WHERE id = ?"
        conexao.query(sql, [disciplina, id], (error, result) => {
            if (error) {
                console.error("Erro ao atualizar curso:", error)
                res.status(500).json({ erro: "Erro ao atualizar curso" })
            } else if (result.affectedRows === 0) {
                res.status(404).json({ msg: "Curso não encontrado" })
            } else {
                res.status(200).json({ id, disciplina })
            }
        })
    }

    // delete(): Remover dados
    delete(req, res) {
        const { id } = req.params

        const sql = "DELETE FROM cursos WHERE id = ?"
        conexao.query(sql, [id], (error, result) => {
            if (error) {
                console.error("Erro ao excluir curso:", error)
                res.status(500).json({ erro: "Erro ao excluir curso" })
            } else if (result.affectedRows === 0) {
                res.status(404).json({ msg: "Curso não encontrado" })
            } else {
                res.status(200).json({ msg: `Curso ${id} excluído com sucesso!` })
            }
        })
    }
}

export default new CursoController()
