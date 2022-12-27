# ArNS ID

Quickly match sub-domain names to wallet addresses. This library takes a sub-domain name and uses the ArNS Test Contract to locate the ANT contract, then it reads the state of the ANT contract to locate the owner address of the contract.

## Install

```console
npm install https://arns-id.arweave.dev/pkg
```

## Usage

```js
import { findAddress } from 'arns-id'

const addr = await findAddress('rakis')
```

## Testing

```sh
yarn test
```

## Linting

```sh
yarn lint
```

## Publish

```sh
yarn deploy
```

## Contributing

Performance Optimizations and Bug fixes are welcome!

