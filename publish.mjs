// create a path manifest that deploys
// index.html - README.md with STAMP Widget
// /pkg -> arns-id-{version}.tgz
// /bundle.min.js -> dist/bundle.min.js
import Bundlr from '@bundlr-network/client'
import fs from 'fs'

const projectInfo = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))

const bundlr = new Bundlr.default('https://node2.bundlr.network', 'arweave', jwk)

const bundleJS = await bundlr.uploadFile('./dist/bundle.min.js')
const pkg = await bundlr.uploadFile(`./arns-id-${projectInfo.version}.tgz`)
const demo = await bundlr.upload(
  fs.readFileSync('./demo/index.html', 'utf-8'), {
  tags: [{
    name: 'Content-Type', value: 'text/html'
  }]
}
)
const readme = await bundlr.upload(
  fs.readFileSync('./README.md', 'utf-8'), {
  tags: [{
    name: 'Content-Type', value: 'text/plain'
  }]
})

const project = await bundlr.upload(JSON.stringify({
  manifest: "arweave/paths",
  version: "0.1.0",
  index: {
    path: 'index.html'
  },
  paths: {
    "index.html": { id: readme.id },
    "pkg": { id: pkg.id },
    "bundle.min.js": { id: bundleJS.id },
    "demo/index.html": { id: demo.id }
  }
}), {
  tags: [{
    name: 'Content-Type', value: 'application/x.arweave-manifest+json'
  }]
})

console.log('id: ', project.id)
