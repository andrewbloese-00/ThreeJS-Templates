import './style.css'
import { getWorldEnvironment } from './lib/worldEnvironment'
import { BoxGeometry, MeshBasicMaterial, Mesh, DoubleSide, Vector3  } from 'three'


//config framerate and Rotation spee
const FPS = 60, R = 0.001

function main(){
  const {
    renderer,camera,scene, //threejs items
    parent, //the parent element of the renderer's dom element
    attach,_cleanup //methods to attach/detach the scene from the window
  } = getWorldEnvironment();
  
  //1. Attach renderer element to document
  attach()
  

  //EXAMPLE - cleanup scene on demand
  const cleanupBtn = document.querySelector("#cleanupBtn");
  cleanupBtn?.addEventListener("click",()=>{
    console.log('Removing renderer canvas from parent: ', parent._node?.tagName)
    _cleanup()
    cleanupBtn.remove()
  })

  

  //2. Place and orient the camera
  const target = new Vector3(10,10,10)
  camera.position.set(0,0,0)
  camera.lookAt(target)


  //3. place some object(s) into the scene
  const box = new Mesh(
    new BoxGeometry(5,5,5),
    new MeshBasicMaterial({ side: DoubleSide, color: 0xFF00FF, wireframe: true})
  )
  box.position.set(target.x,target.y,target.z)
  scene.add(box)


  //4. Create an animation loop
  function animate(){
    renderer.render(scene,camera)

    box.rotation.x += R
    box.rotation.y+= R

    setTimeout(()=>{
      requestAnimationFrame(animate)
    },1000/FPS)
  }

  //5. start scene 
  animate()
}

//run on page load
document.addEventListener("DOMContentLoaded", main)

