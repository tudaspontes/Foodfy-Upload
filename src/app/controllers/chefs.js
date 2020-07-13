
const Chefs = require("../models/Chefs")
const Recipes = require("../models/Recipes")

module.exports = {
    index(req, res) {

        Chefs.all(function(chefs){
            return res.render('chefs/index', { chefs });

        })        
        
    },
    
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all fields')
            }
        }
        
        Chefs.create(req.body, function(chef){
            return res.redirect(`/chefs/${chef.id}`)

        })
    },
    
    create(req, res) {
        res.render('chefs/create')
    },
    
    show(req, res) {
        
        Chefs.find(req.params.id, function(chef) {
            if(!chef) return res.send("chef not found!");

            Chefs.recipeInformations(req.params.id, function(recipes){
                return res.render('chefs/show', { chef, recipes })
            })
    
        })
            
    },
    
    edit(req, res) {
        
        Chefs.find(req.params.id, function(chef) {
            if(!chef) return res.send("chef not found!")

            return res.render('chefs/edit', { chef })
        })
    },
    
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all fields')
            }
        }
        
        Chefs.update(req.body, function(){
            return res.redirect(`/chefs/${req.body.id}`)
        })

    },
    
    delete(req, res) {
        Chefs.delete(req.body.id, function(){
            return res.redirect('/chefs')
        })
    },
}

