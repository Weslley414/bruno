// src/controllers/CursoController.js
export default {
  buscarTodos: (req, res) => {
    res.json([{ id: 1, nome: "Curso de Node.js" }]);
  },
  buscarPorId: (req, res) => {
    const { id } = req.params;
    res.json({ id, nome: "Curso de Node.js" });
  },
  criar: (req, res) => {
    res.status(201).json({ mensagem: "Curso criado!" });
  },
  atualizar: (req, res) => {
    const { id } = req.params;
    res.json({ mensagem: `Curso ${id} atualizado!` });
  },
  deletar: (req, res) => {
    const { id } = req.params;
    res.json({ mensagem: `Curso ${id} deletado!` });
  }
};
