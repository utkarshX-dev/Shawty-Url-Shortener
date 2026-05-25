import express from 'express';
import { 
    register, 
    login, 
    getUserUrls, 
    updateProfile, 
    deleteAccount,
    shortenUrl,
    createCustomAlias,
    getUrl,
    deleteUrl
} from '../controllers/user.controller.js';
import { isAuth } from '../config/token.js';
import { upload } from '../middleware/multer.js';
import { getDashboardMetrics } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', isAuth, upload.single('photoUrl'), updateProfile);
router.delete('/delete', isAuth, deleteAccount);

router.post('/shorten', isAuth, shortenUrl);
router.post('/custom', isAuth, createCustomAlias);
router.get('/urls', isAuth, getUserUrls);
router.get('/url/:shortUrl', getUrl);
router.delete('/url/:urlId', isAuth, deleteUrl);
router.get('/metrics', isAuth, getDashboardMetrics);

export default router;