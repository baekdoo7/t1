<?php

    $sid = isset($_GET['sid'])?$_GET['sid']:'';
    $val = isset($_GET['val'])?$_GET['val']:'';

    //insert_cookie("a3",12345);
    if($val <> '3'){
        if($val == '4'){
            echo delete_cookie($sid,$val);            
        }
        else{
            insert_cookie($sid,$val);                
        }
    }
    else{
            echo read_cookie($sid,$val);            
    }



function read_cookie($cid,$val){
    //디비연결 
    $conn=mysqli_connect("compass-cluster.cluster-cnzcxy7quzcs.ap-northeast-2.rds.amazonaws.com","adopadmin","Adop*^14","tmp");
    if(!$conn){
	   echo "Debugging errno : ". mysqli_connect_error() .PHP_EOL;
	   exit;
    }
    $rtn = 'null';
    
    $query = "select * from session_chk where id = '$cid'";

    $result = mysqli_query($conn,$query);
    
    while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
       
       $rtn = $row["val"];
    }
    
    
    //디비 종료
    mysqli_close($conn);
    
    return $rtn;
}

function delete_cookie($cid,$val){
    //디비연결 
    $conn=mysqli_connect("compass-cluster.cluster-cnzcxy7quzcs.ap-northeast-2.rds.amazonaws.com","adopadmin","Adop*^14","tmp");
    if(!$conn){
	   echo "Debugging errno : ". mysqli_connect_error() .PHP_EOL;
	   exit;
    }
    
    
    $query = "delete from session_chk where id = '$cid' ";
    
    
    //디비 인서트
    mysqli_query($conn,$query);
    
    //디비 종료
    mysqli_close($conn);    
    
    return 'null';
}

function insert_cookie($cid,$val){
    //디비연결 
    $conn=mysqli_connect("compass-cluster.cluster-cnzcxy7quzcs.ap-northeast-2.rds.amazonaws.com","adopadmin","Adop*^14","tmp");
    if(!$conn){
	   echo "Debugging errno : ". mysqli_connect_error() .PHP_EOL;
	   exit;
    }
    
    
    $query = "insert into session_chk value('$cid',$val) on duplicate key update val=$val ";
    
    
    //디비 인서트
    mysqli_query($conn,$query);
    
    //디비 종료
    mysqli_close($conn);    
}

?>

















