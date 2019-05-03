'use strict';

const { model: User } = require('../routes/users/userModel');
const { model: Car } = require('../routes/cars/carModel');
const { model: Dealer } = require('../routes/dealers/dealerModel');

exports.truncate = async () => {
    await User.deleteMany();
    await Car.deleteMany();
    await Dealer.deleteMany();

};

exports.seed = async () => {
    try {
        const userData = [
            {
                email: 'admin@admin.com',
                password: 'admin',
            },
        ];
        const userPromises = userData.map(async (data) => {
            try {
                const user = new User(data);
                return await user.save();
            } catch (e) {
                throw e;
            }
        });
        await Promise.all(userPromises);

        const carData = [
            {
                image: "https://www.kijiji.ca/v-cars-trucks/cambridge/2010-audi-a5-coupe-2-0l-premium-low-113kms-auto-awd-cert/1422308513",
                make: "Audi",
                year: 2010,
                model: "A5",
                km: 113000,
                color: "Grey",
                transmission: "4 wheel drive (4x4)",
                gearBox: "Automative",
                condition: "Second Hand",
                bodyType: "Coupe (2 door)",
                price: 12995,
                sale: 10000,
                isSold: false,
                createdBy: "admin"
            },
            {
                image: "https://www.kijiji.ca/v-cars-trucks/cambridge/2012-mercedes-benz-c-class-c-250-awd-certified/1429585414",
                make: "Mercedes Benz",
                year: 2012,
                model: "C-Class",
                km: 154000,
                color: "White",
                transmission: "4 wheel drive (4x4)",
                gearBox: "Automative",
                condition: "Second Hand",
                bodyType: "Sedan",
                price: 12995,
                sale: 10000,
                isSold: false,
                createdBy: "admin"
            },
            {
                image: "https://www.kijiji.ca/v-cars-trucks/cambridge/2008-bmw-3-series-328i-convertible-coupe-low-kms/1421990163",
                make: "BMW",
                year: 2008,
                model: "3-Series",
                km: 131000,
                color: "black",
                transmission: "Rear drive wheels",
                gearBox: "Automative",
                condition: "Second Hand",
                bodyType: "Coupe",
                price: 14995,
                sale: 10000,
                isSold: false,
                createdBy: "admin"
            },
            {
                image: "https://www.kijiji.ca/v-cars-trucks/cambridge/2006-toyota-rav4-sport-suv-awd-certified/1429585401",
                make: "Toyota",
                year: 2006,
                model: "RAV4",
                km: 185000,
                color: "Grey",
                transmission: "4 X 4",
                gearBox: "Automative",
                condition: "Second Hand",
                bodyType: "SUV",
                price: 7495,
                sale: 10000,
                isSold: false,
                createdBy: "admin"
            },
            {
                image: "https://www.kijiji.ca/v-cars-trucks/cambridge/2013-scion-fr-s-manual-6speed-87kms-certified/1428497307",
                make: "Scion",
                year: 2013,
                model: "Other",
                km: 87000,
                color: "White",
                transmission: "Rear drive wheels",
                gearBox: "Automative",
                condition: "Second Hand",
                bodyType: "Coupe",
                price: 14995,
                sale: 10000,
                isSold: false,
                createdBy: "admin"
            },
            {
                image: "https://www.kijiji.ca/v-cars-trucks/cambridge/2012-audi-a5-2-0l-premium-s-line-package-awd-auto-certified/1421617118",
                make: "Audi",
                year: 2012,
                model: "A5",
                km: 139000,
                color: "Black",
                transmission: "4 X 4",
                gearBox: "Automative",
                condition: "Second Hand",
                bodyType: "Coupe",
                price: 15495,
                sale: 10000,
                isSold: false,
                createdBy: "admin"
            },
        ];

        const carPromises = carData.map(async (data) => {
            try {
                const car = new Car(data);
                return await car.save();
            } catch (e) {
                throw e;
            }
        });
        await Promise.all(carPromises);

        const dealerData = [
            {
                name: "DeeDee Automotive",
                email: "musa@gmail.com",
                phone: "289-233-2120",
                streetNumber: 710,
                streetName: "Franklin Blvd",
                city: "Cambridge",
                province: "Ontario",
                postalCode: "N1R7Z1",
                description: "Great auto shop",
                createdBy: "admin",
            },
        ];
        const dealerPromises = dealerData.map(async (data) => {
            try {
                const dealer = new Dealer(data);
                return await dealer.save();
            } catch (e) {
                throw e;
            }
        });
        await Promise.all(dealerPromises);
        console.log('Seeding completed.');
    } catch (e) {
        console.error('Seeding failed...');
        throw e; // This `throw` will be caught in the server.js file
    }
};