const mapContainer = document.querySelector("#map");
const btnToggle = document.querySelector(".trafficToggle");

const mapOption = {
	center: new kakao.maps.LatLng(37.51273247893501, 127.06076771586082),
	level: 2
};

let map = new kakao.maps.Map(mapContainer, mapOption);
let marker = new kakao.maps.Marker({ position: mapOption.center });
const mapTypeControl = new kakao.maps.MapTypeControl();
const zoomControl = new kakao.maps.ZoomControl();
marker.setMap(map);
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

window.addEventListener("resize", () => {
	mapContainer.innerHTML = "";
	map = new kakao.maps.Map(mapContainer, mapOption);
	marker.setMap(map);
	map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
	map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

	btnToggle.classList.remove("on");
	btnToggle.innerText = "traffic ON";
});

btnToggle.addEventListener("click", e => {
	e.target.classList.toggle("on");

	if (e.target.classList.contains("on")) {
		map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		e.target.innerText = "traffic OFF";
	} else {
		map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		e.target.innerText = "trafiic ON";
	}
});

//roadview setting
const viewContainer = document.querySelector("#view");
const view = new kakao.maps.Roadview(viewContainer);
const viewClient = new kakao.maps.RoadviewClient();

viewClient.getNearestPanoId(mapOption.center, 50, panoId => {
	view.setPanoId(panoId, mapOption.center);
});

//로드뷰에 마커 올리기
kakao.maps.event.addListener(view, "init", () => {
	new kakao.maps.Marker({
		position: mapOption.center,
		map: view //기존 마커생성과 동일하고 map부분에만 view인스턴스 연결
	});
});
