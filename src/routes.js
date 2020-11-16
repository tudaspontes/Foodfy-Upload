const express = require('express')
const user = require('./app/controllers/user')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const multer = require('./app/middlewares/multer')

const routes = express.Router()

// users routes

routes.get('/', user.index);
routes.get('/about', user.about);
routes.get('/recipes', user.recipes);
routes.get('/recipes/:id', user.recipe);

// admin routes

routes.get('/admin/recipes', recipes.index);
routes.get('/admin/recipes/create', recipes.create);
routes.get('/admin/recipes/:id', recipes.show);
routes.get('/admin/recipes/:id/edit', recipes.edit);

routes.post('/admin', multer.array("photos", 5), recipes.post);
routes.put('/admin', multer.array("photos", 5), recipes.put);
routes.delete('/admin', recipes.delete);

// chefs routes

routes.get('/chefs', chefs.index)
routes.get('/chefs/create', chefs.create);
routes.get('/chefs/:id', chefs.show);
routes.get('/chefs/:id/edit', chefs.edit);

routes.post('/chefs', multer.array("photos", 5), chefs.post);
routes.put('/chefs', multer.array("photos", 5), chefs.put);
routes.delete('/chefs', chefs.delete);
// routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
// routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
// routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
// routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

// routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

module.exports = routes