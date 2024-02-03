import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


const gui = new GUI()

//cloase gui
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

//fog
const fog = new THREE.Fog('#262837',2,15)
scene.fog = fog

//texture
const textureLoader = new THREE.TextureLoader()

//wall texture
const WallColor = textureLoader.load('/textures/bricks/color.jpg')
const WallambientOcclusion = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const Wallnormal = textureLoader.load('/textures/bricks/normal.jpg')
const Wallroughness = textureLoader.load('/textures/bricks/roughness.jpg')
WallColor.colorSpace = THREE.SRGBColorSpace


//door texture
const DoorColor = textureLoader.load('/textures/door/color.jpg')
const Dooralpha = textureLoader.load('/textures/door/alpha.jpg')
const DoorambientOcclusion = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const Doorheight = textureLoader.load('/textures/door/height.jpg')
const Doormetalness = textureLoader.load('/textures/door/metalness.jpg')
const Doornormal = textureLoader.load('/textures/door/normal.jpg')
const Doorroughness = textureLoader.load('/textures/door/roughness.jpg')
DoorColor.colorSpace = THREE.SRGBColorSpace

//grass
const Grasscolor = textureLoader.load('/textures/grass/color.jpg')
const GrassambientOcclusion = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const Grassnormal = textureLoader.load('/textures/grass/normal.jpg')
const Grassroughness = textureLoader.load('/textures/grass/roughness.jpg')
Grasscolor.colorSpace = THREE.SRGBColorSpace



Grasscolor.repeat.set(8,8)
Grasscolor.wrapS = THREE.RepeatWrapping
Grasscolor.wrapT = THREE.RepeatWrapping


GrassambientOcclusion.repeat.set(8,8)
GrassambientOcclusion.wrapS = THREE.RepeatWrapping
GrassambientOcclusion.wrapT = THREE.RepeatWrapping

Grassnormal.repeat.set(8,8)
Grassnormal.wrapS = THREE.RepeatWrapping
Grassnormal.wrapT = THREE.RepeatWrapping

Grassroughness.repeat.set(8,8)
Grassroughness.wrapS = THREE.RepeatWrapping
Grassroughness.wrapT = THREE.RepeatWrapping







//house
const House = new THREE.Group()
scene.add(House)


//walls
const Walls  = new THREE.Mesh(
    new THREE.BoxGeometry(4,3,4),
    new THREE.MeshStandardMaterial({
        map:WallColor,
        aoMap:WallambientOcclusion,
        normalMap:Wallnormal,
        roughnessMap:Wallroughness
    })
)

Walls.position.y = 1.5


//roof
const roof =new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color:"red"})
)


roof.position.y = 3.5
roof.rotation.y = Math.PI /4


//Door
const Door = new THREE.Mesh(
    new THREE.PlaneGeometry(2,2,100,100),
    new THREE.MeshStandardMaterial({
        map:DoorColor,
        transparent:true,
        alphaMap:Dooralpha,
        aoMap:DoorambientOcclusion,
        displacementMap:Doorheight,
        displacementScale:0.2,
        normalMap:Doornormal,
        metalnessMap:Doormetalness,
        roughnessMap:Doorroughness
    })
)

Door.position.y = 1
Door.position.z = 2.01



//Plant
const Plant1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,16,16),
    new THREE.MeshStandardMaterial({color:"green"})
)

//Plant
const Plant2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.4,16,16),
    new THREE.MeshStandardMaterial({color:"green"})
)

//Plant
const Plant3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.3,16,16),
    new THREE.MeshStandardMaterial({color:"green"})
)

//Plant
const Plant4 = new THREE.Mesh(
    new THREE.SphereGeometry(0.2,16,16),
    new THREE.MeshStandardMaterial({color:"green"})
)



Plant1.position.x = 2
Plant1.position.y = 0.2
Plant1.position.z = 3
Plant2.position.x = 1.5
Plant2.position.z = 3

Plant3.position.x = -1
Plant3.position.y = 0.2
Plant3.position.z = 2.5

Plant4.position.x = -1.5
Plant4.position.y = 0.2
Plant4.position.z = 2.5

House.add(Plant1,Plant2,Plant3,Plant4,Walls,roof,Door)


//Grave

const Grave = new THREE.Group() 
scene.add(Grave)

const GraveMesh = new THREE.BoxGeometry(0.7,1,0.3)
const GraveMetrial = new THREE.MeshStandardMaterial({color:"white"})


for(let i=0 ; i<=40 ; i++){
    const Angle = Math.random() * Math.PI * 2
    const radius  = 3 + Math.random(Angle) * 6
    const x = Math.sin(Angle) * radius
    const z = Math.cos(Angle) * radius
    const graves = new THREE.Mesh(GraveMesh,GraveMetrial)
    graves.position.set(x,0.5,z)
    graves.rotation.y = (Math.random() -0.5) * 0.4
    Grave.add(graves)
    graves.castShadow =true
}


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map:Grasscolor,
        aoMap:GrassambientOcclusion,
        normalMap:Grassnormal,
        roughnessMap:Grassroughness
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

//door light
const doorlight = new THREE.PointLight("#ff7d46",5,7)
doorlight.position.set(0,2.2,3)
House.add(doorlight)

//ghost
const ghost1 = new THREE.PointLight('#0e813c',12,16)
House.add(ghost1)

const ghost2 = new THREE.PointLight('#B7A6C9',12,16)
House.add(ghost2)

const ghost3 = new THREE.PointLight('#DF388D',12,16)
House.add(ghost3)

// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.162)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)



//sizes
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


//camera
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//rendder
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

renderer.shadowMap.enabled = true
moonLight.castShadow =true
doorlight.castShadow =true
ghost1.castShadow =true
ghost2.castShadow =true
ghost3.castShadow =true
Walls.castShadow =true
roof.castShadow =true
Plant1.castShadow =true
Plant2.castShadow =true
Plant3.castShadow =true
Plant4.castShadow =true

floor.receiveShadow =true


//animation
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const ghost1angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1angle) * 4
    ghost1.position.z = Math.sin(ghost1angle) * 4


    const ghost2angle = elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2angle) * 5
    ghost2.position.z = Math.sin(ghost2angle) * 5


    const ghost3angle = elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3angle) * 7
    ghost3.position.z = Math.sin(ghost3angle) * 7


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()