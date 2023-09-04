const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying,Please wait ...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  // get number

  const currentFavoriteNumber = await contract.retrieve();
  console.log(
    `current favorite number is : ${currentFavoriteNumber.toString()}`
  );
  const transactionResponse = await contract.store("2");
  const transactionsReciept = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(
    `updated favorite number is : ${updatedFavoriteNumber.toString()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
