import { computed, action, autorun, observable } from 'mobx'
import TransferService from '../services/TransferService'

class UserStore {
    constructor() {
        TransferService.getMoves().then(moves => {
            this.user.moves.replace(moves)
        })
    }
    @observable currContactId = ''
    @observable user = {
        name: 'Puki',
        coins: 100,
        moves: []
    }
    @computed get filteredMoves() {
        return (this.currContactId ? this.user.moves.filter(m => m.contactId === this.currContactId) : this.user.moves).reverse()
    }
    @action addMove(amount, contactId) {
        if (amount > this.user.coins) return

        const move = {
            ...TransferService.getEmptyMove(),
            amount: +amount,
            contactId
        }
        TransferService.saveMove(move).then(m => {
            this.user.coins -= +m.amount
            this.user.moves.push(m)

            setTimeout(() => {
                this.user.moves.find(move => move._id === m._id).status = true
            }, Math.random() * 10000);
        })
    }

    @action getMoves() {
        return this.user.moves
    }

    @action setMoves(moves) {
        this.user.moves.replace(moves)
    }
}

var store = new UserStore()

export default store

autorun((ac) => {
    console.log('Changed', ac);
})
