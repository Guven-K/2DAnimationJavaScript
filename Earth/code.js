document.addEventListener("DOMContentLoaded", function () {
  // This is the 3D section.
  // Create scene for 3D content.
  var scene3D = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  // load a 2D background for 3D scene
  const bgTexture = loader.load('stars.jpg');
  scene3D.background = bgTexture;
  // This sets window size.
  var width = 800;
  var height = 600;

  // Create perspective camera. Make it to look to origin.
  var camera3D = new THREE.PerspectiveCamera(45, width / height, 1, 500);
  camera3D.position.set(0, 0, 5);
  camera3D.lookAt(scene3D.position);

  // Create renderer.
  var renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setSize(width, height);
  renderer.autoClear = false;
  document.body.appendChild(renderer.domElement);

  // Create light
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 50, 50);
  scene3D.add(light);

  // create a textured sphere
  var geometry = new THREE.SphereGeometry( 1.5, 20, 20 );
  const spherematerial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: loader.load('earth_640x320.jpg'),
  });
  var sphere = new THREE.Mesh(geometry, spherematerial);
  scene3D.add( sphere );

  // This is the 2D section
  // Create a 2D canvas, size it, and create a 2D context 
  var canvas2D = document.createElement('canvas');
  canvas2D.width = width;
  canvas2D.height = height;

  // create a 2D context 
  var ctx2D = canvas2D.getContext('2d');
  // set the font and alignment ready to draw 2D text
  ctx2D.font = "Normal 40px Comic Sans MS";
  ctx2D.textAlign = 'center';

  // Create the orthographic camera and set the viewport to match the screen dimensions.
  var camera2D = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 30);

  // Create a custom scene for 2D.
  scene2D = new THREE.Scene();

  // Create 2D texture from graphics on canvas.
  var texture2D = new THREE.Texture(canvas2D)
  texture2D.needsUpdate = true;

  // Create 2D material.
  var material = new THREE.MeshBasicMaterial({ map: texture2D });
  material.transparent = true;

  // Create plane to render the 2D scene onto. This plane fills the screen.
  var planeGeometry = new THREE.PlaneGeometry(width, height);
  var plane = new THREE.Mesh(planeGeometry, material);
  scene2D.add(plane);
 
  // Loop rendering the 2 scenes.
  function animate() {
    // Rotate 3D sphere.
    sphere.rotation.y -= -0.01/2;

    // Draw 2D graphics.
    ctx2D.clearRect(0, 0, width, height);

    // Text for Movie Title
    ctx2D.fillText("Alien The Movie", width / 2, 50);
    ctx2D.fillStyle='yellow';
    
    // Text for release title 
    ctx2D.strokeStyle='red';
    ctx2D.strokeText("Coming this fall 2021", width / 2, 570); 
    
    // flag that 2D texture has changed
    texture2D.needsUpdate = true;
    // Render the 3D scene.
    renderer.render(scene3D, camera3D);
    // Render 2D on top of the 3D scene.
    renderer.render(scene2D, camera2D);
    // Request new frame.
    requestAnimationFrame(animate);
  };


  // Start animation.
  animate();

});