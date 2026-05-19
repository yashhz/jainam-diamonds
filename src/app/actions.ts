"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const configPath = path.join(process.cwd(), "data/config.json");
const productsPath = path.join(process.cwd(), "data/products.json");

export async function getConfig() {
  try {
    const data = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(data);
  } catch (err: any) {
    return {};
  }
}

export async function updateConfig(newValues: any) {
  try {
    const current = await getConfig();
    const updated = { ...current, ...newValues };
    fs.writeFileSync(configPath, JSON.stringify(updated, null, 2));
    revalidatePath("/", "layout");
    return { success: true, config: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Clean filename and add timestamp
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${Date.now()}-${cleanName}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);
    
    return { success: true, url: `/uploads/${fileName}` };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getProducts() {
  try {
    if (!fs.existsSync(productsPath)) return {};
    const data = fs.readFileSync(productsPath, "utf-8");
    return JSON.parse(data);
  } catch (err: any) {
    return {};
  }
}

export async function updateProducts(newProducts: any) {
  try {
    fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, 2));
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
