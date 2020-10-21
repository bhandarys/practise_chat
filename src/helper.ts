import { BehaviorSubject } from 'rxjs';

const chat: any = {msg: "Hi, Good Morning", name: "left", time: "12:00:00 AM"}
let chat$ = new BehaviorSubject(chat);

export function updateChat(msg: string, name: string) {
    chat$.next({msg, name, time: ""});
}
export function getChat() {
    return chat$;
}