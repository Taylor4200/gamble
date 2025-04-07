// Generate a random seed
export const generateSeed = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0].toString(16);
};

// Generate a hash from a string
export const generateHash = async (str) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Generate a random number between min and max using server and client seeds
export const generateRandomNumber = async (serverSeed, clientSeed, nonce, min, max) => {
  const hash = await generateHash(`${serverSeed}:${clientSeed}:${nonce}`);
  const randomValue = parseInt(hash.substring(0, 8), 16) / 0xffffffff;
  return Math.floor(randomValue * (max - min + 1)) + min;
};

// Verify the fairness of a result
export const verifyFairness = async (serverSeed, clientSeed, nonce, result, min, max) => {
  const calculatedResult = await generateRandomNumber(serverSeed, clientSeed, nonce, min, max);
  return calculatedResult === result;
};

export const generateClientSeed = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const generateNonce = () => {
  return Math.floor(Math.random() * 1000000);
};

// Browser-compatible version of calculateRoll
export const calculateRoll = async (serverSeed, clientSeed, nonce) => {
  // Use our existing generateHash function which uses Web Crypto API
  const hash = await generateHash(`${serverSeed}:${clientSeed}:${nonce}`);
  
  // Use first 4 bytes (8 hex characters) for the roll
  const roll = parseInt(hash.substr(0, 8), 16);
  
  // Convert to a number between 0 and 100
  return (roll % 10000) / 100;
};

// Make verifyRoll async since calculateRoll is now async
export const verifyRoll = async (serverSeed, clientSeed, nonce, roll) => {
  const calculatedRoll = await calculateRoll(serverSeed, clientSeed, nonce);
  return Math.abs(calculatedRoll - roll) < 0.00001; // Account for floating point precision
};

export const selectItem = (items, roll) => {
  let currentProb = 0;
  
  for (const item of items) {
    currentProb += item.odds;
    if (roll <= currentProb) {
      return item;
    }
  }
  
  // Fallback to last item if we somehow got here (shouldn't happen with proper odds)
  return items[items.length - 1];
};

// Make generatePackResult async since calculateRoll is now async
export const generatePackResult = async (serverSeed, clientSeed, nonce, items) => {
  const roll = await calculateRoll(serverSeed, clientSeed, nonce);
  const selectedItem = selectItem(items, roll);
  
  return {
    roll,
    item: selectedItem,
    serverSeed,
    clientSeed,
    nonce,
    timestamp: Date.now()
  };
}; 