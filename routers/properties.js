import express from "express";
import Property from "../models/Property.js";
import verifyMiddleWare from "./verifyMiddleWare.js";
import cloudinary from "../utils/cloudinary.js";
import mappedData from "../extractXlsx.js";
const app = express();

app.use(express.json());
const router = express.Router();

router.post("/add", verifyMiddleWare, async (req, res) => {
  try {
    const {
      propertyId,
      price,
      images,
      yearBuilt,
      type,
      category,
      agent,
      area,
      size,
      floor,
      isLastFloor,
      finishing,
      rooms,
      reception,
      bathrooms,
      meters,
      elevators,
      notes,
    } = req.body;

    const newProperty = new Property({
      creatorId: req.user.id,
      propertyId: propertyId.toUpperCase(),
      price: parseInt(price),
      images: images.map((image) => ({
        url: image.url,
        public_id: image.public_id,
      })),
      yearBuilt: parseInt(yearBuilt),
      type: type,
      category: category,
      agent: agent,
      area: area,
      size: parseInt(size),
      floor: parseInt(floor),
      isLastFloor: isLastFloor,
      finishing: finishing,
      rooms: parseInt(rooms),
      reception: parseInt(reception),
      bathrooms: parseInt(bathrooms),
      meters: meters,
      elevators: parseInt(elevators),
      notes: notes,
    });

    await newProperty.save();
    console.log(newProperty);
    res
      .status(200)
      .json({ success: true, message: "property Created Succefully" });
  } catch (err) {
    res.json({
      success: false,
      message:
        "error creating property: please enter all the required fields: " + err,
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    const properties = await Property.find({});
    return res.status(200).json({
      success: true,
      message: "Properties Fetched Succefully",
      properties: properties.map((property) => {
        return {
          _id: property._id,
          propertyId: property.propertyId,
          price: property.price,
          images: property.images,
          category: property.category,
          area: property.area,
          size: property.size,
          rooms: property.rooms,
          bathrooms: property.bathrooms,
        };
      }),
    });
  } catch (err) {
    res.json({ success: true, message: "Couldn't Fetch Properties: " + err });
  }
});
router.delete("/del/:id", verifyMiddleWare, async (req, res) => {
  console.time("deleting Property");
  try {
    const { deletedImages } = req.body;
    if (deletedImages && deletedImages.length != 0) {
      for (const public_id of deletedImages) {
        await cloudinary.uploader.destroy(public_id);
      }
    }
    const delPropertyId = req.params.id;
    await Property.findByIdAndDelete(delPropertyId);
    res.json({ success: true, message: "property deleted succefully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "err deleting property: " + err });
  }
  console.timeEnd("deleting Property");
});
router.put("/edit/:id", async (req, res) => {
  try {
    const {
      propertyId,
      price,
      images,
      yearBuilt,
      type,
      category,
      agent,
      area,
      size,
      floor,
      isLastFloor,
      finishing,
      rooms,
      reception,
      bathrooms,
      meters,
      elevators,
      notes,
      deletedImages,
    } = req.body;
    if (deletedImages && deletedImages.length != 0) {
      for (const public_id of deletedImages) {
        await cloudinary.uploader.destroy(public_id);
      }
    }
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, {
      propertyId: propertyId.toUpperCase(),
      price,
      images: images.map((image) => ({
        url: image.url,
        public_id: image.public_id,
      })),
      yearBuilt,
      type,
      category,
      agent,
      area,
      size,
      floor,
      isLastFloor,
      finishing,
      rooms,
      reception,
      bathrooms,
      meters,
      elevators,
      notes,
    });
    res.json({ success: true, message: "updated Succefully" });
  } catch (err) {
    res.json({ success: false, message: "err updating property: " + err });
  }
});
router.get("/show/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId.toUpperCase();
    console.log(propertyId);
    const property = await Property.findOne({ propertyId: propertyId });
    console.log(property);
    if (property && property !== null) {
      res.json({
        success: true,
        message: "found property",
        property: property,
      });
    } else {
      res.status(200).json({ success: false, message: "404 Not Found" });
    }
  } catch (err) {
    res.json({ success: false, message: err });
  }
});
router.get("/download", async (req, res) => {
  const properties = await Property.find({});
  res.json({
    success: true,
    message: "all Properties fetched",
    properties: properties,
  });
});
// const uploadExcel = async () => {
//   mappedData.map(async (property) => {
//     console.log('Property data:', property);

//     const agent = property.agent ? property.agent.trim() : "Unknown Agent";

//     const type = property.type && (property.type.trim() === 'إيجار' || property.type.trim() === 'تمليك')
//       ? property.type.trim()
//       : "تمليك";

//     const finishing = property.finishing ? property.finishing.trim() : "غير متوفر";

//     const newProperty = new Property({
//       propertyId: property.propertyId.toUpperCase(),
//       price: isNaN(property.price) ? property.price : parseInt(property.price),
//       images: property.images || [],
//       yearBuilt: property.yearBuilt === "غير متوفر" ? property.yearBuilt : parseInt(property.yearBuilt),
//       type: type,
//       category: property.category,
//       agent: agent,
//       area: property.area,
//       size: isNaN(property.size) ? property.size : parseInt(property.size),
//       floor: property.floor,
//       isLastFloor: property.isLastFloor,
//       finishing: finishing,
//       rooms: isNaN(property.rooms) ? property.rooms : parseInt(property.rooms),
//       reception: isNaN(property.reception) ? property.reception : parseInt(property.reception),
//       bathrooms: isNaN(property.bathrooms) ? property.bathrooms : parseInt(property.bathrooms),
//       meters: property.meters,
//       elevators: isNaN(property.elevators) ? property.elevators : parseInt(property.elevators),
//       notes: property.notes,
//     });

//     await newProperty.save();
//   });
// };

// uploadExcel();

export default router;
