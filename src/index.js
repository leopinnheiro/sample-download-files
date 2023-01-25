const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '..', 'out')

function createSampleFile(sizeInMB) {
  const filename = generateName(sizeInMB);
  console.log(`Generating ${filename}`);

  const fp = fs.openSync(path.join(outputDir, filename), "w");

  for (let i = 0; i < sizeInMB; i++) {
    process.stdout.write(`\rWrite ${i+1}MB`);
    fs.writeSync(fp, generateOneMb());
  }
  console.log('');
  console.log('Done');
}

function generateOneMb() {
  const size = Math.pow(2, 20) * 1;
  const buffer = Array(size).fill(0x00);

  return new Buffer.from(buffer)
}

function generateName(sizeInMB) {
  if (sizeInMB >= 1024) {
    return `${sizeInMB / 1024}GB.bin`
  }
  return `${sizeInMB}MB.bin`
}

function createOutFolder() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
}

function clearOutFolder() {
  console.log(`Clear ${outputDir}`);
  fs.readdirSync(outputDir).forEach(f => fs.rmSync(`${outputDir}/${f}`));
}

createOutFolder();
clearOutFolder();
createSampleFile(5);
createSampleFile(10);
createSampleFile(50);
createSampleFile(100);