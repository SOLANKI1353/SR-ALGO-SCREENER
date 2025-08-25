import { getDatabase, getUserSetting, setUserSetting } from '../../../lib/database';
import jwt from 'jsonwebtoken';

function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return null;
  }
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const user = authenticateToken(req);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // Get user settings
    try {
      const { setting } = req.query;
      
      if (setting) {
        // Get specific setting
        const settingData = await getUserSetting(user.userId, setting);
        res.status(200).json({ [setting]: settingData ? settingData.setting_value : null });
      } else {
        // Get all settings (you would need to implement this)
        res.status(200).json({ message: 'Get all settings not implemented' });
      }
    } catch (error) {
      console.error('Get settings error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    // Update user settings
    try {
      const { setting, value } = req.body;
      await setUserSetting(user.userId, setting, value);
      res.status(200).json({ message: 'Setting updated successfully' });
    } catch (error) {
      console.error('Update settings error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}