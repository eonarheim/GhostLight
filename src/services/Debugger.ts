import Vue from "vue"
import {Actor} from "/src/models/Actor"

export const Debugger = new class {
  run() {
    Vue.config.silent = true
    Vue.config.productionTip = false
    const debug = {
      Actor: Actor.all,
    }
    new Vue({el: "#debug", name: "Debug", data: debug})
  }

  executeTestCode() {
    // @ts-ignore
    window.Actor = Actor
    Actor.create({
      shape: {x: 0, y: 0, width: 50, height: 50},
      texture: "#888",
    })
    Actor.create({
      shape: {x: 100, y: 100, width: 50, height: 50},
      texture: "#888",
    })
  }
}