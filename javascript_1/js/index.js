$(function(){

	//グローバルナビゲーション
	$(".btn-gnavi").on("click", function(){
			var rightVal = 0;
			if($(this).hasClass("open")) {
					rightVal = -300;
					$(this).removeClass("open");
			}
			else {
					$(this).addClass("open");
			}
			$(".menu-gnavi").stop().animate({
					right: rightVal
			}, 300);
	});

// スライドショー
var imgList = [
	"images/slider/img01.jpg",
	"images/slider/img02.jpg",
	"images/slider/img03.jpg",
	"images/slider/img04.jpg",
	"images/slider/img05.jpg"
];

for(var i = 0; i < imgList.length; i++) {
	var slide = document.createElement("li");
	slide.innerHTML = "<img src='" + imgList[i] + "'>";
	document.getElementsByClassName("slider-inner")[0].appendChild(slide);
	var nav = document.createElement("li");
	nav.setAttribute("data-nav-index", i);
	nav.style.backgroundImage = "url(" + imgList[i] + ")";
	nav.style.width = 100 / imgList.length + "%";
	document.getElementsByClassName("nav")[0].appendChild(nav);
}
var length = imgList.length - 1;
var slider = document.getElementsByClassName("slider-inner")[0].getElementsByTagName("li");
var nav = document.getElementsByClassName("nav")[0].getElementsByTagName("li");
var nowIndex = 0;
var isChanging = false;
var slideTimer;
slider[nowIndex].classList.add("show");
nav[nowIndex].classList.add("current");

function sliderSlide(val) {
	if(isChanging) return false;
	isChanging = true;
	slider[nowIndex].classList.remove("show");
	nav[nowIndex].classList.remove("current");
	nowIndex = val;
	slider[nowIndex].classList.add("show");
	nav[nowIndex].classList.add("current");
	slideTimer = setTimeout(function(){
		isChanging = false;
	}, 600);
}
document.getElementById("arrow-prev").addEventListener("click", function(){
	var index = nowIndex - 1;
	if(index < 0) index = length;
	sliderSlide(index);
}, false);
document.getElementById("arrow-next").addEventListener("click", function(){
	var index = nowIndex + 1;
	if(index > length) index = 0;
	sliderSlide(index);
}, false);

for(var i = 0; i < nav.length; i++) {
	nav[i].onclick = function(){
		var index = Number(this.getAttribute("data-nav-index"));
		sliderSlide(index);
	};
}

	//ポップアップ用colorbox
	$(".popup").colorbox({
			fixed: true,
			iframe: true,
			innerWidth: 640,
			innerHeight: 359
	});
	
	//Google Maps
// 地図の初期化処理
 function initMap() {
	 // マップの色情報を設定
	 var styles = [
		{
			stylers: [
				{ hue: "#004cff" },
				{ saturation: 30 }
			]
		}, 
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{ "color": "#eaedfc" },
				{ "lightness": -10 }
			]
		},{
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [
				{ "color": "#eaedfa" },
				{ "lightness": 34 }
			]
		},{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{ "color": "#eeeeee" },
				{ "lightness": 17 }
			]
		},{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{ "color": "#eeeeee" },
				{ "lightness": 29 },
				{ "weight": 0.2 }
			]
		},{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{ "color": "#eeeeee" },
				{ "lightness": 18 }
			]
		},{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{ "color": "#eeeeee" },
				{ "lightness": 16 }
			]
		},{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{ "color": "#dadff6" },
				{ "lightness": 30 }
			]
		},{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
				{ "color": "#cfd6f4" },
				{ "lightness": 24 }
			]
		},{
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#eeeeee" },
				{ "lightness": 16 }
			]
		},{
			"elementType": "labels.text.fill",
			"stylers": [
				{ "saturation": 37 },
				{ "color": "#8687e3" },
				{ "lightness": 4 }
			]
		},{
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [
				{ "lightness": 17 },
				{ "color": "#dadff6" }
			]
		},{
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [
				{ "lightness": 21 },
				{ "color": "#ced2f2" }
			]
		},{
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [
				{ "lightness": 16 },
				{ "weight": 1.2 },
				{ "color": "#ced5f4" }
			]
		},{
	}
	];
	// 位置情報
	var pos = {lat: 35.681167, lng: 139.767052};

	// 地図の設定(zoom, centerは必須です)
		var opts = {
				zoom: 15,		// 拡大率
				styles,		// 地図の色味
				center: new google.maps.LatLng(pos)	// 地図の中心点とする緯度、経度を指定する
		};

		// APIのマップオブジェクトを使って対象の要素にマップを表示させる
		var map = new google.maps.Map(document.getElementById("map"), opts);

		// マップの中心にマーカーを表示させる
		var marker = new google.maps.Marker({
				position: pos,
				map: map
		});
}

// 地図の初期化処理を実行
initMap();
});