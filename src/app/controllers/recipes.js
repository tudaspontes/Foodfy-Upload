
const Recipes = require("../models/Recipes")

module.exports = {
    async index(req, res) {

        let results = await Recipes.all()
        const recipes = results.rows

        return res.render('admin/index', { recipes }); 
        
    },
    
    async post(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all fields')
            }
        }
        
        let results = await Recipes.create(req.body)
        const recipeID = results.rows[0].id

        return res.redirect(`/admin/recipes/${recipeID}`)

    },
    
    async create(req, res) {

        let results = await Recipes.chefsSelectOptions()
        const options = results.rows
        
        return res.render('admin/create', { chefOptions: options });
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

