var debugLevel = 2; //1,2,3,4,5.

/*
https://developer.mozilla.org/en-US/docs/Web/API/Window/open
function launch(w,h){
	var n=window,d=document,s=n.screen;
	function r(o){
		n.resizeTo(Number(w)+o,h);
		return n.innerWidth||d.body.clientWidth;
	}
	function c(t,u){
		return t>u?(t-u)>>1:0;
	}
	if(r(1)==r(0)){
		if(typeof p=='undefined'||p.closed){
			$('info').className='no_popup';
			p=n.open(n.location.href,
				'resize_popup',
				'menubar,toolbar,location,directories,status,resizable,titlebar,'.split(',').join('=yes,')+',width='+w+',height='+h+',left='+c(s.width,w)+',top='+c(s.height,h));
		}
		else{
			p.focus();
		}
		p.resizeTo(w,h);
		n=p;
	}
	if(w>s.width||h>s.height){n.moveTo(0,0);}
}
*/
function launchMOB(pg,win){
	//const windowFeatures = "left=400,top=100,width=120,height=320;popup=yes";
	p = window.open(pg,win,'popup=yes');
	p.focus();
	p.resizeTo(400,650);
	p.moveTo(500,40);
}

function launchTAB(pg,win){
	//const windowFeatures = "left=400,top=100,width=120,height=320;popup=yes";
	p = window.open(pg,win,'popup=yes,left=40,top=40,width=1280,height=820');
	p.focus();
	//p.moveTo(100,100);
	//p.resizeTo(800,800);
}

function bind_events(){
	$("[data-nav]").on('click', function(e) {
		x_nav($(this).data('nav'));		
	});
}

//function add_x_nav(_route){
function x_nav(_route){	
	//tab.profiles
	if (_route=='tab.profiles'){
		var otp =  $(".form-control.otp").val();
		if (otp){
			var data = { 'number': otp };
			var URL ="http://127.0.0.1:3000/verify";
		}
		else {
			var URL ="http://127.0.0.1:3000/profile";
			var gender = $("#level").val();
			var age = $(".form-control.p-age").val();
			var Pname = $(".form-control.p-name").val();
			var image = $("#custId").val();
			var data = { 'gender': gender, 'age': age , 'name': Pname, 'image': image }

		}

		$.ajax({
			url: URL,
			type: "POST",
			crossDomain: true,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			success: function (response) {
				//var resp = JSON.parse(response);
				new_x_nav(_route);
				//alert(resp.status);
			},
			error: function (xhr, status) {
				alert("error");
				
			}
		});				
	}
	if (_route=='tab.otp'){
		sun = $(".form-control").val();
		debugger;
		$.ajax({
			url: "http://127.0.0.1:3000/phone_verification",
			type: "POST",
			crossDomain: true,
			data: JSON.stringify({ 'number': sun }),
			dataType: "json",
			contentType: "application/json",
			success: function (response) {
				//var resp = JSON.parse(response)
				new_x_nav(_route);
				//alert(resp.status);
			},
			error: function (xhr, status) {
				alert("error");
				
			}
		});				
	}else{
		new_x_nav(_route);
	}
}

function new_x_nav(_route){
//function x_nav(_route){
	//If a route key is valid, add to history and load the route.
	routeKey = _route.split('?')[0]
	if (x_routes[routeKey] === undefined){x_log('Invalid Route..' + routeKey,1); return;}
	history.pushState(_route, "", "");
	x_load(_route);
}

function x_load(_url){
	//A RouteKey can have an an x-api to call, x-page to render,x-event to raise and a x-div to load page to.
	routeKey = _url.split('?')[0]
	params = _url.split('?')[1]

	if (x_routes[routeKey].x_api !== undefined){
		var api_url = x_routes[routeKey].x_api
		if (params !== undefined) {api_url += '?' + params}
		
		x_log(api_url,1);
		$.getJSON(api_url).done(json => x_render(routeKey, json));
	}
	else{
		x_render(routeKey);
	}	
}

function x_render(routeKey,json){
    var purl = x_routes[routeKey].x_page;
	var div = "x-body";
	if (x_routes[routeKey].x_div !== undefined){div = x_routes[routeKey].x_div;} 
    
	x_log(purl,1);	
	var env = nunjucks.configure([''],{ autoescape: false });
	document.getElementById(div).innerHTML = nunjucks.render(purl, json);
	if (x_routes[routeKey].x_code !== undefined){loadScript(x_routes[routeKey].x_code)}
	bind_events();
}

//loaded_scripts = []

function loadScript(scriptSource){
	//if (loaded_scripts.indexOf(scriptSource) === -1) {
		var script = document.createElement('script');
		script.src = scriptSource;
		document.body.appendChild(script);
		//loaded_scripts.push(scriptSource);
	//}

}
window.addEventListener('popstate', onPopState);

function onPopState(e) {
    let state = e.state;
    if (state !== null) {x_load(state);}
    else {history.back();}
}

function x_log(s,f){
	if (f <= debugLevel) console.log(s);
}
