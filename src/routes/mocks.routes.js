import { Router } from "express";
import { generateMockProducts } from "../utils/generateProducts.js";
import { generateMockUsers } from "../utils/generateUsers.js";
import { User } from "../dao/models/user.model.js";
import { productosModel } from "../dao/models/product.model.js";

export const mocksRouter = Router();

mocksRouter.get("/mockingProducts", (req, res) => {
    try {
        const mockProducts = generateMockProducts(10);
        res.json({ status: 'success', data: mockProducts });
    } catch (error) {
        console.error("Error al generar productos mockeados:", error);
        res.status(500).json({ status: 'error', message: 'Error al generar productos mockeados' });
    }
});

mocksRouter.get("/mockingUsers", async (req, res) => {
    try {
        const mockUsers = await generateMockUsers(50);
        if (!mockUsers || mockUsers.length === 0) {
            return res.status(500).json({ status: 'error', message: 'No se generaron usuarios' });
        }
        res.json({ status: 'success', data: mockUsers });
    } catch (error) {
        console.error("Error al generar usuarios mockeados:", error);
        res.status(500).json({ status: 'error', message: 'Error al generar usuarios mockeados' });
    }
});


mocksRouter.post("/generateData", async (req, res) => {
    try {
        const { users, products } = req.body;
        if (!users || !products) {
            return res.status(400).json({ status: 'error', message: 'Faltan datos' });
        }

        const mockUsers = await generateMockUsers(users);
        const mockProducts = generateMockProducts(products);

        console.log("Usuarios mockeados:", mockUsers);
        console.log("Productos mockeados:", mockProducts);

        await User.insertMany(mockUsers);
        await productosModel.insertMany(mockProducts);
        res.json({ status: 'success', message: 'Datos generados correctamente' });
    } catch (error) {
        console.error("Error al generar datos:", error);
        res.status(500).json({ status: 'error', message: 'Error al generar datos' });
    }
});
