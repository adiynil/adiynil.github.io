var toast = function(params){
    var el = document.createElement("div");
    el.setAttribute("id","toast");
    el.innerHTML = params.message;
    document.body.appendChild(el);
    el.classList.add("fadeIn");
    setTimeout(function(){
		el.classList.remove("fadeIn");
		el.classList.add("fadeOut");
		el.addEventListener("animationend", function(){
			el.classList.add("hide");
      });
    },params.time);
};
function Id(e){
	return document.getElementById(e);
}
function closebox(e) {
    var parent = e.parentNode.parentNode;
    var box = parent.getElementsByTagName("div");
    box[0].style.display = 'none';
    box[1].style.display = 'none';
};
function openbox(e) {
    var parent = e.parentNode;
    var box = parent.getElementsByTagName("div");
    box[0].style.display = 'block';
    box[1].style.display = 'block';
};
function createXmlHttpRequest(){
	var ajax = false;
	if(window.XMLHttpRequest){
		xmlreq = new XMLHttpRequest();
	} else 
		if (window.ActiveXObject){
			try{
				xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e1){
				try{
					xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e2){
				}
			}
		}
	return xmlreq;
};
var mdlist; // 记录markdown列表
var is;
var ds;
function ajaxget(){
	mdlist = "";
	is = 0;
	ds = 0;
	var list = Id('list');
	var userrepo = Id('userrepo');
	var dir = Id('dir');
	list.innerHTML = "";
	var str = userrepo.value.split("/");
	Id("user").value = str[0];
	Id("repo").value = str[1];
	if(dir.value.length == 0)
		Id("dirt").value = "";
	else if(dir.value.length == 1 && dir.value[0] == "/")
		Id("dirt").value = "";
	else if(dir.value[0] != "/")
		Id("dirt").value = "/"+dir.value;
	else
		Id("dirt").value = dir.value;
	var request = createXmlHttpRequest();
	request.open("GET","https://api.github.com/repos/"+userrepo.value+"/contents"+Id("dirt").value,true);
	request.send();
	request.ontimeout = function(){
		toast({message:"timeout!please retry.",time:1500});
	}
	request.onreadystatechange = function(){
		if(request.readyState==4){
			var result = request.responseText;
			var msg = eval('(' + result + ')');
			if(msg.message=="Not Found"){ 
				list.innerHTML += "<h3>Found Nothing !<h4>Please check your input !</h4></h3>"; 
			}else{				
				for (var data of msg) {
					var user = Id('user');
					var repo = Id('repo');
					var dir = Id('dirt');
					var directlink = "https://cdn.jsdelivr.net/gh/"+user.value+"/"+repo.value+"@master"+dir.value+"/"+data.name;
					directlink = "![]("+directlink+")";
					mdlist += directlink + "\n";
					var filename = "<p>FILENAME：<code>"+data.name+"</code></p>";
					var dirname = "<p>DIR：<code><a href='#' onclick=redir('"+data.name+"')>/&nbsp;"+data.name+"</a></code></p>";
					var directlink = "<p>DIRECT LINK：<code>https://cdn.jsdelivr.net/gh/"+Id("user").value+"/"+Id("repo").value+"@master"+Id("dirt").value+"/"+data.name+"</code></p>";
					var btn1 = "<button onclick=preview('"+data.name+"')>Preview</button>&nbsp;";
					var btn2 = "<button onclick=copy('md','"+data.name+"')>Copy MarkDown</button>&nbsp;";
					var btn3 = "<button onclick=copy('html','"+data.name+"')>Copy HTML</button>&nbsp;";
					var btn4 = "<button onclick=copy('url','"+data.name+"')>Copy URL</button>";
					if(data.type=="dir"){
						list.innerHTML += "<div>"+dirname+"</div>";
						ds += 1;
					}else{
						list.innerHTML += "<div>"+filename+directlink+btn1+btn2+btn3+btn4+"</div>";
						is += 1;
					}
					Id("is").innerText = is;
					Id("ds").innerText = ds;
					Id("result").style.display = "block";
				}
			}
		}
	}
};
function redir(dir){
	var user = Id('user');
	var repo = Id('repo');
	Id("userrepo").value = user.value + "/" + repo.value;
	Id("dir").value = dir;
	Id("submit").click();
};
function onecopymd(){
	const textarea = document.createElement('textarea');
	textarea.value = mdlist;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	document.body.removeChild(textarea);
	toast({message:"OK!",time:1500});
};
function copy(type,file){
	var result;
	var user = Id('user');
	var repo = Id('repo');
	var dir = Id('dirt');
	var directlink = "https://cdn.jsdelivr.net/gh/"+user.value+"/"+repo.value+"@master"+dir.value+"/"+file;
	if(type=="md"){
		result = "![]("+directlink+")";
	} else if(type=="html"){
		result = '<img src="'+directlink+'" />';
	} else {
		result = directlink;
	}
	//type user.value repo.value dirt.value
	var aux = document.createElement("input"); 
	aux.setAttribute("value",result); 
	document.body.appendChild(aux); 
	aux.select();
	document.execCommand("copy"); 
	document.body.removeChild(aux);
	toast({message:"OK!",time:1500});
};
function preview(file){
	var user = Id('user');
	var repo = Id('repo');
	var dir = Id('dirt');
	Id("previewimg").src = "https://cdn.jsdelivr.net/gh/"+user.value+"/"+repo.value+"@master"+dir.value+"/"+file;
	Id("preview").click();
}