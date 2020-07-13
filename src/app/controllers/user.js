const Recipes = require("../models/Recipes")
const Chefs = require("../models/Chefs")

module.exports = {

    index(req, res) {

        const { filter } = req.query

        if (filter) {
            Recipes.findby(filter, function(recipes) {
                return res.render('./user/index', { recipes, filter });
            });

        } else {
            
        Recipes.all(function(recipes){
            return res.render('./user/index', { recipes });
            });
        }

    },

    about(req, res) {

        return res.render('./user/about');
    },

    recipes(req, res) {

        const { filter } = req.query

        if (filter) {
            Recipes.findby(filter, function(recipes) {
            return res.render('./user/recipes', {recipes, filter});
            })

        } else {
        Recipes.all(function(recipes){
            return res.render('./user/recipes', {recipes});
        });

        }
        
    },

    recipe(req, res) {
        const id = req.params.id;

        res.render('./user/recipe');
    },
    chefs(req,res) {
        
        Chefs.all(function(chefs){
            return res.render('.user/chefs', { chefs });

        })        
    }
}