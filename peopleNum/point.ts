const { ccclass, property } = cc._decorator;

@ccclass
export default class point extends cc.Component {
    num
    setPos(max) {
        this.node.y = this.num / max * this.node.parent.height
    }
}