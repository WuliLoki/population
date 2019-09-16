import Person from "./person";
import ScrollTab from "./ScrollTab";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enviroment extends cc.Component {
    @property(ScrollTab)
    scroll:ScrollTab = null
    TEC = 1//生产力
    TOTAL = 0//资源上限
    RES = 0//总资源
    ARES = 0//平均资源
    NUM = 0//总人口
    Human: Person[] = []
    Year = 0//生存时间
    gap = 0
    tecGap = 0
    TecSpeed = 100//生产力升级间隔
    hungerdead = 0
    maxNum = 0
    minNUm = 9999999
    preMinYear = 0
    preNum
    preIsSmaller = false
    rest() {
        this.Year = 0
        this.TEC = 10
        this.TOTAL = 10000
        this.Human = []
        this.NUM = 1850
        this.RES = this.TOTAL - Math.pow(this.TOTAL, 2) / (this.NUM * this.TEC + this.TOTAL)
        this.ARES = this.RES / this.NUM
        for (let i = 0; i < this.NUM; i++) {
            let person: Person = new Person(this)
            if (i > this.NUM/2) {
                person.sex = 0
            }
            else {
                person.sex = 1
            }
            this.Human.push(person)
        }
    }

    update(dt) {
        if (this.NUM == 0) {
            return
        }
        // this.gap += dt
        // if (this.gap > 0.1) {
        this.gap = 0
        this.Year++
        this.TecGrow()
        this.NUM = this.Human.length
        this.RES = this.TOTAL - Math.pow(this.TOTAL, 2) / (this.NUM * this.TEC + this.TOTAL)
        this.ARES = this.RES / this.NUM
        for (let key in this.Human) {
            this.Human[key].grow(this.ARES)
            if (!this.Human[key].isAlive) {
                this.Human.splice(parseInt(key), 1)
                continue
            }
            let person = this.Human[key].getChild()
            if (person) {
                this.Human.push(person)
            }
        }
        if (this.preIsSmaller && this.preNum < this.NUM) {
            this.preIsSmaller = false
            console.log("人口变化周期：" + (this.Year - this.preMinYear))
            this.preMinYear = this.Year
        }
        this.preIsSmaller = this.NUM < this.preNum
        this.preNum = this.NUM
        if (this.maxNum < this.NUM) {
            this.maxNum = this.NUM
            console.log(this.Year+"年出现新最大人口数:" + this.maxNum)
        }
        if (this.minNUm > this.NUM && this.Year > 500) {
            this.minNUm = this.NUM
            console.log(this.Year+"年出现新最小人口数:" + this.minNUm)
        }
        if (this.Year % 5 == 0) {
            this.scroll.addPoint(this.NUM)
            console.log(this.Year + "年,总人口：" + this.NUM + ",人均资源:" + this.ARES)
            this.peopleConsturct()
        }
        // }
    }
    peopleConsturct() {
        let child = 0
        let aldut = 0
        let old = 0
        let canPernmentWoman = 0
        for (let i = 0; i < this.Human.length; i++) {
            if (this.Human[i].age < 20) {
                child++
            } else if (this.Human[i].age <= 60) {
                aldut++
                if (this.Human[i].age < 40 && this.Human[i].getChildAge.length > 0) {
                    canPernmentWoman++
                }
            } else {
                old++
            }
        }
        console.log("人口结构\n孩子：" + child + "\n成人:" + aldut + "\n可生育人数：" + canPernmentWoman + "\n老人:" + old)
    }
    TecGrow() {
        this.tecGap++
        if (this.tecGap >= this.TecSpeed) {
            this.tecGap = 0
            this.TEC++
            console.log(this.Year+"年饿死:" + this.hungerdead + "人")
            this.hungerdead = 0
        }
    }

}
