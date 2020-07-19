const Recipes = require("../models/Recipes")
const Chefs = require("../models/Chefs")

module.exports = {

    async index(req, res) {
        
        const { filter } = req.query

        if (filter) {
            Recipes.findby(filter, function(recipes) {
                return res.render('./user/index', { recipes, filter });
            });

        } else {

            let results = await Recipes.all()
            const recipes = results.rows
            return res.render('./user/index', { recipes });
    
        }

    },
    async about(req, res) {

        await res.render('./user/about');
    },
    async recipes(req, res) {

        const { filter } = req.query

        if (filter) {
            Recipes.findby(filter, function(recipes) {
            return res.render('./user/recipes', {recipes, filter});
            })

        } else {

            let results = await Recipes.all()
            const recipes = results.rows
            return res.render('./user/recipes', {recipes});
        }        
    },
    async recipe(req, res) {
        const id = req.params.id;

        await res.render('./user/recipe');
    },
    async chefs(req,res) {
        
        let results = await Chefs.all()
        const chefs = results.rows
        return res.render('.user/chefs', { chefs });
    }
}