module HelloWorld{
    export class App{
        private canvas: HTMLCanvasElement;
        private engine: BABYLON.Engine;

        public Run(): void{
            this.canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight-8;            

            this.engine = new BABYLON.Engine(this.canvas, true);            
            this.engine.resize();

            var scene = this.createScene();
            this.engine.runRenderLoop(function(){
                scene.render();
            });

            var eng = this.engine;
            window.addEventListener("resize", function(){
                eng.resize();
            });
        }

        private createScene(): BABYLON.Scene {
            var scene = new BABYLON.Scene(this.engine);             
            
            scene.clearColor = new BABYLON.Color4(0, 0, 0.2, 1.0);

            var camera = new BABYLON.VRDeviceOrientationFreeCamera("vrCam", new BABYLON.Vector3(2.5, 1, 2.5), scene, true);            
            //var camera = new BABYLON.ArcRotateCamera("Camera", 1.0, 1.0, 12, new BABYLON.Vector3(2.5, 1, 2.5), scene);
            camera.attachControl(this.canvas, false);       

            var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
            light.groundColor = new BABYLON.Color3(.5, 0., .5);

            var box = BABYLON.Mesh.CreateBox("mesh", 3, scene);
            box.position = new BABYLON.Vector3(0, 2, 0);
            box.showBoundingBox = true;            

            var cyl = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop: 0, tessellation: 4}, scene);
            cyl.position = new BABYLON.Vector3(4, 2, 4);
            cyl.showBoundingBox = true;

            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
            sphere.position = new BABYLON.Vector3(0, 2, 4);

            var material = new BABYLON.StandardMaterial("std", scene);
            material.diffuseColor = new BABYLON.Color3(.5, 0, .5);
            box.material = material;
            cyl.material = material;
            sphere.material = material;

            // var floor = BABYLON.Mesh.CreateGround("floor", 100, 100, 1, scene, false);            

            return scene;
        }
    }
}