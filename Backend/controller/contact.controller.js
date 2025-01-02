import Contact from "../model/contact.model.js";

export const contact = async (req, res) => {
  try {
    const { name, email, contact, subject, message } = req.body;
    const newContact = new Contact({
      name: name,
      email: email,
      contact: contact,
      subject: subject,
      message: message,
    });
    await newContact.save();
    res.status(201).json({
      message: "Contact form submitted successfully",
      newContact: {
        name: newContact.name,
        email: newContact.email,
        contact: newContact.contact,
        subject: newContact.subject,
        message: newContact.message,
      },
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
