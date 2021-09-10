import React from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"

export const DebugCursor = observer(() => {
  return (<>
      <div
        style={{
          position: "absolute",
          left: Cursor.pos.x,
          top: Cursor.pos.y,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          background: "red",
          opacity: 0.5,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          left: Cursor.posStart.x,
          top: Cursor.posStart.y,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          background: "cyan",
          opacity: 0.5,
        }}
      ></div>
    </>
  )
})

DebugCursor.displayName = nameof(DebugCursor)
