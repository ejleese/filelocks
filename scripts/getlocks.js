function sanitize(inVal,event)
{
	if (event.which == 13 || event.keyCode == 13)
	{ 
		checkforlocks(inVal.value);
		return false;	
	}

	if (/\W/.test(inVal.value))
	{
  	alert("alphanumeric input only");
		document.getElementById("txtFilename").value="";
    return false;
	}
  return true;
}

function checkforlocks(inVal)
{
	//document.getElementById("userinfo").innerHTML="Click on a username for more info";

  var http = getHTTPObject();  // create the http object
  http.onreadystatechange = function()
  {
    if (http.readyState == 4)
    {
			document.getElementById("info").innerHTML=http.responseText;
			return;
			//refactored to not need the below part. will remove shortly

      results = http.responseText.split(","); // split delimited response in
			{

				// doing all this manipulation because the return value doesn't display nicely
				var str=results.toString();
			  // some of these lines already come thru with \n at the end
				str=str.replace(/\n/g,"");
    		str=str.replace(/filePro File:/g,"\nfilePro File:");
				str=str.replace(/Record Number:/g,"\nRecord Number:");
				str=str.replace(/User:/g,"\nUser:");
  			str=str.replace(/TTY:/g,"\nTTY:");
				str=str.replace(/PID:/g,"\nPID:");
				str=str.replace(/Command:/g,"\nCommand:");

				var vals=str.split("\n"); //causes 0th element to be blank most of the time
				if (vals[0]=="   ") vals.splice(0,1); // remove blank first element
				var showvar="";

				if (vals.length == 1) showvar=vals[0];

				for (var i=0;i<vals.length;i++)
				{
					//vals[i]=vals[i].toString().trim();
					if (vals[i].search("filePro File:") > -1)
							showvar=showvar + "<br>"+vals[i] + "&nbsp&nbsp&nbsp";
					if (vals[i].search("Record Number:") > -1)
						showvar=showvar + vals[i] + "&nbsp&nbsp&nbsp";
					if (vals[i].search("User:") > -1)
					{
						var userpair=$.map(vals[i].split(":"),$.trim);//split 'User' and username, trim whitespace
						var usershow=userpair[0] + ":&nbsp<b><a href='#' onclick=\"getUserInfo('"+userpair[1]+"')\">" + userpair[1] + "</a></b>";
						showvar=showvar + usershow + "&nbsp&nbsp&nbsp";
						//showvar=showvar + "<b>"+vals[i] + "</b>&nbsp&nbsp&nbsp";
					}
					if (vals[i].search("PID:") > -1) 
						showvar=showvar + vals[i];
				}

				//just show several elements, doug doesn't want to see the command
				document.getElementById("info").innerHTML=showvar;
			}      
		}
	}
  var nocachevar = new Date().getTime();
  http.open("GET", "scripts/getlocks.php?file="+inVal+"&nocache="+nocachevar, false);
  http.send(null);

  return true;
}

function getHTTPObject()
{
  var xmlhttp;

  if (!xmlhttp & typeof XMLHttpRequest != 'undefined')
  {
    try { xmlhttp = new XMLHttpRequest();}
    catch(e) { xmlhttp = false;}
  }
  return xmlhttp;
}

function gettopsearches()
{
  var http = getHTTPObject();  // create the http object
  http.onreadystatechange = function()
  {
    if (http.readyState == 4)
    {
      results = http.responseText.replace(/\n/g,"").split(","); // split delimited response in
			{
				if (results[0] != null)		
					document.getElementById("spot1").innerHTML=results[0];
				if (results[1] != null)
					document.getElementById("spot2").innerHTML=results[1];
				if (results[2] != null)
					document.getElementById("spot3").innerHTML=results[2];
				if (results[3] != null)
					document.getElementById("spot4").innerHTML=results[3];
				if (results[4] != null)
					document.getElementById("spot5").innerHTML=results[4];
			}      
		}
	}
  var nocachevar = new Date().getTime();
  http.open("GET", "scripts/gettop.php?nocache="+nocachevar, false);
  http.send(null);

  return true;
}

function getHTTPObject()
{
  var xmlhttp;

  if (!xmlhttp & typeof XMLHttpRequest != 'undefined')
  {
    try { xmlhttp = new XMLHttpRequest();}
    catch(e) { xmlhttp = false;}
  }
  return xmlhttp;
}

function getUserInfo(login)
{
  var http = getHTTPObject();  // create the http object
  http.onreadystatechange = function()
  {
    if (http.readyState == 4)
    {
      results = http.responseText.split(","); // split delimited response in
			{
				document.getElementById("userinfo").innerHTML=results[0];
			}      
		}
	}
  var nocachevar = new Date().getTime();
  http.open("GET", "scripts/getinfo.php?user="+login+"&nocache="+nocachevar, false);
  http.send(null);

  return true;
}

