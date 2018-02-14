import uniqid from 'uniqid'

const moves = [
    {
        _id: 1,
        contactId: '5a566402abce24c6bfe4699d',
        at: 1514014194265,
        amount: 3.45,
        lastBtcUsd: 8400,
        status: true
    },
    {
        _id: 2,
        contactId: '5a566402abce24c6bfe4699d',
        at: 1514014194265,
        amount: 2.11,
        lastBtcUsd: 8400,
        status: true
    },
    {
        _id: 3,
        contactId: '5a566402f90ae30e97f990db',
        at: 1514014194265,
        amount: 0.45,
        lastBtcUsd: 8400,
        status: true
    },
    {
        _id: 4,
        contactId: '5a566402f90ae30e97f990db',
        at: 1514014194265,
        amount: 2.220,
        lastBtcUsd: 8400,
        status: true
    },
    {
        _id: 5,
        contactId: '5a56640298ab77236845b82b',
        at: 1514014194265,
        amount: 1.34520,
        lastBtcUsd: 8400,
        status: true
    },
    {
        _id: 6,
        contactId: '5a56640298ab77236845b82b',
        at: 1514014194265,
        amount: 0.4420,
        lastBtcUsd: 8400,
        status: true
    },
    {
        _id: 7,
        contactId: '5a56640298ab77236845b82b',
        at: 1514014194265,
        amount: 0.720,
        lastBtcUsd: 8400,
        status: true
    },
];

function getMoves(contactId = null) {
    return new Promise((resolve, reject) => {
        resolve(moves.sort((a, b) => {
            return a.at > b.at
        }))
    })
}

function _addMove(transfer) {
    return new Promise((resolve, reject) => {
        transfer._id = uniqid()
        transfer.at = Date.now()

        fetch('https://blockchain.info/tobtc?currency=USD&value=1')
            .then(res => res.json())
            .then(res => {
                let usd = (100 / (res * 100))
                transfer.lastBtcUsd = +usd
                resolve(transfer)
            })
            .catch(err => console.log(err))
        
    })
}

function saveMove(transfer) {
    return _addMove(transfer)
}

function getEmptyMove() {
    return {
        _id: '',
        contactId: '',
        at: '',
        amount: '',
        status: false
    }
}

// function filter (term) {
//   term = term.toLocaleLowerCase()
//   return new Promise((resolve, reject) => { 
//     const c = contacts.filter( contact => {
//       return contact.name.toLocaleLowerCase().includes(term) ||
//              contact.phone.toLocaleLowerCase().includes(term) ||
//              contact.email.toLocaleLowerCase().includes(term)
//     })

//     resolve(c)
//   })
// }

export default {
    getMoves,
    saveMove,
    getEmptyMove
}