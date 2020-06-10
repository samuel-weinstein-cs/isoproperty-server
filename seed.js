const { Listing, Agent, Image, About } = require("./models.js");

const seed = async () => {
  await Listing.destroy({ where: {} });
  await Agent.destroy({ where: {} });
  // await Image.destroy({ where: {} });
  await About.destroy({ where: {} });

  const aboutData = await About.create({
    text:
    `ISO Property's approach to business is unique. It's not just about buying or selling real estate; it is about trust, it is about the way we conduct our business that makes us different from our competitors and makes our customers return to us again and again. We are committed to providing you with a personal and professional service, underpinned by a committed approach to getting the job done with honesty and integrity.

    Buying or selling your home is one of the most financially important decisions you will ever encounter. We strive to alleviate any uncertainties and concerns you have during the process. Please feel free to contact us to discuss your real estate needs.

    Broker cooperation always welcomed.

    Member of the National Association of REALTORS
    Member of New York State Association of REALTORS
    Member of the Hudson Gateway Association of REALTORS`
  })

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
