const { Listing, Agent } = require("./models.js");

const seed = async () => {
  await Listing.destroy({ where: {} });
  await Agent.destroy({ where: {} })

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

  const testAgent= await Agent.create({
    name: "test",
    password_digest: "$2b$11$ZGZRE4YBkpIz1.ylZAN3a.uLQ3FkzXYgxUr2.iHjrEMwFlm7k7Zka",
    description: "please delete this user after the development of the project is completed.",
    email: "bruh@bruh.bruh",
    phone: "123-456-7890",
    mobile: "314-159-2865"
  })

}


seed();
