import React from "react"
import {observer} from "mobx-react-lite"
import {Grid} from "/src/services/Grid"
import {Camera} from "/src/services/Camera"
import {uDp} from "/src/helpers/utils"

export const GridView = observer(() => {
  const sizeX = Grid.sizeX * Camera.zoom
  const sizeY = Grid.sizeY * Camera.zoom
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: Grid.show ? 0.25 : 0,
        backgroundSize: `${sizeX}px ${sizeY}px`,
        backgroundImage: `
          linear-gradient(to right, white 0 ${ uDp() }px, transparent ${ uDp() }px),
          linear-gradient(to bottom, white 0 ${ uDp() }px, transparent ${ uDp() }px)
        `,
      }}
    ></div>
  )
})
GridView.displayName = nameof(GridView)
