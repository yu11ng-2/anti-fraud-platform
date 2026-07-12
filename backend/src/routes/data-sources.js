const express = require('express');
const router = express.Router();

// Get available data sources
router.get('/', async (req, res) => {
  try {
    res.json({
      sources: [
        {
          id: 1,
          name: '台灣警政署詐騙案件',
          type: 'government',
          lastUpdated: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          name: '金管會警示清單',
          type: 'financial',
          lastUpdated: '2024-01-15T09:30:00Z'
        },
        {
          id: 3,
          name: '消保會投訴統計',
          type: 'consumer',
          lastUpdated: '2024-01-14T15:00:00Z'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
