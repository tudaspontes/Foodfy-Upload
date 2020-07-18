
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
    
    create(req, res) {
        
        Recipes.chefsSelectOptions(function(options) {
           return res.render('admin/create', { chefOptions: options})

        })
    },
    
    show(req, res) {
        
        Recipes.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("recipe not found!")

            return res.render('admin/show', { recipe })
        })
    },
    
    edit(req, res) {
        
        Recipes.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("recipe not found!");
        
        Recipes.chefsSelectOptions(function(options) {
            return res.render('admin/edit', { recipe, chefOptions: options});
            });
 
        });
    },
    
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all fields')
            }
        }
        
        Recipes.update(req.body, function(){
            return res.redirect(`/recipes/${req.body.id}`)
        })

    },
    
    delete(req, res) {
        Recipes.delete(req.body.id, function(){
            return res.redirect('/admin/recipes')
        })
    },
}

