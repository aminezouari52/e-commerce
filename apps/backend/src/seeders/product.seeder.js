// require the necessary libraries
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Product = require("../models/product");
const Category = require("../models/category");
const slugify = require("slugify");
require("dotenv").config();

const documentNumbers = 20;

const colors = ["Black", "Brown", "Silver", "White", "Blue"];
const brands = ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"];

async function seedProductCollection() {
  let server;

  try {
    mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
      })
      .then(() => {
        server = app.listen(process.env.PORT, async () => {
          await Product.collection.drop();

          let products = [];

          for (let i = 0; i < documentNumbers; i++) {
            const title = faker.commerce.product();

            const colorIndex = Math.floor(Math.random() * colors.length);
            const brandIndex = Math.floor(Math.random() * brands.length);

            const categories = await Category.find();
            const categoriesIds = categories.map((category) => category._id);
            const categoryIndex = Math.floor(
              Math.random() * categoriesIds.length
            );
            const randomParam = Math.random();
            const gender = randomParam > 0.3 ? "male" : "female";
            const profileUrl = `https://xsgames.co/randomusers/avatar.php?g=${gender}&random=${randomParam}`;

            let newProduct = {
              title,
              slug: String(slugify(title)).toLocaleLowerCase(),
              description: faker.lorem.sentence(2),
              price: faker.number.int({ min: 1, max: 4999 }),
              category: categoriesIds[categoryIndex],
              subs: [],
              quantity: faker.number.int({ min: 1, max: 100 }),
              sold: faker.number.int({ min: 1, max: 100 }),
              images: [{ url: profileUrl }],
              shipping: faker.datatype.boolean() ? "Yes" : "No",
              color: colors[colorIndex],
              brand: brands[brandIndex],
              ratings: [],
              createdAt: faker.date.anytime(),
              updatedAt: faker.date.anytime(),
            };

            products.push(newProduct);
          }

          await Product.collection.insertMany(products);

          console.log("Product model seeded! :)");

          server.close();
          process.exit();
        });
      });
  } catch (err) {
    console.log(err.stack);
  }
}

seedProductCollection();
