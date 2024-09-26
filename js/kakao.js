const mapContainer = document.querySelector("#map");

const mapOption = {
	center: new kakao.maps.LatLng(37.51273247893501, 127.06076771586082),
	level: 3
};

const map = new kakao.maps.Map(mapContainer, mapOption);
const marker = new kakao.maps.Marker({ position: mapOption.center });
marker.setMap(map);

//맵위에 올릴 컨트롤 인스턴스 생성
const mapTypeControl = new kakao.maps.MapTypeControl();

//타입컨트롤러의 위치값 지정하는 함수
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
