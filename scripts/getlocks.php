<?php
//get file lock info

$filename=$_GET['file'];
$PID=getmypid();
$TMPFILE="/tmp/chklock$PID";

system(". /etc/profile; / $HOME/.bash_profile; /appl/fp/dreport filelocks_log -fp locked2 -sr 1 -u -r $PID -rw $filename >> /dev/null");

system("cat $TMPFILE");
system("rm -f $TMPFILE");

?>
