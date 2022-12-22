const db = require("../models");

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imgBase64 ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML
      ) {
        resolve({ errCode: 1, message: "Missing parameter" });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imgBase64,
          descriptionMarkdown: data.descriptionMarkdown,
          descriptionHTML: data.descriptionHTML,
        });
        resolve({ errCode: 0, message: "Create speacialty success" });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let speacialties = await db.Specialty.findAll({
        nested: true,
        raw: true,
      });
      if (speacialties && speacialties.length > 0) {
        speacialties.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
        });
        resolve({ errCode: 0, data: speacialties });
      } else {
        resolve({ errCode: 2, data: {} });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createSpecialty,
  getAllSpecialty,
};
