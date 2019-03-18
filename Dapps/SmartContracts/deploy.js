
// It is used to sign transactions for web3 wallet.
const HDWalletProvider = require("truffle-hdwallet-provider");

// It is used to interact with Ethereum smart contracts
const Web3 = require("web3");

// Interface and bytecode object from compiled exhibition contract
const { interface, bytecode } = require("./compile");

// list of 12 words key to connect account. You can get this key when you setup a MetaMask
var mnemonic = "capable trick goddess metal arch mobile lunar comic siege silent range lawsuit";

// Infur rinkeby API url.
// Specify ethereum network need to connect to
var accessToken = "https://kovan.infura.io/v3/751880b0f40a4fbc82936d20721a182e";

// Create a wallet provider to connect outside rinkeby network
const provider = new HDWalletProvider(mnemonic, accessToken, 1);

// Create a new instance of web3 with wallet provider and ulock the rinkeby account
const web3 = new Web3(provider);

// This function is used to deploy contract
const deploy = async () => {
  // Get list of accounts
  const accounts = await web3.eth.getAccounts();
  console.log('- Acount: ', accounts[0], "\n- Account 1:", account[1],"\n- Account 2:", account[2]);
  const ABI = interface;
  //console.log('- ABI: \n', ABI);

  // Create a contract with exhibition ABI, then deploy with bytecode
  // and then finally send a transaction to rinkeby network with gas
  // and which account its deploy from
  /*
  const result = await new web3.eth.Contract(JSON.parse(ABI))
    .deploy({
      data: bytecode
    })
    .send({ from: accounts[0], gas: "400000" , gasPrice: "10000000000"});
  */

  const result = await new web3.eth.Contract(JSON.parse(ABI))
  .deploy({
    data: '0x'+ bytecode,
  }).send({ gas: '1000000', from: accounts[0] }, function(err, transactionHash) {
      if (!err) {
        console.log('\n- Nothing occur, error false, txHash:',transactionHash, '\n');
        console.log("- checkpoint!")
      } else {
          console.log('- ERROR:',err);
      }}).then(newContract => {
          //ERROR HERE
            console.log('- Contract deployed to:', newContract.options.address);
            return newContract
          }); //end here          
          //use for promise, u can do anything and return anything for result var
          
  // Note this address. It will be used to create contract instance from Angular 5 application.
  //console.log('- Const contract:',deployResult.options.address);
  //console.log(result.options.mnemonic);
  console.log("contract deployed to:", result.options.address);
};

// Call deploy function.
deploy();