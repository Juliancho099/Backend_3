import { faker } from '@faker-js/faker';
import { hashPassword } from '../utils/passworUtils.js';

export const generateMockUsers = async (num) => {
    const users = [];

    for (let i = 0; i < num; i++) {
        const hashedPassword = await hashPassword("coder123");
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            age: faker.number.int({ min: 18, max: 70 }),
            carts: [],
            role: faker.helpers.arrayElement(["admin", "user"]),
            orders: null,
            created_at: new Date(),
        });
    }
    return users;
};
