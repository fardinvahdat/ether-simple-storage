const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "0x735aa3ce07a8c22595c58a38e67a47e9594a34028d4c4dc1ae3bcefd3f29ae08",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  //   const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  //   console.log("Deploying,Please wait ...");
  //   const contract = await contractFactory.deploy();
  //   const deploymentReciept = await contract.deployTransaction.wait(1);

  console.log("let's deploy only using transactions data!");
  const nonce = await wallet.getTransactionCount();
  let tx = {
    nonce: nonce,
    gasPrice: 20000000000,
    gasLimit: 6721975,
    to: null,
    value: 0,
    data: "0x" + binary,
    chainId: 1337,
  };
  const sendTxtResponse = await wallet.sendTransaction(tx);
  await sendTxtResponse.wait(1);
  console.log(sendTxtResponse);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
