import { PerspectiveCamera, Scene, WebGLRenderer } from "three"

type ParentReference = {
    _node: HTMLElement | null
} 


type FuncWorldEnvironmentCleanup = () => void
type FuncWorldEnvAttach = (node?:HTMLElement) => void
interface WorldEnvironment {
    renderer: WebGLRenderer
    scene: Scene
    camera: PerspectiveCamera
    parent: ParentReference
    attach: FuncWorldEnvAttach
    _cleanup: FuncWorldEnvironmentCleanup
} 


export function getWorldEnvironment():WorldEnvironment{
    let parent:ParentReference = { _node:null};
    const renderer = new WebGLRenderer();
    const scene = new Scene();
    const camera = new PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

    function setSize(){
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    
    setSize()
    window.addEventListener("resize", setSize)

    function attach(node=document.body){
        node.appendChild(renderer.domElement)
        parent._node = node
    }

    function _cleanup(){
        window.removeEventListener("resize", setSize);
        renderer.domElement.remove();
        parent._node = null;
    }
    return { renderer, scene, camera, parent, attach, _cleanup}
}