module.exports = uniqueRef = () => {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 1000000);
  const hash = (timestamp + randomValue) % 1000000;
  return hash.toString().padStart(6, "0");
};
