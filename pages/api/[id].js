import {INFURA_ADDRESS, ADDRESS, ABI} from "../../config.js"
import Web3 from "web3";


import traits from "../../database/traits.json";

const infuraAddress = INFURA_ADDRESS

const frenApi = async(req, res) => {

    // SOME WEB3 STUFF TO CONNECT TO SMART CONTRACT
  const provider = new Web3.providers.HttpProvider(infuraAddress)
  const web3infura = new Web3(provider);
  const frenContract = new web3infura.eth.Contract(ABI, ADDRESS)




// THE ID YOU ASKED IN THE URL
  const query = req.query.id;



  const totalFrens = 10000;
  if(parseInt(query) < totalFrens) {


    // CALL CUSTOM TOKEN NAME IN THE CONTRACT
    const tokenNameCall = await frenContract.methods.frenNames(query).call();
    let tokenName = `#${query}${(tokenNameCall === '') ? "" : ` - ${tokenNameCall}`}`





    const signatures = [40,405,340]
    const trait = traits[parseInt(query)]


    // CHECK OPENSEA METADATA STANDARD DOCUMENTATION https://docs.opensea.io/docs/metadata-standards
    let metadata = {}
    // IF THE REQUESTED TOKEN IS A SIGNATURE, RETURN THIS METADATA
    if ( signatures.includes( parseInt( query ) ) ) {

      metadata = {
        "name": tokenName,
        "description": "The coziest frens on the blockchain.",
        "tokenId" : parseInt(query),
        "image": `https://gateway.pinata.cloud/ipfs/${trait["imageIPFS"]}`,
        "external_url":"https://www.immortalfren.com/api",
        "attributes": [
          {
            "trait_type": "Signature Series",
            "value": trait["Signature Series"]
          }
        ]
      }
      // console.log(metadata)
    } else {
    // GENERAL FREN METADATA
      metadata = {
        "name": tokenName,
        "description": "The coziest frens on the blockchain.",
        "tokenId" : parseInt(query),
        "image": `https://gateway.pinata.cloud/ipfs/${trait["imageIPFS"]}`,
        "external_url":"https://www.immortalfren.com/api",
        "attributes": [
            {
              "trait_type": "Background",
              "value": trait["Background"]
            },
            {
              "trait_type": "Clothes",
              "value": trait["Clothes"]
            },
            {
              "trait_type": "Pepo",
              "value": trait["Pepo"]
            },
            {
              "trait_type": "Mouths",
              "value": trait["Mouths"]
            },
            {
              "trait_type": "Hats",
              "value": trait["Hats"]
            },
            {
              "trait_type": "Neck",
              "value": trait["Neck"]
            },
            {
              "trait_type": "Eyes",
              "value": trait["Eyes"]
            },
            {
              "trait_type": "Extras",
              "value": trait["Extras"]
            },
        ]
      }

      // console.log(metadata)

    }

    res.statusCode = 200
    res.json(metadata)
  } else {
    res.statuscode = 404
    res.json({error: "The fren you requested is out of range"})

  }


  // this is after the reveal


}

export default frenApi
