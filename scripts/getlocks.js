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
  var http = getHTTPObject();  // create the http object
  http.onreadystatechange = function()
  {
    if (http.readyState == 4)
    {
			document.getElementById("info").innerHTML=http.responseText;
			return;
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

