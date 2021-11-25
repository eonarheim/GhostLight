import {ProjectFs} from "/src/services/FileSystem/ProjectFs"
import {makeAutoObservable} from "mobx"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {Actor} from "/src/models/Actor"
import {uImage, uRange} from "/src/helpers/utils"
import demoScene from "/gitignore/demo/.ghostlight/scenes/level-01.json?raw"
import demoSceneTypes from "/gitignore/demo/.ghostlight/types/types.json?raw"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {Type} from "/src/models/Type"
import {History} from "/src/services/History"
import {TypesFs} from "/src/services/FileSystem/TypesFs"

import sceneJson from "/gitignore/demo/.ghostlight/scenes/parseme.json?raw"
import typesJson from "/gitignore/demo/.ghostlight/types/types.json?raw"
import {glParse} from "/src/parser/glParse"
import {Config} from "/src/models/Config"
import {Grid} from "/src/services/Grid"

if (import.meta.hot) {
  // prevent reload when demo scene saved
  import.meta.hot.accept("/gitignore/demo/.ghostlight/scenes/level-01.json?raw", (x) => null)
  import.meta.hot.accept("/gitignore/demo/.ghostlight/scenes/parseme.json?raw", (x) => null)
  import.meta.hot.accept("/gitignore/demo/.ghostlight/types/types.json?raw", (x) => null)
}

export const Debugger = new class {
  active = false
  frames = [performance.now()]
  delta = 16
  fps = 60

  constructor() {
    makeAutoObservable(this)
    // @ts-ignore
    window.d = this
  }

  glParse() {
    const sceneJson = JSON.stringify({
      config: Config,
      grid: Grid,
      actors: Actor.all,
    })
    const typesJson = JSON.stringify(Type.all)
    const scene = glParse(sceneJson, typesJson)
    console.log(scene)
  }

  parseTest() {
    const scene = glParse(sceneJson, typesJson)
    console.log(scene.actors[0].id)
    console.log(scene)
  }

  run() {
    // return
    this.active = true
    ProjectFs.isOpen = true
    this.loadDemoScene()
    // this.testManyActors()
    // this.typesDemo()
  }

  performance(frame: number) {
    this.frames = this.frames.filter(x => x > performance.now() - 999)
    this.frames.unshift(frame)
    this.delta = frame - this.frames[1]
    this.fps = this.frames.length
  }

  async typesDemo() {
    // return
    const assets = Object.keys(import.meta.glob("/public/*")).map((x) => x.replaceAll("/public/", ""))
    for (const asset of assets) {
      AssetsFs.map.set(asset, await uImage(asset))
    }
    Type.create({name: "lorem"})
    Type.active.value = Type.create({name: "ipsum", texture: "#059669"})
    Type.create({name: "dolor", texture: "#2563EB"})
    Type.create({name: "alpha", texture: "#D97706"})
    Type.create({name: "beta", texture: "#4F46E5"})
    Type.create({name: "gamma", texture: "#DB2777"})
    Type.create({
      name: "Player",
      texture: "Player.png",
      resize: "Disabled",
      width: 16,
      height: 16,
    })
    Type.create({
      name: "Wall",
      texture: "Wall.png",
      resize: "Repeat",
      width: 16,
      height: 16,
    })
    Type.create({
      name: "Block",
      texture: "Block.png",
      resize: "Disabled",
      width: 16,
      height: 16,
    })
    Type.create({
      name: "Cobblestone",
      texture: "Cobblestone.png",
      resize: "Disabled",
      width: 32,
      height: 32,
    })

    History.reset(Actor.all)
  }

  async loadDemoScene() {
    const assets = Object.keys(import.meta.glob("/public/*")).map((x) => x.replaceAll("/public/", ""))
    for (const asset of assets) {
      AssetsFs.map.set(asset, await uImage(asset))
    }
    TypesFs.load(demoSceneTypes)
    SceneFs.load(demoScene)
  }
}
