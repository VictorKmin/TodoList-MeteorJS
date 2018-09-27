import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Notes} from "../lib/collections.js";
import {Accounts} from 'meteor/accounts-base'
import './main.html';


Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
})

Template.hello.onCreated(function helloOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
    counter() {
        return Template.instance().counter.get();
    },
});

Template.hello.events({
    'click button'(event, instance) {
        // increment the counter when button is clicked
        instance.counter.set(instance.counter.get() + 1);
    },
});


Template.body.helpers({
    // заготовка на випадок лагів бази
    /*
    notes: [
        {text: 'Hello'},
        {text: 'Hello1'},
        {text: 'Hello2'},
    ]
    */

    // Шукає всі Notes. НЕ ЗАБУВТИ ЕКСПОРТНУТИ B server/main.js
    // Потім це все викликаємо на фронті і там по фор іч бігаєм
    notes() {
        return Notes.find()
    }
});

Template.addNote.events({
    //При кліку на кнопку в addNote темплейті
    'click button'() {
        // дістаємо текст з поля
        const text = document.getElementById('textfield').value;
        //Викликаємо хелпер клас з назвою в першому парметрі та інформацію, яка туди піде у другому
        Meteor.call('notes.insert', text)
        console.log(text);
    },
});

Template.note.events({
    'click button'() {
        //this в данному випадку не note
        console.log(this._id);
        console.log(this.text);
        // Так самовикликаємо хелпер в який передаємо this, який є нотаткою
        Meteor.call('notes.remove', this)
    }
})