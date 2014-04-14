<html>
<head>
<?php

// Date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
// always modified
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
// HTTP/1.1
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
// HTTP/1.0
header("Pragma: no-cache");

?> 

<title>Who's in my file?!</title>

<script src="/script/jquery-1.10.2.min.js"></script>
<script src="scripts/getlocks.js"></script>
<?php include '/appl/fp/lib/phpsetvar.php'; ?>

<script>
// load top 5 searches
$(document).ready(function()
{ 
	gettopsearches();
	//mouse hover to highlight
	$("div").hover(function()
	{
		switch(this.id)
		{
			case "spot1":
			case "spot2":
			case "spot3":
			case "spot4":
			case "spot5": $(this).css("background-color","aquamarine");break;
		}
	},
	//return color to normal when not hovering
	function()
	{
		$(this).css("background-color","white");
	});	

	$("div").click(function()
	{
		switch(this.id)
		{
			case "spot1": 
			case "spot2":
			case "spot3":
			case "spot4":
			case "spot5": {
											document.getElementById("txtFilename").value="";
											checkforlocks(this.innerText); 
											break;
										}
		}
	});
});

</script>

<style>
	body {font-family:"Calibri";}
</style>
</head>
<body>

<h2>WHO'S IN MY FILE?! (<?php echo $PFLOC;?> filePro)</h2>
Extra New and Improved- Now safe for children! (but only the really smart ones)
<br>

<form id="getfile">
filePro file name (i.e. POF): 
<input type="text" id="txtFilename" onkeydown="return sanitize(this,event)" onkeyup="return sanitize(this,event)" ;>
<input type='button' value="check for locks" onclick="return checkforlocks(document.getElementById('txtFilename').value)";>
</form>
<br>
<div id="info" style="border-style:ridge; padding:10px; width=900px; float:left">
Enter the name of a filePro file in the box above and hit Enter to see if there are any records locks.
<br>
OR, click on one of the common searches below.
</div>

<br>
<div style="clear:left">
<br>
<table style="width:200px">
<th><u>Top five searches:</u></th>
<tr><td><center><div id="spot1"></div></td></tr>
<tr><td><center><div id="spot2"></div></td></tr>
<tr><td><center><div id="spot3"></div></td></tr>
<tr><td><center><div id="spot4"></div></td></tr>
<tr><td><center><div id="spot5"></div></td></tr>
</table>
</div>
</body>
</html>
