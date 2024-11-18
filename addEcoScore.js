const fs = require("fs");
const filePath = "ecommerce.products.json";

const calculateEcoScore = (product) => {
  let score = 0;
  const carbonFootprint = product.carbonFootprint || 0;
  const materialSourcing = product.materialSourcing
    ? product.materialSourcing.toLowerCase()
    : "good";
  const recyclability = product.recyclability || 0;
  const waterUsage = product.waterUsage
    ? product.waterUsage.toLowerCase()
    : "moderate";
  const energyEfficiency = product.energyEfficiency
    ? product.energyEfficiency.toLowerCase()
    : "moderate";
  const biodegradability = product.biodegradability || 0;
  const durability = product.durability || "0 months";

  // Carbon footprint 0-100
  score += carbonFootprint * 0.2; // 20% weightage in ecoscore

  // Material sourcing good, better, best
  const materialSourcingScores = { good: 40, better: 70, best: 100 };
  score += materialSourcingScores[materialSourcing] * 0.2; // 20% weightage in ecoscore

  // Recyclability 0-100
  score += recyclability * 0.2; // 20% weightage in ecoscore

  // Water usage high, moderate, low
  const waterUsageScores = { high: 30, moderate: 60, low: 100 };
  score += waterUsageScores[waterUsage] * 0.1; // 10% weightage in ecoscore

  // Energy efficiency high, moderate, low
  const energyEfficiencyScores = { high: 100, moderate: 70, low: 40 };
  score += energyEfficiencyScores[energyEfficiency] * 0.1; // 10% weightage in ecoscore

  // Biodegradability 0-100
  score += biodegradability * 0.1; // 10% weightage in ecoscore

  // Durability months or years, normalize to months
  const durabilityInMonths = durability.includes("month")
    ? parseInt(durability) // months
    : parseInt(durability) * 12; // years to months
  const durabilityScore = Math.min(durabilityInMonths / 12, 1) * 10; // 10% weightage in ecoscore
  score += durabilityScore;

  return parseFloat(Math.min(score, 100).toFixed(2)); //score does not exceed 100, rounded to 2 decimal places
};


fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const updatedData = jsonData.map((product) => {
      const ecoScore = calculateEcoScore(product);
      return { ...product, ecoScore };
    });
    fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(
          "Successfully calculated and added ecoScore for all products!"
        );
      }
    });
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});
