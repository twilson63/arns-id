const CACHE_SERVER = 'https://cache.permapages.app'
const ARNS_CONTRACT = 'bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U'

export const findAddress = (subdomain: string) => {
  return findANT(subdomain).then(findAddressFromAnt)
}

function findAddressFromAnt(ant: string) {
  return fetch(`${CACHE_SERVER}/${ant}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(["prop", "owner"])
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Not Found!')
    }
  }).then(prop('result'))
}

function findANT(s: string) {
  return fetch(`${CACHE_SERVER}/${ARNS_CONTRACT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(["compose",
      ["nth", "1"],
      ["find", ["compose",
        ["equals", "tom"],
        ["nth", "0"]
      ]],
      ["toPairs"],
      ["prop", "records"]
    ])
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Not Found!')
    }
  }).then(prop('result'))
}


function prop(k: string) {
  return function (o: Record<string, any>) {
    return o[k]
  }
}