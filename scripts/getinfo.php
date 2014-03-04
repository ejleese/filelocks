<?php

$USER=$_GET["user"];
$PID=getmypid();
$TMPFILE="/tmp/getinfo_$PID";

//passthru("echo 'getinfo.php$USER$OUTFILE' | mutt -s getinfo.php ericl@borisch.com");

system("/appl/fp/dreport filelocks_log -fp getinfo -sr 1 -u -r $TMPFILE -rw $USER >> /dev/null");
system("cat $TMPFILE");
system("rm -f $TMPFILE");

?>
