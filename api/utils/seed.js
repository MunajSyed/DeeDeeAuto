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
                image: "https://i.ebayimg.com/00/s/NjQwWDQ4MA==/z/oZAAAOSww7NcwvDe/$_59.JPG",
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
                image: "https://i.ebayimg.com/00/s/NDgwWDM2MA==/z/w6kAAOSwZcZcxLNu/$_59.JPG",
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
                image: "https://i.ebayimg.com/00/s/NDgwWDQ4MA==/z/u-kAAOSwcCJcwvDd/$_59.JPG",
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
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/06-08_Toyota_RAV4_Limited.jpg/280px-06-08_Toyota_RAV4_Limited.jpg",
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
                image: "https://i.ebayimg.com/00/s/NDgwWDY0MA==/z/mpsAAOSw3GBcxLbJ/$_59.JPG",
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
                image: "https://i.ebayimg.com/00/s/NDgwWDQ4MA==/z/HSwAAOSwpo5cwvDe/$_59.JPG",
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