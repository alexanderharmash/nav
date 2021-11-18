export function View(Elements){
    return {
        addClassToSelector(selector){
            selector.classList.add('finded');
        },

        removeClassFromSelector(selector){
            selector.classList.remove('finded');
        },

        selectorNext(disabled){
            Elements.selectorNext.disabled = disabled;
        },

        selectorPrev(disabled){
            Elements.selectorPrev.disabled = disabled;
        },
        
        navigationTop(disabled){
            Elements.navigationTop.disabled = disabled;
        },

        navigationBottom(disabled){
            Elements.navigationBottom.disabled = disabled;
        },

        navigationLeft(disabled){
            Elements.navigationLeft.disabled = disabled;
        },

        navigationRight(disabled){
            Elements.navigationRight.disabled = disabled;
        },
    }
}