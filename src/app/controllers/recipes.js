const Recipes = require("../models/Recipes")
const Files = require("../models/Files")
const Recipe_files = require('../models/Recipe_files')


module.exports = {
    async index(req, res) {

        let results = await Recipes.all()
        const recipes = results.rows

        return res.render('admin/index', { recipes }); 
        
    },

    async create(req, res) {

        let results = await Recipes.chefsSelectOptions()
        const options = results.rows
        
        return res.render('admin/create', { chefOptions: options });
    },
    
    async post(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all fields')
            }
        }

        if (req.files.lenght == 0)
            return res.send('Please, send at least one image!')
        
        let results = await Recipes.create(req.body)
        const recipeID = results.rows[0].id

        const filesPromise = req.files.map(files => Recipe_files.create({...files, recipeID: recipeID}))
        await Promise.all(filesPromise)

        return res.redirect(`/admin/recipes/${recipeID}`)

    },
    
    async show(req, res) {
        
        
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]

        return res.render('admin/show', { recipe });
    },
    
    async edit(req, res) {
        
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]

        results = await Recipes.chefsSelectOptions()
        const options = results.rows

        return res.render('admin/edit', { recipe, chefOptions: options});
    },
    
    async put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all fields')
            }
        }

        await Recipes.update(req.body)
        
        return res.redirect(`/recipes/${req.body.id}`)
    },
    
    async delete(req, res) {
        await Recipes.delete(req.body.id)
            return res.redirect('/admin/recipes')
    }
}

