//지도를 생성할 프레임요소 변수에 할당
const mapContainer = document.querySelector("#map");

//지도에 적용할 옵션값을 객체로 묶어서 할당
const mapOption = {
	center: new kakao.maps.LatLng(33.450701, 126.570667), //출력할 지도의 위도, 경수
	level: 3 //지도의 확대 정도
};

//new 연산자로 카카오 지도 인스턴스를 생성 (지도를 출력한 DOM, 지도옵션객체)
const map = new kakao.maps.Map(mapContainer, mapOption);
