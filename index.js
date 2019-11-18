const express = require("express");

const server = express();

server.use(express.json());

const todo = ["Aprender NODE"];

// MIDDLEWARE LOCAL
// VERIFICA SE O ÍNDICE DA TAREA EXISTE
function checkTaskInArray(req, res, next) {
  if (!todo[req.params.index]) {
    return res.status(400).json({ error: "Task does not exists" });
  }

  return next();
}

// VERIFICA SE O NOME DA TAREFA ESPERADO ESTÁ CORRETO
function checkTaskExists(req, res, next) {
  if (!req.body.task) {
    return res.status(400).json({ error: "Task is required" });
  }
}

// LISTA TODAS TAREFAS
server.get("/todo", (req, res) => res.json(todo));

// LISTA UMA TAREFA
server.get("/todo/:index", (req, res) => {
  const { index } = req.params;
  return res.json(todo[index]);
});

// CRIAR TAREFA
server.post("/todo", checkTaskExists, (req, res) => {
  const { task } = req.body;

  todo.push(task);

  return res.json(todo);
});

// EDITAR NOME DA TAREFA
server.put("/todo/:index", checkTaskInArray, (req, res) => {
  const { index } = req.params;
  const { task } = req.body;

  todo[index] = task;

  return res.json(todo);
});

// DELETAR TAREFA
server.delete("/todo/:index", checkTaskInArray, (req, res) => {
  const { index } = req.params;

  todo.splice(index, 1);

  return res.send();
});

server.listen(3000);
