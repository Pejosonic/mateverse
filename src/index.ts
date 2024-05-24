import {
  AudioSource,
  engine,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { pickingGlassSystem } from './modules/beerGlass'
import { createBeerGlass, createTap, SyncEntityIDs } from './modules/factory'
import { setGaucho } from './modules/gaucho'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { NpcUtilsUi } from 'dcl-npc-toolkit'

export function main() {
  
  const beerGlassModel = 'assets/scene/mateSide.glb'
  createBeerGlass(beerGlassModel, Vector3.create(5, 1, 12), SyncEntityIDs.GLASS1)

  const sourceEntity = engine.addEntity()
  Transform.create(sourceEntity, {
    parent: engine.PlayerEntity,
    position: Vector3.Zero()
  })


  AudioSource.create(sourceEntity, {
    audioClipUrl: 'sounds/music.mp3',
    loop: true,
    playing: true,
    volume: 0.8
  })

  setGaucho()

  engine.addSystem(pickingGlassSystem)
  ReactEcsRenderer.setUiRenderer(NpcUtilsUi)
}
