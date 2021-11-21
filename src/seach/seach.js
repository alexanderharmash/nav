function DOMTree (current, View) {
    
    let parent = current.parentElement;
    let child = current.firstElementChild;
    let psibling = current.previousElementSibling;
    let nsibling = current.nextElementSibling;

    if (parent instanceof HTMLBodyElement) parent = null;

    View.navigationTopDisabled(parent ? false : true);
    View.navigationBottomDisabled(child ? false : true);
    View.navigationLeftDisabled(psibling ? false : true);
    View.navigationRightDisabled(nsibling ? false : true);

    return {
        parent: parent,
        child: child,
        psibling: psibling,
        nsibling: nsibling,

        addClass(){
            View.addClassToSelector(current);
        },
        
        elements(element){
            View.removeClassFromSelector(current);
            return new DOMTree(this[element], View);
        },

        removeClass(){
            View.removeClassFromSelector(current);
        },
    }; 
}

function Selectors(View){
    let position = 0;
    let selectors = [];

    function buttons(){
        let length = selectors.length;

        if (length && position != length - 1){
            View.selectorNextDisabled(false);
        }else{
            View.selectorNextDisabled(true);
        }
        
        if (position > 0){
            View.selectorPrevDisabled(false);
        }else{
            View.selectorPrevDisabled(true);
        }
    }

    return {
        newRequest(request){
            if(request){
                selectors = document.querySelectorAll(request);
            
                View.addClassToSelector(selectors[position]);

                buttons();
            }
        },

        next(){
            let prev = selectors[position];
            View.removeClassFromSelector(prev);

            position += 1;
            let curr = selectors[position];

            View.addClassToSelector(curr);

            buttons();
        },

        prev(){
            let prev = selectors[position];
            View.removeClassFromSelector(prev);

            position -= 1;
            let curr = selectors[position];

            View.addClassToSelector(curr);

            buttons();
        },

        getDOM(){
            if(selectors.length){
                return new DOMTree(selectors[position], View);
            }
        },

        turnOffButtons(){
            View.selectorPrevDisabled(true);
            View.selectorNextDisabled(true);
        },

        removeClass(){
            if(selectors.length){
                View.removeClassFromSelector(selectors[position]);
            }
        },
    }
}

export function Seach(View){
    
    let selectors;
    let domTree;

    return{
        handleSelectors(request) {
            if(selectors){
                selectors.removeClass();
            }

            if(domTree){
                domTree.removeClass();
            }

            selectors = new Selectors(View);
            selectors.newRequest(request);

            domTree = selectors.getDOM();   
        },

        nextSelector() {
            selectors.next();
            domTree = selectors.getDOM();
        },

        prevSelector() {
            selectors.prev();
            domTree = selectors.getDOM();
        },

        topSelector() { 
            selectors.turnOffButtons();
            domTree = domTree.elements('parent');
            domTree.addClass();
        },

        buttomSelector() { 
            selectors.turnOffButtons();
            domTree = domTree.elements('child');
            domTree.addClass();  
        },

        leftSelector() { 
            selectors.turnOffButtons();
            domTree = domTree.elements('psibling');
            domTree.addClass();
        },

        rightSelector(){
            selectors.turnOffButtons();
            domTree = domTree.elements('nsibling');
            domTree.addClass();    
        },
    }
}