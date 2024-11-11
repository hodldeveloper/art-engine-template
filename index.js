const { ArtEngine, inputs, generators, renderers, exporters } = require('@hashlips-lab/art-engine');

const BASE_PATH = __dirname;

const fs = require('fs');
const path = require('path');

// Read and parse the description.json file
const descriptionFilePath = path.join(__dirname, 'description.json');
const descriptions = JSON.parse(fs.readFileSync(descriptionFilePath, 'utf8'));

// Function to get a random description
function getRandomDescription() {
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return descriptions[randomIndex];
}

const ae = new ArtEngine({
  cachePath: `${BASE_PATH}/cache`,
  outputPath: `${BASE_PATH}/output`,

  inputs: {
    laabubu: new inputs.ImageLayersInput({
      assetsBasePath: `${BASE_PATH}/data`,
    }),
  },

  generators: [
    new generators.ImageLayersAttributesGenerator({
      dataSet: 'laabubu',
      startIndex: 1,
      endIndex: 5,
    }),
  ],

  renderers: [
    new renderers.ItemAttributesRenderer({
      name: (itemUid) => `Laabubu ${itemUid}`,
      description: (attributes) => {
        const description = getRandomDescription();
        return `${description}`;
      },
    }),
    new renderers.ImageLayersRenderer({
      width: 3464,
      height: 3464,
    }),
  ],

  exporters: [
    new exporters.ImagesExporter(),
    new exporters.Erc721MetadataExporter({
      imageUriPrefix: 'ipfs://__CID__/',
    }),
    new exporters.SolMetadataExporter({
      imageUriPrefix: 'ipfs://__CID__/',
      symbol: 'LaaBUBU',
      sellerFeeBasisPoints: 200,
      collectionName: 'BCH Laabubu',
      creators: [
        {
          address: '__SOLANA_WALLET_ADDRESS_HERE__',
          share: 100,
        },
      ],
    }),
  ],
});

ae.run();
