import point from "./point";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollTab extends cc.Component {
    @property(cc.ScrollView)
    scorll:cc.ScrollView = null
    @property(cc.Prefab)
    point:cc.Prefab
    private pointList:point[] = []
    private curX = 0
    private maxNum = 0
    large(){

    }
    small(){
        
    }
    addPoint(num){
        if(this.maxNum <num){
            this.changeMaxNum(num)
        }
        let p = cc.instantiate(this.point)
        p.parent =this.scorll.content
        p.x = this.curX
        this.curX += 4
        if(this.scorll.content.width < this.curX){
            this.scorll.content.width = this.curX*1.5
            this.scorll.content.x = -this.curX
        }
        let script:point = p.getComponent(point)
        script.num = num
        script.setPos(this.maxNum)
        this.pointList.push(script)
    }
    changeMaxNum(num){
        this.maxNum = num*1.4
        for(let key in this.pointList){
            this.pointList[key].setPos(this.maxNum)
        }
    }
    
}