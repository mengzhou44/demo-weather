import { jwtVerify } from 'jose';

export async function verifyToken(token) {
  try {
    if (token) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return verified.payload && verified.payload?.issuer;
    }
    return null;
  } catch (err) {
    console.error({ err });
    return null;
  }
}

export async function isManagerRole(token) {
    if (token) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const {payload }= verified;
      const claims = payload["https://hasura.io/jwt/claims"]
      if (!claims) return false

      const role = claims["x-hasura-default-role"]

      if (!role) return false 
      
      return role === "manager"
    }
     
    return false 
}
