import { test } from 'uvu'
import * as assert from 'uvu/assert'
//import { fetch } from 'undici'
import { findAddress } from './index'

// globalThis.fetch = fetch

test('find address', async () => {
  const addr = await findAddress('tom')
  assert.is(addr, 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI')
})

test.run()