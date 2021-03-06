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
class Agent extends Model {}
class Image extends Model {}

Listing.init({
  address: Sequelize.STRING,
  address2: Sequelize.STRING,
  state: Sequelize.STRING(2),
  city: Sequelize.STRING,
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

Agent.init({
  name: Sequelize.STRING,
  password_digest: Sequelize.STRING,
  description: Sequelize.TEXT,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  mobile: Sequelize.STRING,
},{
  sequelize,
  modelName: 'agent'
})

Image.init({
  url: Sequelize.STRING,
  file_name: Sequelize.STRING,
  file_type: Sequelize.STRING
},{
  sequelize,
  modelName: 'image'
})

Listing.hasMany(Image, { onDelete: 'cascade' });
Image.belongsTo(Listing);

module.exports = {
  Listing,
  Agent,
  Image,
  sequelize
}
