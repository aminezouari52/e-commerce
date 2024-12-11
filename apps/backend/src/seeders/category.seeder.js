// require the necessary libraries
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { Category } = require("../models");
const slugify = require("slugify");
const config = require("../config/config");
const logger = require("../config/logger");

const documentNumbers = 4;

const images = [
  "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
  "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4862913/pexels-photo-4862913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

async function seedCategoryCollection() {
  let server;

  try {
    mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
      logger.info("Connected to MongoDB");
      server = app.listen(config.port, async () => {
        logger.info(`Listening to port ${config.port}`);

        await Category.collection.drop();

        let categories = [];

        for (let i = 0; i < documentNumbers; i++) {
          const name = faker.commerce.productAdjective();

          let newCategory = {
            name,
            slug: String(slugify(name)).toLocaleLowerCase(),
            image: images[i],
            categoryType: "parent",
            status: "yes",
            parent: null,
          };

          categories.push(newCategory);
        }

        await Category.collection.insertMany(categories);

        logger.info("Category model seeded! :)");

        server.close();
        process.exit();
      });
    });
  } catch (err) {
    console.log(err.stack);
  }
}

seedCategoryCollection();
