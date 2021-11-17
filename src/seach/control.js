export function SeachControler(Elements, Seach) {
    return {
        setController(){
            Elements.selectorFind.addEventListener('click', () => {
                let request = Elements.seachField.value;
                Seach.handleSelectors(request);
            });
        
            Elements.selectorNext.addEventListener('click', () => {
                Seach.nextSelector();
            });
        
            Elements.selectorPrev.addEventListener('click', () => {
                Seach.prevSelector();
            });
        
            Elements.navigationTop.addEventListener('click', () => {
                Seach.topSelector();
            });
        
            Elements.navigationBottom.addEventListener('click', () => {
                Seach.buttomSelector();
            });
        
            Elements.navigationLeft.addEventListener('click', () => {
                Seach.leftSelector();
            });
        
            Elements.navigationRight.addEventListener('click', () => {
                Seach.rightSelector();
            });
        }
    }
}