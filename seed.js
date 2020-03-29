const { Listing } = require("./models.js");

const seed = async () => {
  await Listing.destroy({ where: {} });

  const listing1 = await Listing.create({
    address: "88 Jefferson Road",
    address2: "",
    state: "NJ",
    city: "Lambertville",
    zip: "08530",
    price: 400000,
    rental: false,
    size: 4000,
    bedrooms: 4,
    neighborhood: "Music Mountain",
    description: "Nice Place I guess"
  })

}

seed();
