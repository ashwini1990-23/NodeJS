"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pleaseAuth = exports.validateNumericId = void 0;
const validateNumericId = (req, res, next) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        res.status(400).json({ message: "Pet ID must be a Number" });
    }
    else {
        next();
    }
};
exports.validateNumericId = validateNumericId;
const pleaseAuth = (req, res, next) => {
    const { password } = req.query;
    if (password === "please") {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized. You must say please" });
    }
};
exports.pleaseAuth = pleaseAuth;
