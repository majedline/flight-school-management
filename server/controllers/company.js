const db = require('../models');

// Create a company
const createCompany = async (req, res) => {
  try {
    // Extract company data from request body
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      province,
      country,
      postalCode,
      phoneNumber,
      email,
      headerImage,
      footerImage,
      logoImage,
    } = req.body;

    // Create the company in the database
    const newCompany = await db.company.create({
      name,
      addressLine1,
      addressLine2,
      city,
      province,
      country,
      postalCode,
      phoneNumber,
      email,
      headerImage,
      footerImage,
      logoImage,
      active: true,
    });

    res.status(201).json({ message: 'Company created successfully', company: newCompany });
  } catch (error) {
    res.status(500).json({ error: `Failed to create company: ${error.message}` });
  }
};

// Edit a company
const editCompany = async (req, res) => {
  try {
    // Extract company ID and updated data from request body
    const { id } = req.params;
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      province,
      country,
      postalCode,
      phoneNumber,
      email,
      headerImage,
      footerImage,
      logoImage,
    } = req.body;

    // Find the company in the database
    const company = await db.company.findByPk(id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Update the company's data
    company.name = name;
    company.addressLine1 = addressLine1;
    company.addressLine2 = addressLine2;
    company.city = city;
    company.province = province;
    company.country = country;
    company.postalCode = postalCode;
    company.phoneNumber = phoneNumber;
    company.email = email;
    company.headerImage = headerImage;
    company.footerImage = footerImage;
    company.logoImage = logoImage;

    // Save the updated company in the database
    await company.save();

    res.json({ message: 'Company updated successfully', company });
  } catch (error) {
    res.status(500).json({ error: `Failed to edit company: ${error.message}` });
  }
};

// Set a company to active or inactive
const setCompanyActiveStatus = async (req, res) => {
  try {
    // Extract company ID and active status from request body
    const { id } = req.params;
    const { active } = req.body;

    // Find the company in the database
    const company = await db.company.findByPk(id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Update the company's active status
    company.active = active;

    // Save the updated company in the database
    await company.save();

    res.json({ message: `Company set to ${active ? 'active' : 'inactive'} successfully`, company });
  } catch (error) {
    res.status(500).json({ error: `Failed to set company active status: ${error.message}` });
  }
};

// Get a company by ID
const getCompany = async (req, res) => {
  try {
    // Extract company ID from request parameters
    const { id } = req.params;

    // Find the company in the database
    const company = await db.company.findByPk(id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ company });
  } catch (error) {
    res.status(500).json({ error: `Failed to get company: ${error.message}` });
  }
};

// Search companies by name, email, and active status
const searchCompanies = async (req, res) => {
  try {
    // Extract search parameters from request query
    const { name, email, active } = req.query;

    // Prepare search conditions
    const searchConditions = {
      where: {},
    };

    if (name) {
      searchConditions.where.name = { [db.Sequelize.Op.like]: `%${name}%` };
    }

    if (email) {
      searchConditions.where.email = { [db.Sequelize.Op.like]: `%${email}%` };
    }

    if (active !== undefined) {
      searchConditions.where.active = active === 'true';
    }

    // Search Companies in the database
    const companies = await db.company.findAll(searchConditions);

    res.json({ companies });
  } catch (error) {
    res.status(500).json({ error: `Failed to search companies: ${error.message}` });
  }
};

// Get all active companies sorted by created date
const getActiveCompanies = async (req, res) => {
  try {
    // Find active companies in the database
    const companies = await db.company.findAll({
      where: { active: true },
      order: [['createdOn', 'DESC']],
    });

    res.json({ companies });
  } catch (error) {
    res.status(500).json({ error: `Failed to get active companies: ${error.message}` });
  }
};

module.exports = {
  createCompany,
  editCompany,
  setCompanyActiveStatus,
  getCompany,
  searchCompanies,
  getActiveCompanies,
};