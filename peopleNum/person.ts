import Enviroment from "./Enviroment";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Person {
    age = 0
    sex = 0
    married = false
    isAlive = true
    resConsume = 1
    maxAge = 80
    totalRes = 0
    maxProduceAge = 60
    minProduceAge = 20
    minChildAge = 20
    maxChildAge = 30
    getChildAge = []
    echChild = 2
    Env: Enviroment = null
    constructor(ev) {
        this.Env = ev
        this.echChild = Math.floor(this.Env.ARES)

        if (this.sex == 0) {
            for (let i = 0; i < this.echChild; i++) {
                let age = this.minChildAge + i
                if (age < this.maxChildAge) {
                    this.getChildAge.push(age)
                }
            }
        }

        let sex = Math.random()
        if (sex >= 0.5) {
            this.sex = 0
        }
        else {
            this.sex = 1
        }
    }
    isRandomTure(target) {
        let num = Math.random()
        if (num < target) {
            return true
        }
        else {
            return true
        }
    }
    marry() {
        this.married = true
    }
    getChild(): Person {
        if (this.sex != 0) {
            return
        }
        for (let key in this.getChildAge) {
            if (this.age == this.getChildAge[key]) {
                this.getChildAge.splice(parseInt(key), 1)
                return new Person(this.Env)
            }
        }
        return null
    }
    grow(res) {
        this.totalRes += res
        this.age++
        if (this.age > 80) {
            this.isAlive = false
            return
        }
        this.isAlive = this.consume()

    }
    consume(): boolean {
        this.totalRes -= this.resConsume
        if (this.totalRes < 0) {
            this.Env.hungerdead++
            return false
        }
        return true
    }
    produce() {

    }
}
