export default class SelectionManager {
    constructor(creator){
        this.creator=creator;
        this.selectionCreator=new creator();
    }
    setNext(point){
        this.selectionCreator.setNextPoint(point);
    }
    setCurrent(point){
        this.selectionCreator.setCurrent(point);
        
    }
    getSelectionShape(){
        return this.selectionCreator.getShape();
    }
    reset(){
        this.selectionCreator=new this.creator();
    }
}