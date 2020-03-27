const { Sequelize, Model } = require("sequelize");

let sequelize;
if(process.env.DATABASE_URL){
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    define: {
      underscored: true
    }
  })

}else {
  sequelize = new Sequelize({
    database: "isoproperty",
    dialect: "postgres",
    define: {
      underscored: true
    }
  })
}

class Listing extends Model {}

Listing.init({
  address: Sequelize.STRING,
  address2: Sequelize.STRING,
  state: Sequelize.STRING(2),
  zip: Sequelize.STRING(5),
  price: Sequelize.INTEGER,
  rental: Sequelize.BOOLEAN,
  size: Sequelize.INTEGER,
  bedrooms: Sequelize.INTEGER,
  neighborhood: Sequelize.STRING,
  description: Sequelize.TEXT
},{
  sequelize,
  modelName: 'listing'
})

module.exports = {
  Listing,
  sequelize
}
