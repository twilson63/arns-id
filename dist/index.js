"use strict";
exports.__esModule = true;
exports.findAddress = void 0;
var CACHE_SERVER = 'https://cache.permapages.app';
var ARNS_CONTRACT = 'bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U';
var findAddress = function (subdomain) {
    return findANT(subdomain)
        .then(findAddressFromAnt);
};
exports.findAddress = findAddress;
function findAddressFromAnt(ant) {
    return fetch("".concat(CACHE_SERVER, "/").concat(ant), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(["prop", "owner"])
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error('Not Found!');
        }
    })
        .then(prop('result'));
}
function findANT(s) {
    return fetch("".concat(CACHE_SERVER, "/").concat(ARNS_CONTRACT), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(["compose",
            ["nth", "1"],
            ["find", ["compose",
                    ["equals", s],
                    ["nth", "0"]
                ]],
            ["toPairs"],
            ["prop", "records"]
        ])
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error('Not Found!');
        }
    })
        .then(prop('result'));
}
function prop(k) {
    return function (o) {
        return o[k];
    };
}
