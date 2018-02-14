import UserStore from './UserStore'
import ContactStore from './ContactStore'

class Store {
    userStore = UserStore;
    contactStore = ContactStore;
}

var store = window.store = new Store()

export default store

