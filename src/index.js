import * as Model from './seach/index'
import './panel.css'
import './style.css'

const elements = {
    seachField: document.querySelector('input.selector'),
    selectorFind: document.querySelector('button.selector-find'),
    selectorNext: document.querySelector('button.selector-next'),
    selectorPrev: document.querySelector('button.selector-prev'),
    navigationTop: document.querySelector('button.nav-top'),
    navigationBottom: document.querySelector('button.nav-bottom'),
    navigationLeft: document.querySelector('button.nav-left'),
    navigationRight: document.querySelector('button.nav-right'),
}

const view = Model.View(elements);
const seach = Model.Seach(view);
const control = Model.SeachControler(elements, seach);

control.setController();
