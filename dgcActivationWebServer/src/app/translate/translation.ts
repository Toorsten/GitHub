import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_DE_NAME, LANG_DE_TRANS } from './lang-de';
import { LANG_FR_NAME, LANG_FR_TRANS } from './lang-fr';
import { LANG_IT_NAME, LANG_IT_TRANS } from './lang-it';
import { LANG_ES_NAME, LANG_ES_TRANS } from './lang-es';

// translation token
export const TRANSLATIONS = new OpaqueToken('translation');

// all translations
const dictionary = {
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_DE_NAME]: LANG_DE_TRANS,
    [LANG_FR_NAME]: LANG_FR_TRANS,
    [LANG_IT_NAME]: LANG_IT_TRANS,
    [LANG_ES_NAME]: LANG_ES_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];