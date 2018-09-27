import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
export const Notes = new Mongo.Collection('notes');

// Створюю хелпери
Meteor.methods({
    //хелпер інсерт, який приймає текст
    'notes.insert' (text) {
        //Перевіряю чи він стрінга
        check(text, String);

        // виконую запис в базу. Notes - кспортована вище монго
        Notes.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },

    //Хеплер який видаляє з бази. Приймає цілу нотатку яка є this
    'notes.remove'(note) {
        check(note._id, String);

        // Якщо id власника = id залогованого юзера тоді ок
        if (note.owner === Meteor.userId()) {
            Notes.remove(note._id);
        } else {
            console.log('NO!')
        }
    }
});