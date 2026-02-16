import conexao from '../database/conexao.js'

class CursoRepository {
    findAll() {
        return new Promise((resolve, reject) => {
            conexao.query("SELECT * FROM cursos;", (error, results) => {
                if (error) reject(error)
                else resolve(results)
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            conexao.query("SELECT * FROM cursos WHERE id = ?", [id], (error, results) => {
                if (error) reject(error)
                else resolve(results)
            })
        })
    }

    create(disciplina) {
        return new Promise((resolve, reject) => {
            conexao.query("INSERT INTO cursos (disciplina) VALUES (?)", [disciplina], (error, result) => {
                if (error) reject(error)
                else resolve({ id: result.insertId, disciplina })
            })
        })
    }

    update(id, disciplina) {
        return new Promise((resolve, reject) => {
            conexao.query("UPDATE cursos SET disciplina = ? WHERE id = ?", [disciplina, id], (error, result) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            conexao.query("DELETE FROM cursos WHERE id = ?", [id], (error, result) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }
}

export default new CursoRepository()
