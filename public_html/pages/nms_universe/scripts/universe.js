window.onload = function(){
var width = window.innerWidth,
    height = window.innerHeight,
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(90,width/height,1,3000),
    renderer = new THREE.WebGLRenderer(),
    countClouds = 40,
    countStars = 600,
    STARS = [],
    stars = [],
    CLOUDS = [],
    clouds = [];
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);
document.body.style.margin = 0;
scene.fog = new THREE.Fog( 0x000000, 1, 900 );

var spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( -40, 60, -10 );
        spotLight.castShadow = true;
        scene.add( spotLight );

while (countStars--) {
    stars.push({
      x: Math.random() * (200 - -200)+ -200,
      y: Math.random() * (200 - -200)+ -200,
      z: Math.random() * (-1 - -1200) + -1200
    });
};


function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setSize(width,height);
}

var stGeometry = new THREE.CircleGeometry(0.8,12),
stTexture = new THREE.TextureLoader().load('images/sun_2.png'),
stMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:stTexture,transparent: true, overdraw: true});

function starGen() {
      function star(x,y,z,) {
        var  st = new THREE.Mesh(stGeometry,stMaterial);
        scene.add(st);
        st.position.set(x,y,z);
        STARS.push(st);
      }
  var u = stars.length;
    while(u--) {
      star(stars[u].x,stars[u].y,stars[u].z);
    }
 }

 function starAnimate() {
    var sl = STARS.length;
    while(sl--) {
      var dz = 3;
    STARS[sl].position.z+=dz;
      if (STARS[sl].position.z>19) {
        STARS[sl].position.z = -1200;
      }
    }
 }
function sunGen() {
  var sunGeometry = new THREE.CircleGeometry(2, 30),
      sunTexture = new THREE.TextureLoader().load('images/sun_3.png'),
      sunMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:sunTexture, transparent: true,  overdraw: true}),
      sun = new THREE.Mesh(sunGeometry,sunMaterial);
      scene.add(sun);
      sun.position.set(-12,0,-20);
      var rayRoundGeometry = new THREE.PlaneGeometry(50,50,2),
      rayRoundTexture = new THREE.TextureLoader().load('images/rouns_rays_1.png'),
      rayRoundMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, opacity:0.2, map:rayRoundTexture,transparent: true, overdraw: true}),
      rayRound = new THREE.Mesh(rayRoundGeometry,rayRoundMaterial);
      scene.add(rayRound);
      rayRound.position.set(-12,0,-20);
}
function rayGen() {
  var rayGeometry = new THREE.PlaneGeometry(50,4,2),
      rayTexture = new THREE.TextureLoader().load('images/rays_1.png'),
      rayMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:rayTexture,transparent: true, overdraw: true}),
      ray = new THREE.Mesh(rayGeometry,rayMaterial);
      scene.add(ray);
      ray.position.set(-12,0,-20);
      var rayBigGeometry = new THREE.PlaneGeometry(50,4,2),
      rayBigTexture = new THREE.TextureLoader().load('images/rays_2.png'),
      rayBigMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:rayBigTexture,transparent: true, overdraw: true}),
      rayBig = new THREE.Mesh(rayBigGeometry,rayBigMaterial);
      scene.add(rayBig);
      rayBig.position.set(-12,0,-20);

}
function textGen() {
  var textGeometry = new THREE.PlaneGeometry(51.2,25.6,2),
      textTexture = new THREE.TextureLoader().load('images/nms_text_2.png'),
      textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:textTexture, transparent: true,  overdraw: true}),
      text = new THREE.Mesh(textGeometry,textMaterial);
      scene.add(text);
      text.position.set(-0 ,0,-20);
}

var cr = 1,
    cg = 3,
    cb = 5,
    r =  120,
    g =  20,
    b =  220;
function ranColor() {
  r-=cr;
  g-=cg;
  b-=cb;
  if(r<7 || r>240) {
     cr=-cr;
     };
  if(g<7 || g>240) {
     cg=-cg;
     };
  if(b<7 || b>240) {
     cb=-cb;
     };
   var red   = Math.floor(r),
       green = Math.floor(g),
       blue  = Math.floor(b);
       return( 'rgb' + '(' + red + ',' + green + ',' + blue + ')');
}
//CLOUD
var   cloudGeometry = new THREE.PlaneGeometry(400,300,2),
      cloudTexture = new THREE.TextureLoader().load('images/cloud_2.png'),
      cloudBGMaterial = new THREE.MeshBasicMaterial({color: ranColor(),
                                                    map:cloudTexture, 
                                                    transparent: true, 
                                                    overdraw: true}),
      cloudBG = new THREE.Mesh(cloudGeometry,cloudBGMaterial);
      scene.add(cloudBG);
;
var cloudx = 0,
    cloudy = 0,
    cloudz = -20;
    cloudv = 0.01;
    cloudBG.position.set(cloudx,cloudy,cloudz);
while(countClouds--) {
  clouds.push({
    x: Math.random() * (200 - -200)+ -200,
    y: Math.random() * (200 - -200)+ -200,
    z: Math.random() * (-1 - -1200) + -1200
  });
}
function cloudgen() {
 var i = clouds.length;
 while(i--){
  var cloudMaterial = new THREE.MeshBasicMaterial({ 
    color: ranColor(),
    map:cloudTexture, 
    transparent: true, 
    overdraw: true});
  cloud = new THREE.Mesh(cloudGeometry,cloudMaterial);
  cloud.position.set(clouds[i].x,clouds[i].y,clouds[i].z);
  scene.add(cloud);
  CLOUDS.push(cloud);
 };
};

function cloudAnimate() {
  cloudBG.position.z+=cloudv;
  if(cloudBG.position.z > -2 || cloudBG.position.z < -20 ) {
    cloudv = -cloudv;
  }
  var cl = CLOUDS.length;
  while(cl--) {
    var dz = 0.3;
    if (CLOUDS[cl].position.z>-20) {
      CLOUDS[cl].material.opacity -= 0.01;
    }
    CLOUDS[cl].position.z+=dz;
    if (CLOUDS[cl].position.z>29) {
      CLOUDS[cl].position.z = -1200;
      CLOUDS[cl].material.opacity = 1;
      CLOUDS[cl].material.color.set(ranColor());
    }

  }
}
//CLOUD END
camera.position.set(0,0,18);

starGen()
textGen()
rayGen()
sunGen()
cloudgen()
function animate() {
  resize();
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  starAnimate();
  cloudAnimate();
}
animate();}