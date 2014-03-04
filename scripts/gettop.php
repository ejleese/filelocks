<?php
//get list of top most requested files searched for

$PID=getmypid();
$TMPFILE="/tmp/toplocks_$PID";

system("/appl/fp/dreport filelocks_log -fp lockmostrequested -sr 1 -u -r $PID >> /dev/null");

system("cat $TMPFILE");
system("rm -f $TMPFILE");

?>

