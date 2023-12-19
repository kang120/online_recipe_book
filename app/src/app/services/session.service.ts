import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    type: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() { }

    public setType(type: string): void {
        this.type.next(type);
    }

    public getType(): string {
        return this.type.value;
    }
}
