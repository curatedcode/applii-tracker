function getRandomValues(size: number) {
  return window.crypto.getRandomValues(new Uint8Array(size));
}

function randomString(size: number) {
  const mask =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
  let result = "";
  const randomUints = getRandomValues(size);
  for (let i = 0; i < size; i++) {
    const randomIndex = randomUints[i] % mask.length;
    result += mask[randomIndex];
  }
  return result;
}

function generateVerifier(length: number): string {
  return randomString(length);
}

async function generateChallenge(code_verifier: string) {
  const buffer = await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(code_verifier),
  );

  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=/g, "");
}

export default async function pkceChallenge(
  length: number | undefined = 43,
): Promise<string> {
  if (length < 43 || length > 128) {
    throw new Error(`Expected a length between 43 and 128. Received ${length}`);
  }

  const verifier = generateVerifier(length);
  const challenge = await generateChallenge(verifier);

  return challenge;
}
