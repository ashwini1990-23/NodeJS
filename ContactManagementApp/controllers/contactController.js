//@desc Get all contacts
//@route GET /api/contacts
//@access public
export function getAllContacts(req, res) {
  res.status(200).json({ message: "Get all Contacts" });
}

//@desc Create new contact
//@route POST /api/contacts
//@access public
export function createContact(req, res) {
  res.status(201).json({ message: "Create contact" });
}

//@desc Get contact based on id
//@route GET /api/contacts/:id
//@access public
export function getContact(req, res) {
  res.status(200).json({ message: `Get contact based on id ${req.params.id}` });
}

//@desc Update contact based on id
//@route PUT /api/contacts/:id
//@access public
export function updateContactById(req, res) {
  res
    .status(200)
    .json({ message: `Update contact based on id ${req.params.id}` });
}

//@desc Delete contact based on id
//@route DELETE /api/contacts/:id
//@access public
export function deleteContact(req, res) {
  res
    .status(200)
    .json({ message: `Delete contact based on id ${req.params.id}` });
}
