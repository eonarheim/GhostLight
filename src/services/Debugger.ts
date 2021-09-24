import Vue from "vue"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"
import {Textures} from "/src/services/Textures"

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
    // Actor.create({
    //   shape: {
    //     x: Grid.sizeX * 2,
    //     y: Grid.sizeY * 2,
    //     width: Grid.sizeX,
    //     height: Grid.sizeY,
    //   },
    //   texture: {value: "#6B7280", opacity: 100},
    // })
    Actor.create({
      shape: {
        x: Grid.sizeX * 4,
        y: Grid.sizeY * 4,
        width: Grid.sizeX,
        height: Grid.sizeY,
      },
      texture: {value: "Player.png", opacity: 100},
    })
    // Actor.create({
    //   shape: {
    //     x: Grid.sizeX * 6,
    //     y: Grid.sizeY * 2,
    //     width: Grid.sizeX,
    //     height: Grid.sizeY,
    //   },
    //   texture: {value: "Wall.png", opacity: 100},
    // })
    Selection.set(Actor.all[0])
    //
    Textures.map.set('Player.png','/Player.png')
    Textures.map.set('Wall.png','/Wall.png')
    Textures.map.set('Key.png','/Key.png')
    Textures.map.set('Lock.png','/Lock.png')
    Textures.map.set('Potion.png','/Potion.png')
    Textures.map.set('Skeleton.png','/Skeleton.png')
    Textures.map.set('Sign.png','/Sign.png')
    Textures.map.set('Block.png','/Block.png')
    Textures.map.set('Pillar.png','/Pillar.png')
    //
  }
}
