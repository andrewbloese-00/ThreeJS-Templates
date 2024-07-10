import '../style.css'
import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { getWorldEnvironment } from './lib/worldEnvironment'

//How to use...
function main(){
    const { 
        renderer,scene,camera, //threejs items
        parent, // holds reference to parent of renderer's domElement (once attached)
        attach, //attach renderer to some dom element (defaults to document.body)
        _cleanup //remove window resize listener and 'detach' the renderer's domElement from parent node
    } = getWorldEnvironment()
    attach() 


    //example for cleaning scene
    const cleanupBtn = document.querySelector("#cleanupBtn")
    cleanupBtn?.addEventListener("click",()=>{
        _cleanup();
        cleanupBtn.remove()
    })

    
    //position the camera
    const targetPos = new Vector3(10,10,10)
    camera.position.set(0,0,0)
    camera.lookAt(targetPos)

    //add stuff to the scene...
    const box = new Mesh(
        new BoxGeometry(5,5,5,2,2,2),
        new MeshBasicMaterial({color: 0xff00ff, wireframe: true, side:DoubleSide})
    )
    box.position.set(targetPos.x,targetPos.y,targetPos.z);
    scene.add(box)

    //define an animation function 
    function animate(){
        renderer.render(scene,camera)
        box.rotation.y += 0.001
        box.rotation.x += 0.001

        //consistent frames
        setTimeout(()=>{
            requestAnimationFrame(animate)
        }, 1000/60) //1000ms/<fps>
    }

    animate();



}

document.addEventListener("DOMContentLoaded",main)








