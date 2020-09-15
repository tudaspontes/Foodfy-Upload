
const Chefs = require("../models/Chefs")
const Recipes = require("../models/Recipes")

module.exports = {
    async index(req, res) {

        let results = await Chefs.all()
        const chefs = results.rows
            
        return res.render('chefs/index', { chefs });
        
    },
    async post(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all fields')
            }
        }
        
        let results = await Chefs.create(req.body)
        const chef = results.rows[0].id

        return res.redirect(`/chefs/${chef}`)

    },
    
    async create(req, res) {

        await res.render('chefs/create')
    },
    
    async show(req, res) {
        
        let results = await Chefs.find(req.params.id)
        const chef = results.rows[0]

        results = await Chefs.recipeInformations(req.params.id)
        const recipes = await results.rows[0]

        return res.render('chefs/show', { chef, recipes })
            
    },
    
    async edit(req, res) {
        
        let results = await Chefs.find(req.params.id)
        const chef = results.rows

        return res.render('chefs/edit', { chef })
        
    },
    
    async put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all fields')
            }
        }
        
        await Chefs.update(req.body)
        return res.redirect(`/chefs/${req.body.id}`)
        
    },
    
    async delete(req, res) {
        await Chefs.delete(req.body.id)
        return res.redirect('/chefs')
        
    },
}

