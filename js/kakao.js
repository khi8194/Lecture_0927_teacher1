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
const btnViewToggle = document.querySelector(".viewToggle");
const [mapEl, viewEl] = document.querySelectorAll(".frame > figure");

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

//뷰토글 버튼 클릭시
btnViewToggle.addEventListener("click", e => {
	//자기 자신에 on클래스를 토글 처리
	e.target.classList.toggle("on");

	//현재 토글버튼에 on이 붙어있으면 view가 활성화 되어 있는 상태이기 때문에
	if (e.target.classList.contains("on")) {
		//버튼의 텍스트를 Roadview OFF라고 변경
		e.target.innerText = "Roadeview OFF";
		//view보임처리 , map숨기처리
		viewEl.classList.add("on");
		mapEl.classList.remove("on");
		//else일떄는 위와 정반대 처리
	} else {
		e.target.innerText = "Roadeview ON";
		viewEl.classList.remove("on");
		mapEl.classList.add("on");
	}
});
