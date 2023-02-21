import React, { useRef } from 'react'
import { useEffect } from 'react';
import { BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three/src/Three';
const ThreeHello :React.FC = ()=>{
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        if(canvasRef.current){
            let startX:number
            let endX:number
            let startY:number
            let endY:number
            // 创建渲染器
            const renderer = new WebGLRenderer({canvas:canvasRef.current})
            // 创建镜头
            const  camera = new PerspectiveCamera(75,2,0.1,5)
            // 创建场景
            const scene = new Scene()
            // 创建几何体
            const geometry = new BoxGeometry(1,1,1)
            // 创建材质
            const material1 = new MeshPhongMaterial({color: 0x44aa88})
            const material2 = new MeshPhongMaterial({color: 0xbf2345})
            const material3 = new MeshPhongMaterial({color: 0x232355})
            // 创建网格
            const cube1 = new Mesh(geometry,material1)
            cube1.position.x= -2
            scene.add(cube1)
            const cube2 = new Mesh(geometry,material2)
            cube2.position.x = 0
            scene.add(cube2)
            const cube3 = new Mesh(geometry,material3)
            cube3.position.x = 2
            scene.add(cube3)
            const cubes = [cube1, cube2, cube3]
            // 创建光源
            const light = new DirectionalLight(0xFFFFFF,1)
            light.position.set(-1,2,4)
            scene.add(light)//场景添加光源
            // 设置相机的z轴位置 且必须子在，0.1-5中否则不能渲染
            camera.position.z = 3
            camera.position.y = -1
            // 渲染
            const render = (time:number)=>{
                time = time *0.001
                cubes.map(cube=>{
                    cube.rotation.x = time 
                    cube.rotation.y = time
                })
                renderer.render(scene,camera)
                window.requestAnimationFrame(render)
            }
            window.requestAnimationFrame(render)
            
            // window.addEventListener('mouseenter',(e)=>{
            //     console.log(e);
                
            // // var startX = e.target.    
            // })
            canvasRef.current.addEventListener('mousemove',(e)=>{

            })
            
            
            
            canvasRef.current.ontouchstart = (e)=>{
                 startX = e.targetTouches[0].pageX
                 startY = e.targetTouches[0].pageY
                console.log(e);
                
            }
            canvasRef.current.ontouchmove = (e)=>{
                 endX = e.targetTouches[0].pageX
                 endY = e.targetTouches[0].pageY
                if(endX>startX){
                    console.log(e);      
                }
                
            }
        }
    },[canvasRef])
    return <>
        <canvas ref={canvasRef}></canvas>
    </>
}
export default ThreeHello