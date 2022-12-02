import type { Request, Response } from "express";
import Shop from "../db/models/shop";

export async function createShop(req: Request, res: Response) {
  const { name, area, category, opening_date, closing_date } = req.body;
  try {
    const new_shop = await Shop.create({
      name,
      area,
      category,
      opening_date,
      closing_date,
    });
    res.status(200).json({
      success: true,
      message: "Shop added successfully",
      data: {
        shop: new_shop,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Unabe to add shop",
      data: null,
    });
  }
}

export async function getShops(req: Request, res: Response) {
  try {
    const shop_list = await Shop.find();
    res.status(200).json({
      success: true,
      message: "Fetched all shops.",
      data: {
        shop: shop_list,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Unabe to fetch shop",
      data: null,
    });
  }
}

export async function getShop(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const shop = await Shop.findOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Fetched shop for given id",
      data: {
        shop,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Unabe to fetch shop",
      data: null,
    });
  }
}

export async function updateShop(req: Request, res: Response) {
  const { shop_id, area, category, timming } = req.body;
  try {
    const query_result = await Shop.updateOne(
      { id: shop_id },
      {
        $set: {
          area,
          category,
          timming,
        },
      }
    );
    if (
      query_result.acknowledged &&
      query_result.matchedCount == 1 &&
      query_result.matchedCount == 1
    )
      return res.status(200).json({
        success: true,
        message: "Updated shop for given id.",
        data: null,
      });
  } catch (error) {}
}

export async function deleteShop(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const query_result = await Shop.deleteOne({ _id: id });
    if (query_result.acknowledged && query_result.deletedCount == 1)
      return res.status(200).json({
        success: true,
        message: "Deleted shop for given id.",
        data: null,
      });
    throw new Error("Unable to delete shop.");
  } catch (error) {
    if (error instanceof Error && error.name === "MongoError") {
      res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
}
