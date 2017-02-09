import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translation';

@Injectable()
export class TranslateService {
    private _currentLang: string;

    public get currentLang() {
        return this._currentLang;
    }

    // inject our translations
    constructor( @Inject(TRANSLATIONS) private translation: any) {
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;

        if (this.translation[this.currentLang] && this.translation[this.currentLang][key]) {
            return this.translation[this.currentLang][key];
        }

        return translation;
    }

    public instant(key: string) {
        // call translation
        return this.translate(key);
    }
}