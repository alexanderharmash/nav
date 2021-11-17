function DOMTree (selector) {

    const current = selector; 
    const parent = current.parentElement;
    const child = current.firstElementChild;
    const prevSibling = current.previousElementSibling;
    const nextSibling = current.nextElementSibling;

    return {
        current: current,
        parent: parent,
        child: child,
        prevSibling: prevSibling,
        nextSibling: nextSibling,
    };
}

export function Seach(View){

    let domTree;
    let selectors = [];
    let position = 0;

    function buttons(){
        let length = selectors.length;

        if (length && position != length - 1){
            View.selectorNext(false);
        }else{
            View.selectorNext(true);
        }
        
        if (position != 0){
            View.selectorPrev(false);
        }else{
            View.selectorPrev(true);
        }
    }

    function environment(){
        if(domTree){
            if (domTree.parent){
                View.navigationTop(false);
            }else{
                View.navigationTop(true);
            }

            if (domTree.child){
                View.navigationBottom(false);
            }else{
                View.navigationBottom(true);
            }

            if (domTree.prevSibling){
                View.navigationLeft(false);
            }else{
                View.navigationLeft(true);
            }

            if (domTree.nextSibling){
                View.navigationRight(false);
            }else{
                View.navigationRight(true);
            }
        }
    }

    function toggled(next){
        View.toggleHighlight(selectors[position]);
        View.toggleHighlight(selectors[next]);
    }

    function handleRequest(request){
        let selectors;

        if(request){
            selectors = document.querySelectorAll(request);
        }

        return selectors ? selectors : [];
    }

    return{
        handleSelectors(request){
            if(selectors.length){
                View.toggleHighlight(selectors[position]);
            }
            position = 0;

            selectors = handleRequest(request);
            
            if(selectors.length){
                View.toggleHighlight(selectors[position]);
                domTree = DOMTree(selectors[position]);
            }

            buttons();
        },

        nextSelector(){
            toggled(position++);
            domTree = DOMTree(selectors[position]);
            buttons();
            environment();
        },

        prevSelector(){
            toggled(position--);
            domTree = DOMTree(selectors[position]);
            buttons();
            environment();
        },

        topSelector(){
            domTree = DOMTree(domTree.parent);    
            environment();
        },

        buttomSelector(){
            domTree = DOMTree(domTree.child);    
            environment();
        },

        leftSelector(){
            domTree = DOMTree(domTree.prevSibling);
            environment();
        },

        rightSelector(){     
            domTree = DOMTree(domTree.nextSibling);
            environment(); 
        },
    }
}