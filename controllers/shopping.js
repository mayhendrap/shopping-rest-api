import Shopping from '../models/shopping.js';

export const create = async (req, res) => {
    const { createddate, name } = req.body.shopping;
    try {
        const shopping = await Shopping.create({name, createddate});
        res.status(200).json({ data: shopping });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
export const getById = async (req, res) => {
    try {
        const shoppings = await Shopping.find({_id: req.params.id});
        res.status(200).json(shoppings);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
export const getAll = async (req, res) => {
    try {
        const shoppings = await Shopping.find();
        res.status(200).json(shoppings);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
export const updateById = async (req, res) => {
    const shopping = req.body.shopping;
    try {
        const updatedShopping = await Shopping.findByIdAndUpdate({_id: req.params.id}, {...shopping, _id: req.params.id}, { new: true });
        res.status(200).json(updatedShopping);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
export const deleteById = async (req, res) => {
    try {
        const deletedShopping = await Shopping.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({message: "Shopping data was deleted.", data: deletedShopping});
    } catch (err) {
        res.status(500).json({ message: err });
    }
};