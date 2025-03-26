import { faker } from '@faker-js/faker';

export const generateMockProducts = (num) => {
    const products = [];

    for (let i = 0; i < num; i++) {
        products.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.alphanumeric(10),
            price: faker.commerce.price({ min: 5, max: 500, dec: 2 }),
            status: faker.datatype.boolean(),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.commerce.department(),
            thumbnails: [faker.image.url()],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    return products;
};
