const express = require('express');
const router = express.Router();

// Query fraud risk
router.post('/check-risk', async (req, res) => {
  try {
    const { phoneNumber, domain } = req.body;

    // TODO: Implement risk assessment algorithm
    const riskScore = Math.random() * 100;

    res.json({
      input: phoneNumber || domain,
      riskScore: Math.round(riskScore),
      riskLevel: riskScore > 70 ? 'high' : riskScore > 40 ? 'medium' : 'low',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fraud cases
router.get('/cases', async (req, res) => {
  try {
    // TODO: Fetch from database
    res.json({
      cases: [
        {
          id: 1,
          title: '假冒銀行客服詐騙',
          description: '詐騙者假冒銀行客服進行詐騙',
          category: 'impersonation',
          date: '2024-01-15'
        }
      ],
      total: 1
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
