import BrickSvg from "./assets/brick.svg"
import AnimalSvg from "./assets/animal.svg"
import WindowSvg from "./assets/window.svg"
import ReticleSvg from "./assets/reticle.svg"

function loadSvg(imagePath: string): HTMLImageElement {
    const result = new Image()
    result.src = imagePath
    return result
}

export const BricksImage = loadSvg(BrickSvg)
export const AnimalImage = loadSvg(AnimalSvg)
export const WindowImage = loadSvg(WindowSvg)
export const ReticleImage = loadSvg(ReticleSvg)
