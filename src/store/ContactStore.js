import { computed, action, autorun, observable } from 'mobx'
import ContactService from '../services/ContactService'

class ContactStore {
    constructor(){
        this.loadContacts()
    }

    @observable contacts = []
    @observable filter = ''
    @observable currContactId = ''

    @computed get filteredContacts() {
        const contacts = this.contacts.filter(contact => {
            return contact.name.toLocaleLowerCase().includes(this.filter) ||
                contact.phone.toLocaleLowerCase().includes(this.filter) ||
                contact.email.toLocaleLowerCase().includes(this.filter)
        })
        return contacts || []
    }
    @computed get currContact() {
        return this.contacts.find(c => c._id === this.currContactId) || {}
    }

    @action
    loadContacts() {
        ContactService.getContacts().then(contacts => {
            this.contacts.replace(contacts)
        })
    }
    @action 
    saveContact(contact){
        return ContactService.saveContact(contact).then(contact =>{
            this.loadContacts()
            return contact
        })
    }
    @action
    getContactById(id) {
        return ContactService.getContactById(id)
    }

}

var store  = new ContactStore()

export default store

autorun((ac) => {
    console.log('Changed', ac);
})
