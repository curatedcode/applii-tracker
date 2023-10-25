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

async function generateChallenge(codeVerifier: string) {
  const buffer = await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier),
  );

  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=/g, "");
}

export default async function pkceChallenge(
  length: number | undefined = 43,
): Promise<{
  codeVerifier: string;
  codeChallenge: string;
}> {
  if (!length) length = 43;

  if (length < 43 || length > 128) {
    throw `Expected a length between 43 and 128. Received ${length}.`;
  }

  const codeVerifier = generateVerifier(length);
  const codeChallenge = await generateChallenge(codeVerifier);

  return {
    codeVerifier,
    codeChallenge,
  };
}

export async function verifyChallenge({
  codeVerifier,
  expectedChallenge,
}: {
  codeVerifier: string;
  expectedChallenge: string;
}) {
  const actualChallenge = await generateChallenge(codeVerifier);
  return actualChallenge === expectedChallenge;
}
