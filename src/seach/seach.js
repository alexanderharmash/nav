function DOMTree (current, View) {
    
    const parent = current.parentElement;
    const child = current.firstElementChild;
    const psibling = current.previousElementSibling;
    const nsibling = current.nextElementSibling;
    
    View.navigationTop(parent ? false : true);
    View.navigationBottom(child ? false : true);
    View.navigationLeft(psibling ? false : true);
    View.navigationRight(nsibling ? false : true);

    return {
        parent: parent,
        child: child,
        psibling: psibling,
        nsibling: nsibling,

        class(){
            View.addClassToSelector(current);
        },
        
        elements(element){
            View.removeClassFromSelector(current);
            return new DOMTree(this[element], View);
        },

        clear(){
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
            View.selectorNext(false);
        }else{
            View.selectorNext(true);
        }
        
        if (position > 0){
            View.selectorPrev(false);
        }else{
            View.selectorPrev(true);
        }
    }

    return {
        newRequest(request){
            if(request){
                selectors = document.querySelectorAll(request);
            }

            View.addClassToSelector(selectors[position]);

            buttons();
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
            View.selectorPrev(true);
            View.selectorNext(true);
        },

        clear(){
            if(selectors.length){
                View.removeClassFromSelector(selectors[position]);
            }
        },
    }
}

export function Seach(View){
    
    let currSelector = new Selectors(View);
    let domTree;

    return{
        handleSelectors(request) {
            currSelector.clear();

            if(domTree){
                domTree.clear();
            }

            currSelector = new Selectors(View);
            currSelector.newRequest(request);

            domTree = currSelector.getDOM();   
        },

        nextSelector() {
            currSelector.next();
            domTree = currSelector.getDOM();
        },

        prevSelector() {
            currSelector.prev();
            domTree = currSelector.getDOM();
        },

        topSelector() { 
            currSelector.turnOffButtons();
            domTree = domTree.elements('parent');
            domTree.class();
        },

        buttomSelector() { 
            currSelector.turnOffButtons();
            domTree = domTree.elements('child');
            domTree.class();  
        },

        leftSelector() { 
            currSelector.turnOffButtons();
            domTree = domTree.elements('psibling');
            domTree.class();
        },

        rightSelector(){
            currSelector.turnOffButtons();
            domTree = domTree.elements('nsibling');
            domTree.class();    
        },
    }
}