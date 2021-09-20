import Vue from "vue"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"

export const Debugger = new class {
  run() {
    Vue.config.silent = true
    Vue.config.productionTip = false
    const debug = {
      Actor: Actor.all,
      App: App,
      Cursor: Cursor,
      Selection: Selection,
    }
    new Vue({el: "#debug", name: "Debug", data: debug})
  }

  executeTestCode() {
    // @ts-ignore
    window.Actor = Actor
    const a1 = Actor.create({
      shape: {
        x: Grid.sizeW * 2,
        y: Grid.sizeH * 2,
        width: Grid.sizeW,
        height: Grid.sizeH,
      },
      texture: {value: "#6B7280", opacity: 100},
    })
    Selection.set(a1)
    Actor.create({
      shape: {
        x: Grid.sizeW * 4,
        y: Grid.sizeH * 2,
        width: Grid.sizeW,
        height: Grid.sizeH,
      },
      texture: {value: "#6B7280", opacity: 100},
    })
  }
}
