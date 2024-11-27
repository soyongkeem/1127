const restartButton = document.getElementById("restartView");
restartButton.addEventListener("click", () => {
    resetView(); // 초기화
    location.reload(); // 페이지 리프레시
});


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 500);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const cursor = document.querySelector('.cursor');
const cursorOutline = document.querySelector('.cursor-outline');


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 조명 설정
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// 텍스처 로딩
const textureLoader = new THREE.TextureLoader();
const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
let globe;

textureLoader.load(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/4096px-Blue_Marble_2002.png',
    function(texture) {
        const globeMaterial = new THREE.MeshPhongMaterial({ map: texture });
        globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);

        const latitude1 = 37;
        const longitude1 = 233;
        addRedCircleOnGlobe(latitude1, longitude1, "dot1");

        const latitude2 = 36;
        const longitude2 = 221;
        addRedCircleOnGlobe(latitude2, longitude2, "dot2");

        const latitude3 = 39;
        const longitude3 = 244;
        addRedCircleOnGlobe(latitude3, longitude3, "dot3");

        const latitude4 = 22;
        const longitude4 = 246;
        addRedCircleOnGlobe(latitude4, longitude4, "dot4"); 

        const latitude5 = -6;
        const longitude5 = 253;
        addRedCircleOnGlobe(latitude5, longitude5, "dot5"); // Indonesia


        const latitude7 = 50;
        const longitude7 = 297;
        addRedCircleOnGlobe(latitude7, longitude7, "dot7"); //카작

        const latitude8 = 25;
        const longitude8 = 283;
        addRedCircleOnGlobe(latitude8, longitude8, "dot8"); //인도




        
        const latitude11 = 39;
        const longitude11 = 344;
        addRedCircleOnGlobe(latitude11, longitude11, "dot11"); // Italy

        const latitude12 = 40;
        const longitude12 = 364;
        addRedCircleOnGlobe(latitude12, longitude12, "dot12"); // spain

        const latitude13 = 51;
        const longitude13 = 360;
        addRedCircleOnGlobe(latitude13, longitude13, "dot13"); // uk





        const latitude14 = 29;
        const longitude14 = 330;
        addRedCircleOnGlobe(latitude14, longitude14, "dot14"); // 이집트
        const latitude15 = 18;
        const longitude15 = 328;
        addRedCircleOnGlobe(latitude15, longitude15, "dot15"); // 수단



        const latitude19 = -35;
        const longitude19 = 211;
        addRedCircleOnGlobe(latitude19, longitude19, "dot19"); //호주
        const latitude21 = -18;
        const longitude21 = 182;
        addRedCircleOnGlobe(latitude21, longitude21, "dot21"); //피지




        const latitude23 = 36;
        const longitude23 = 77;
        addRedCircleOnGlobe(latitude23, longitude23, "dot23"); // United States

        const latitude26 = 21;
        const longitude26 = 78;
        addRedCircleOnGlobe(latitude26, longitude26, "dot26"); // 큐바

        const latitude29 = -23;
        const longitude29 = 43;
        addRedCircleOnGlobe(latitude29, longitude29, "dot29"); // Italy
    }
);
document.addEventListener("mousemove", (e) => {
    const cursor = document.getElementById("cursor");
    const cursorOutline = document.getElementById("cursor-outline");
    
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
});


camera.position.z = 15;

// 빨간 원을 지구본 표면에 고정시키는 함수
function addRedCircleOnGlobe(latitude, longitude, name) {
    const radius = 5;
    const lat = THREE.Math.degToRad(latitude);
    const lon = THREE.Math.degToRad(longitude);

    const x = radius * Math.cos(lat) * Math.cos(lon);
    const y = radius * Math.sin(lat);
    const z = radius * Math.cos(lat) * Math.sin(lon);

    const circleGeometry = new THREE.CircleGeometry(0.05, 16);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);

    circle.position.set(x, y, z);
    circle.lookAt(0, 0, 0);

    globe.add(circle); // globe의 자식으로 추가
    circle.userData = { isClickable: true, name: name }; // 클릭 가능 데이터 설정
}


function highlightDot(dotName) {
    globe.children.forEach(child => {
        if (child.userData && child.userData.isClickable) {
            if (child.userData.name === dotName) {
                child.material.color.set(0x39ff14); // 클릭된 점은 네온 그린
            } else {
                child.material.color.set(0xff0000); // 나머지는 기본 빨간색
            }
            child.material.needsUpdate = true; // 변경 반영
        }
    });
}

// Reset 버튼 이벤트 추가
document.getElementById("restartView").addEventListener("click", function () {
    location.reload(); // 페이지 리프레시
});

function onLabelClick(dotId) {
    updateDescription(dotId); // 클릭된 점에 맞는 설명 표시
}
function updateDescription(dotId) {
    const description = descriptions[dotId]; // 클릭된 점의 설명 데이터 가져오기
    if (description) {
        document.getElementById('descriptionTitle').innerText = description.title;
        document.getElementById('descriptionBody').innerText = description.body;

        // 설명 영역 보이기
        const descriptionContainer = document.getElementById('description');
        descriptionContainer.style.display = 'block';
    }
}


// 마우스 이벤트 설정
renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
renderer.domElement.addEventListener('click', onDocumentMouseClick, false);
const footerModal = document.getElementById('footerModal');
const copyright = document.getElementById('copyright');
let isMouseNearFooter = false;

// 마우스 이동 이벤트
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const offsetX = 15; // 커서와 모달 간 X축 거리
    const offsetY = -45; // 커서와 모달 간 Y축 거리
    // copyright의 위치 정보 가져오기
    const copyrightRect = copyright.getBoundingClientRect();

    // 마우스가 copyright 근처에 있는지 확인
    const isNear = (
        mouseX >= copyrightRect.left - 50 &&
        mouseX <= copyrightRect.right + 50 &&
        mouseY >= copyrightRect.top - 50 &&
        mouseY <= copyrightRect.bottom + 50
    );
    footerModal.style.left = `${mouseX + offsetX}px`;
    footerModal.style.top = `${mouseY + offsetY}px`;
    // 근처일 때 모달 표시
    if (isNear) {
        if (!isMouseNearFooter) {
            footerModal.style.display = 'block'; // 모달 표시
            isMouseNearFooter = true;
        }
    } else {
        if (isMouseNearFooter) {
            footerModal.style.display = 'none'; // 모달 숨기기
            isMouseNearFooter = false;
        }
    }
});

function onDocumentMouseMove(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
}
function onDocumentMouseClick(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // 클릭된 객체 확인 (애니메이션 상태와 관계없이)
    const intersects = raycaster.intersectObjects(globe.children, true);

    if (intersects.length > 0) {
        const clickedObject = intersects.find(intersect => intersect.object.userData.isClickable);

        if (clickedObject) {
            const dotName = clickedObject.object.userData.name;
            
            // 글로브가 멈춘 상태에서도 dot 색상 변경 가능하도록 수정
            globe.children.forEach(child => {
                if (child.userData && child.userData.isClickable) {
                    if (child.userData.name === dotName) {
                        child.material.color.set(0x39ff14); // 클릭된 점은 네온 그린
                        updateDescription(dotName); // 설명 업데이트
                        
                        // 비디오 재생 로직
                        const videoData = {
                            dot1: { platform: "youtube", id: "Dvh4w3I5d6o", start: 165, end: 200 },
                            dot2: { platform: "youtube", id: "qn7_XMbbNH8", start: 10, end: 42 },
                            dot3: { platform: "vimeo", id: "1033644862", start: 195 },
                            dot4: { platform: "vimeo", id: "1033647055", start: 10 },
                            dot5: { platform: "vimeo", id: "1033644886", start: 18 },

                            dot7: { platform: "youtube", id: "CbtRwLpbct8", start: 64 },
                            dot8: { platform: "vimeo", id: "1033662214", start: 20},//인도


                            dot11: { platform: "youtube", id: "M5qQETERo70", start: 87, end: 111 },
                            dot12: { platform: "vimeo", id: "1033644912", start: 11 },
                            dot13: { platform: "vimeo", id: "278549299", start: 55 },



                            dot14: { platform: "vimeo", id: "138337404", start: 82 },
                            dot15: { platform: "youtube", id: "FbR-zImVcOk", start: 13 },



                            dot19: { platform: "vimeo", id: "1033669217", start: 23 },
                            dot21: { platform: "vimeo", id: "1033671980", start: 16 },


                            dot23: { platform: "vimeo", id: "1033643230", start: 38 },
                            dot26: { platform: "youtube", id: "Km-8dQA2bfA", start: 120, end: 200 },
                            dot29: { platform: "youtube", id: "qX2hZGCMfFI", start: 11, end: 43 }
                        };

                        const video = videoData[dotName];
                        if (video) {
                            if (video.platform === "youtube") {
                                playYouTubeVideo(video.id, video.start, video.end);
                            } else if (video.platform === "vimeo") {
                                playVimeoVideo(video.id, video.start);
                            }
                        }
                    } else {
                        child.material.color.set(0xff0000); // 나머지는 빨간색
                    }
                    child.material.needsUpdate = true;
                }
            });
        }
    }
}

// 지구본 버튼과 모달 가져오기
const resetModal = document.getElementById('resetModal');

// 마우스가 지구본 버튼 위에 있을 때 모달 표시 및 따라다니기
restartButton.addEventListener('mouseenter', () => {
    resetModal.style.display = 'block';

    // 마우스 이동에 따라 모달 위치 업데이트
    document.addEventListener('mousemove', moveResetModal);
});

// 마우스가 지구본 버튼을 벗어날 때 모달 숨기기
restartButton.addEventListener('mouseleave', () => {
    resetModal.style.display = 'none';
    document.removeEventListener('mousemove', moveResetModal); // 이벤트 제거
});

// 모달을 커서 위치에 따라 이동시키는 함수
function moveResetModal(event) {
    const offsetX = -80; // 커서 왼쪽으로 120px
    const offsetY = -30;  // 커서 위쪽으로 30px

    resetModal.style.left = `${event.pageX + offsetX}px`;
    resetModal.style.top = `${event.pageY + offsetY}px`;
}

// 활성 라벨과 설명, 비디오 상태를 저장하는 변수
let activeDotName = null;
let activeVideoData = null; // 마지막 재생된 비디오 정보 저장




function playYouTubeVideo(videoId, start, end) {
    const youtubePlayer = document.getElementById("youtubePlayer");
    const player = document.createElement('iframe');
    player.width = "480";
    player.height = "300";
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&start=${start}&end=${end}`;
    player.frameBorder = "0";
    player.allow = "autoplay; encrypted-media";
    player.allowFullscreen = true;
    youtubePlayer.innerHTML = ''; // 이전 iframe 제거
    youtubePlayer.appendChild(player);
    youtubePlayer.style.display = "block";
}
function playVimeoVideo(videoId, start) {
    const youtubePlayer = document.getElementById("youtubePlayer");
    const player = document.createElement('iframe');
    player.width = "480"; // Vimeo 동영상 가로 크기
    player.height = "320"; // Vimeo 동영상 세로 크기
    player.src = `https://player.vimeo.com/video/${videoId}?autoplay=1#t=${start}s&loop=1&title=0&byline=0&portrait=0`;
    player.frameBorder = "0";
    player.allow = "autoplay; fullscreen; picture-in-picture";

    youtubePlayer.innerHTML = ''; // 기존 iframe 제거
    youtubePlayer.appendChild(player); // Vimeo iframe 추가
    youtubePlayer.style.display = "block"; // 플레이어 표시

    
}

// 상태 관리 변수
let isAnimationRunning = true; // 애니메이션 초기 상태
let animationFrameId = null; // requestAnimationFrame ID 저장

// 플레이/스탑 버튼 생성 및 스타일 설정
const playStopButton = document.createElement('button');
playStopButton.id = 'playStopButton';
playStopButton.textContent = isAnimationRunning ? '⏸' : '▶︎';
document.body.appendChild(playStopButton);

// 애니메이션 시작 함수
function startAnimation() {
    if (!isAnimationRunning) return; // 상태 확인 후 실행 방지

    const animate = () => {
        // 애니메이션 루프 조건
        if (!isAnimationRunning) {
            cancelAnimationFrame(animationFrameId); // 루프 중단
            animationFrameId = null; // ID 초기화
            return;
        }

        if (globe) {
            globe.rotation.y += 0.001; // 지구본 회전
        }

        renderer.render(scene, camera); // Three.js 장면 렌더링
        animationFrameId = requestAnimationFrame(animate); // 다음 프레임 요청
    };

    // 애니메이션 실행
    animationFrameId = requestAnimationFrame(animate);
}

// 애니메이션 중단 함수
function stopAnimation() {
    isAnimationRunning = false; // 실행 상태 업데이트
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId); // 현재 애니메이션 중단
        animationFrameId = null; // ID 초기화
    }
}

// 버튼 클릭 이벤트
playStopButton.addEventListener('click', () => {
    isAnimationRunning = !isAnimationRunning; // 상태 토글
    playStopButton.textContent = isAnimationRunning ? '⏸' : '▶'; // 버튼 텍스트 변경

    if (isAnimationRunning) {
        startAnimation(); // 애니메이션 시작
    } else {
        stopAnimation(); // 애니메이션 중단
    }
});

// 초기 애니메이션 시작
startAnimation();


// 마우스 컨트롤
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

document.addEventListener('mousedown', function() { isDragging = true; }, false);
document.addEventListener('mousemove', function(event) {
    if (isDragging && globe) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        globe.rotation.y += deltaX * 0.005;
        globe.rotation.x += deltaY * 0.005;
    }
    previousMousePosition = { x: event.clientX, y: event.clientY };
}, false);
document.addEventListener('mouseup', function() { isDragging = false; }, false);

document.addEventListener('wheel', function(event) {
    const zoomSpeed = 0.05;
    const minZoom = 8;
    const maxZoom = 25;

    camera.position.z += event.deltaY * zoomSpeed;
    camera.position.z = Math.max(minZoom, Math.min(camera.position.z, maxZoom));
}, false);
let zoomInterval; // 줌 동작을 반복하기 위한 interval 변수
let isZooming = false; // 줌 상태를 확인하는 플래그

// 카메라 줌 함수
function zoomCamera(direction) {
    const zoomSpeed = 0.1; // 줌 속도
    const minZoom = 8;     // 최소 줌
    const maxZoom = 25;    // 최대 줌

    camera.position.z += direction * zoomSpeed;
    camera.position.z = Math.max(minZoom, Math.min(camera.position.z, maxZoom));
}

// 줌 버튼 이벤트 추가
function startZooming(direction) {
    if (isZooming) return; // 이미 줌 동작 중이면 중복 실행 방지
    isZooming = true;

    zoomInterval = setInterval(() => {
        zoomCamera(direction);
    }, 50); // 50ms 간격으로 줌 동작
}

function stopZooming() {
    clearInterval(zoomInterval); // 줌 동작 중지
    isZooming = false;
}

// + 버튼과 - 버튼에 이벤트 연결
const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");

// + 버튼: 줌 인
zoomInButton.addEventListener("mousedown", () => startZooming(-1));
zoomInButton.addEventListener("mouseup", stopZooming);
zoomInButton.addEventListener("mouseleave", stopZooming); // 버튼 밖으로 나갔을 때도 멈춤

// - 버튼: 줌 아웃
zoomOutButton.addEventListener("mousedown", () => startZooming(1));
zoomOutButton.addEventListener("mouseup", stopZooming);
zoomOutButton.addEventListener("mouseleave", stopZooming); // 버튼 밖으로 나갔을 때도 멈춤


document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".cursor");
    const cursorOutline = document.querySelector(".cursor-outline");

    // 마우스 이동 시 커서 위치 업데이트
    document.addEventListener("mousemove", (e) => {
        const x = e.pageX;
        const y = e.pageY;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursorOutline.style.left = `${x}px`;
        cursorOutline.style.top = `${y}px`;
    });

    // 클릭 이벤트로 애니메이션 트리거
    document.addEventListener("mousedown", (e) => {
        // 줄어든 상태의 위치 조정
        const adjustedX = e.pageX - 4; // 클릭 시 X 좌표를 10픽셀 왼쪽으로 이동
        const adjustedY = e.pageY - 6; // 클릭 시 Y 좌표를 10픽셀 위로 이동

        cursor.style.left = `${adjustedX}px`;
        cursor.style.top = `${adjustedY}px`;
        cursorOutline.style.left = `${adjustedX}px`;
        cursorOutline.style.top = `${adjustedY}px`;

        // 클래스 추가로 애니메이션 실행
        cursor.classList.add("cursor-expand");
        cursorOutline.classList.add("cursor-expand");

        // 애니메이션 종료 후 원래 위치로 복구
        setTimeout(() => {
            cursor.classList.remove("cursor-expand");
            cursorOutline.classList.remove("cursor-expand");

            // 복구 시 원래 마우스 위치로 조정
            cursor.style.left = `${e.pageX}px`;
            cursor.style.top = `${e.pageY}px`;
            cursorOutline.style.left = `${e.pageX}px`;
            cursorOutline.style.top = `${e.pageY}px`;
        }, 50); // 애니메이션 시간과 동일
    });
});





// 모달 관련 요소 가져오기
const playerButton = document.getElementById('playerButton');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
// 제목 클릭 시 리프레시 기능 추가
document.getElementById('playerButton').addEventListener('click', () => {
    window.location.reload();
});

// 플래그 변수
let isMouseOverButton = false; // 버튼 위에 마우스가 있는지 여부
let isModalFixed = false; // 모달이 클릭으로 고정되었는지 여부

// 오버레이 클릭 시 모달 닫기
modalOverlay.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    isModalFixed = false; // 고정 해제
});

// 커서 근처로 모달 이동
document.addEventListener('mousemove', (event) => {
    if (isMouseOverButton && !isModalFixed) {
        const modalOffset = 15; // 커서와 모달 간 거리
        const windowWidth = window.innerWidth;

        // 기본적으로 커서 왼쪽에 모달을 배치
        let modalLeft = event.pageX - modal.offsetWidth - modalOffset;
        let modalTop = event.pageY + modalOffset;

        // 모달 위치 설정
        modal.style.left = `${modalLeft}px`;
        modal.style.top = `${modalTop}px`;
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        const copyrightRect = copyright.getBoundingClientRect();
    }
});

// 버튼 위에 마우스를 올렸을 때
playerButton.addEventListener('mouseenter', () => {
    if (!isModalFixed) {
        modal.style.display = 'block';
    }
    isMouseOverButton = true;
    
});

// 버튼 밖으로 마우스를 벗어났을 때
playerButton.addEventListener('mouseleave', () => {
    if (!isModalFixed) {
        modal.style.display = 'none';
    }
    isMouseOverButton = false;
});

// 카메라 초기 위치 저장
const initialCameraPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
const initialCameraLookAt = new THREE.Vector3(0, 0, 0); // 처음 카메라가 바라보는 지점


let resetTimer;

// 초기화 함수
function startInactivityTimer() {
    // 기존 타이머가 있으면 취소
    if (resetTimer) clearTimeout(resetTimer);

    // 15초 후 초기화 설정
    resetTimer = setTimeout(() => {
        console.log("20초 동안 입력이 없어 페이지를 초기화합니다.");
        location.reload(); // 페이지를 새로고침하여 초기화
    }, 15000); // 15초 (20,000ms)
}
