import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene();

const playerCar = Car()
scene.add(playerCar)

// LIGHTS

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

//add directional light

const dirLight = new THREE.DirectionalLight(0xffffff,0.6)
dirLight.position.set(100, -300, 400)
scene.add(dirLight)



//RESIZER

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// CAMERA

const aspectRatio = window.innerWidth/window.innerHeight
const cameraWidth = 150
const cameraHeight = cameraWidth / aspectRatio

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2

camera.position.set(200,-200,300)
camera.up.set(0,0,1)
camera.lookAt(0,0,0)


// RENDERER

const renderer = new THREE.WebGL1Renderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)

// CAR

function Car(){
    const car = new THREE.Group()
    
    const backwheel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12,33,12),
        new THREE.MeshLambertMaterial({color: 0x333333})
    )

    backwheel.position.z = 6
    backwheel.position.x = -18

    car.add(backwheel)

    const frontwheel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12,33,12),
        new THREE.MeshLambertMaterial({color: 0x333333})
    )

    frontwheel.position.z = 6
    frontwheel.position.x = 18

    car.add(frontwheel)

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60,30,15),
        new THREE.MeshLambertMaterial({color: 0xa52523})
    )

    main.position.z=12

    car.add(main)

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33,24,12),
        new THREE.MeshLambertMaterial({color: 0xffffff})
    )

    cabin.position.x = -6
    cabin.position.z = 25.5

    car.add(cabin)

    return car

}