export function View(Elements){
    return {
        addClassToSelector(selector){
            selector.classList.add('finded');
        },

        removeClassFromSelector(selector){
            selector.classList.remove('finded');
        },

        selectorNextDisabled(disabled){
            Elements.selectorNext.disabled = disabled;
        },

        selectorPrevDisabled(disabled){
            Elements.selectorPrev.disabled = disabled;
        },
        
        navigationTopDisabled(disabled){
            Elements.navigationTop.disabled = disabled;
        },

        navigationBottomDisabled(disabled){
            Elements.navigationBottom.disabled = disabled;
        },

        navigationLeftDisabled(disabled){
            Elements.navigationLeft.disabled = disabled;
        },

        navigationRightDisabled(disabled){
            Elements.navigationRight.disabled = disabled;
        },
    }
}