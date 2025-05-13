const Car = require('../model/Car');

exports.addCar = async (req, res) => {
    try {
        const { carId, model, location } = req.body;
        const car = new Car({ carId, model, location });
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ error: 'Error adding car' });
    }
};

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findOne({ carId: req.params.carId });
        if (!car) return res.status(404).json({ error: "Car not found" });
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching car details' });
    }
};

exports.updateCarAvailability = async (req, res) => {
    try {
        const { isAvailable } = req.body;
        const car = await Car.findOneAndUpdate(
            { carId: req.params.carId },
            { isAvailable },
            { new: true }
        );
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: 'Error updating car availability' });
    }
};
