import axios from "axios";
import jwt from "jsonwebtoken";

const CLERK_JWKS_URL = process.env.CLERK_JWKS_URL;

let jwksCache = null;

export async function getClerkPublicKey(kid) {
  if (!jwksCache) {
    const { data } = await axios.get(CLERK_JWKS_URL);
    jwksCache = data.keys;
  }
  const key = jwksCache.find((k) => k.kid === kid);
  if (!key) throw new Error("Public key not found");
  // Convert JWK to PEM
  return jwkToPem(key);
}

// Helper to convert JWK to PEM
import jwkToPem from "jwk-to-pem";

export async function verifyClerkJWT(token) {
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded) throw new Error("Invalid token");
  const kid = decoded.header.kid;
  const publicKey = await getClerkPublicKey(kid);
  return jwt.verify(token, publicKey);
}
