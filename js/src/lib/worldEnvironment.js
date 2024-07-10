import { ACESFilmicToneMapping, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";

/**
 * @typedef {{_node: null | HTMLElement}} ParentReference
 */


/**
 * @typedef {{
 *  renderer: WebGLRenderer,
 *  camera: PerspectiveCamera
 *  scene: Scene,
 *  parent: ParentReference
 *  attach: (node?:HTMLElement)=>void
 *  _cleanup:()=>void
 * }} WorldEnvironment
 */


/**
 * @about Handles the basic setup of an empty threejs scene that automatically sizes/resizes to the browser window's current size. 
 * @returns {WorldEnvironment} A world environment (scene,renderer, and camera) which sizes automatically to the browser window dimensions
 */
export function getWorldEnvironment(){
    let parent = {_node:null}
    const renderer = new WebGLRenderer();
    const scene = new Scene();
    const camera = new PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.outputColorSpace = SRGBColorSpace;
    document.body.appendChild(renderer.domElement);
    

    function handleSize(){
        renderer.setSize(window.innerWidth,window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

    }
    handleSize() 
    window.addEventListener("resize",handleSize);

    function _cleanup(){
        if(parent._node !== null) {
            renderer.domElement.remove();
            parent._node = null;
        }
        window.removeEventListener("resize",handleSize);
        console.log("Removed environment from scene")
    }

    function attach(node=document.body){
        parent._node = node
        node.appendChild(renderer.domElement);
        console.log(renderer.domElement)
    }

    return { renderer, scene, camera, parent, attach, _cleanup }
    






}