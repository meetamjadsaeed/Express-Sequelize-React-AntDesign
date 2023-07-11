const connection = require("../config/db.config");
const Sequelize = require("sequelize");


const products = connection.sequelize.define("product", {
    // image: {
    //     type: Sequelize.STRING(191),
    // },
    title: {
        type: Sequelize.STRING(191),
    },
    price: {
        type: Sequelize.STRING(20),
    },
    description: {
        type: Sequelize.STRING(191),
    },

})


module.exports = {
    products,
};
