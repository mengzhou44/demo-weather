import { magicAdmin } from './utils/magic';
import { removeTokenCookie } from './utils/cookies';
import { verifyToken } from './utils/verify-token';

export default async (req, res) => {
  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: 'User is not signed in' });
    const token = req.cookies.token;

    const userId = await verifyToken(token);
    removeTokenCookie(res);
    
    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      console.log("User's session with Magic already expired");
      console.error('Error occurred while logging out magic user', error);
    }
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: 'User is not signed in' });
  }
}
