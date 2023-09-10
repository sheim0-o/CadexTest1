import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    10000
);
camera.position.set(10, 15, 17);

export function setModel(parentElem, options){
    if (!parentElem)
        return;
    if (parentElem.childNodes.length > 0)
    {
        parentElem.innerHTML = '';
    }
        

    // setup //
    const renderer = new THREE.WebGLRenderer({ });
    renderer.setSize(window.innerWidth, window.innerHeight);
    parentElem.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    /// geometry ///

    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    /// create cone by verticles ///

    var [positions,normals] = triangulation(options.height, options.radius, options.radialSegments);

    console.log(positions)
    console.log(normals)
	const geometry = new THREE.BufferGeometry();

	geometry.setAttribute(
		'position',
		new THREE.BufferAttribute( new Float32Array( positions ), 3 ) 
    );
    geometry.setAttribute(
		'normal',
		new THREE.BufferAttribute( new Float32Array( normals ), 3 ) 
    );
    // geometry.computeVertexNormals();
    
    const coneGeometry = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial(
            { 
                color: 0xff0000, 
                side: THREE.DoubleSide,
                wireframe:false
        })
    );
    scene.add(coneGeometry)

    /// add light ///


    const ambLight = new THREE.AmbientLight(0x555555)
    scene.add(ambLight)
    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
    dirLight.position.set(100,100,100)
    scene.add(dirLight)
	

    /// render ///


    animate();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
}


function triangulation(H=4, R=4, N=4){
    let A = [0,H,0];
    let B = [0,-(R**2)/H,0];
    let NullPoint = [0,0,0];

    function getPi (i) {
        return [
            R * Math.cos((2 * Math.PI) * i / N), 
            0, 
            R * Math.sin((2 * Math.PI) * i / N)
        ];
    }

    function getNi (Pi, frontSide=true) {
        var Ni = []
        if(frontSide){
            Ni = [
                Pi[0] - B[0],
                Pi[1] - B[1],
                Pi[2] - B[2]
            ];
        }
        else {
            Ni = [
                B[0] - Pi[0],
                B[1] - Pi[1],
                B[2] - Pi[2]
            ];
        }


        var NiMagnitude = Math.sqrt(
            Math.pow(Ni[0], 2) +
            Math.pow(Ni[1], 2) +
            Math.pow(Ni[2], 2)
        );

        var Ni = [
            Ni[0]/NiMagnitude, 
            Ni[1]/NiMagnitude, 
            Ni[2]/NiMagnitude
        ];

        return Ni;
    }

    var vertices = []
    var normals = []


    for (let i = 0; i < N; i++) {
        var p1 = getPi(i);
        var p2 = getPi(i+1);
        
        vertices.push(...p1);      
        vertices.push(...A);
        vertices.push(...p2);

        vertices.push(...p1);
        vertices.push(...[0,0,0]);
        vertices.push(...p2);


        normals.push(...getNi(p1));
        normals.push(...getNi(A));
        normals.push(...getNi(p2));
        
        normals.push(...getNi(p1, false));
        normals.push(...getNi(NullPoint, false));
        normals.push(...getNi(p2, false));
    }
    return [vertices, normals]
}