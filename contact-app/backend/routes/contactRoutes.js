import express from "express";
import { body, validationResult } from "express-validator";
import ContactController from "../controllers/ContactController.js";

const router = express.Router();

const validateContact = [
  body("name").notEmpty().withMessage("Name is required"),
  body("phone")
    .matches(/^\d{10}$/)
    .withMessage("Phone must be 10 digits"),
  body("email").optional().isEmail().withMessage("Invalid email"),
  body("message")
    .optional()
    .isLength({ max: 300 })
    .withMessage("Message too long"),
];

router.post("/", validateContact, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  ContactController.create(req, res);
});

router.get("/", (req, res) => ContactController.fetchAll(req, res));
router.delete("/:id", (req, res) =>
  ContactController.remove(req, res)
);

export default router;
