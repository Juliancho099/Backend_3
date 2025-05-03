import { __baseUrl } from "./__dirname.js"
export const swaggerConfig ={
    definition:{
        openapi: "3.0.1",
        info: {
            title: "Ecommerce API",
            version: "1.0.0",
            description: "API para el proyecto de ecommerce",
        },
    },
    apis: [`${__baseUrl}/src/docs/*.yaml`],
}