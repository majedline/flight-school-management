const db = require('../models');

// Create a asset
const createAsset = async (req, res) => {
    try {
        // Extract asset data from request body
        const {
            name,
            type,
            callSign,
            registrationNumber,
            flightSchoolDesignation,
            flightSchoolAerodrome
        } = req.body;

        // Create the asset in the database
        const newAsset = await db.asset.create({
            name,
            type,
            callSign,
            registrationNumber,
            flightSchoolDesignation,
            flightSchoolAerodrome,
            active: true,
        });

        res.status(201).json({ message: 'Asset created successfully', asset: newAsset });
    } catch (error) {
        res.status(500).json({ error: `Failed to create asset: ${error.message}` });
    }
};

// Edit a asset
const editAsset = async (req, res) => {
    try {
        // Extract asset ID and updated data from request body
        const { id } = req.params;
        const {
            name,
            type,
            callSign,
            registrationNumber,
            flightSchoolDesignation,
            flightSchoolAerodrome
        } = req.body;

        // Find the asset in the database
        const asset = await db.asset.findByPk(id);

        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        // Update the asset's data
        asset.name = name;
        asset.type = type;
        asset.callSign = callSign;
        asset.registrationNumber = registrationNumber;
        asset.flightSchoolDesignation = flightSchoolDesignation;
        asset.flightSchoolAerodrome = flightSchoolAerodrome;
      
        // Save the updated asset in the database
        await asset.save();

        res.json({ message: 'Asset updated successfully', asset });
    } catch (error) {
        res.status(500).json({ error: `Failed to edit asset: ${error.message}` });
    }
};

// Set a asset to active or inactive
const setAssetActiveStatus = async (req, res) => {
    try {
        // Extract asset ID and active status from request body
        const { id } = req.params;
        const { active } = req.body;

        // Find the asset in the database
        const asset = await db.asset.findByPk(id);

        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        // Update the asset's active status
        asset.active = active;

        // Save the updated asset in the database
        await asset.save();

        res.json({ message: `Asset set to ${active ? 'active' : 'inactive'} successfully`, asset });
    } catch (error) {
        res.status(500).json({ error: `Failed to set asset active status: ${error.message}` });
    }
};


// Get a asset by ID
const getAsset = async (req, res) => {
    try {
        // Extract asset ID from request parameters
        const { id } = req.params;

        // Find the asset in the database
        const asset = await db.asset.findByPk(id);

        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        res.json({ asset });
    } catch (error) {
        res.status(500).json({ error: `Failed to get asset: ${error.message}` });
    }
};

// Search assets by name, email, and active status
const searchAssets = async (req, res) => {
    try {
        // Extract search parameters from request query
        const { name, callSign, active } = req.query;

        // Prepare search conditions
        const searchConditions = {
            where: {},
        };

        if (name) {
            searchConditions.where.name = { [db.Sequelize.Op.like]: `%${name}%` };
        }

        if (email) {
            searchConditions.where.callSign = { [db.Sequelize.Op.like]: `%${callSign}%` };
        }

        if (active !== undefined) {
            searchConditions.where.active = active === 'true';
        }

        // Search Assets in the database
        const assets = await db.asset.findAll(searchConditions);

        res.json({ assets });
    } catch (error) {
        res.status(500).json({ error: `Failed to search assets: ${error.message}` });
    }
};

// Get all active assets sorted by created date
const getActiveAssets = async (req, res) => {
    try {
        // Find active assets in the database
        const assets = await db.asset.findAll({
            where: { active: true },
            order: [['createdAt', 'DESC']],
        });

        res.json({ assets });
    } catch (error) {
        res.status(500).json({ error: `Failed to get active assets: ${error.message}` });
    }
};


module.exports = {
    createAsset,
    editAsset,
    setAssetActiveStatus,
    getAsset,
    searchAssets,
    getActiveAssets
};
