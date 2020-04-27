<?php
//함수 정리
function _microtime ( ) { return array_sum(explode(' ',microtime())); }

//header setting
header('x-openrtb-version:2.5');
header('Content-Type:application/json');


$rawData = file_get_contents("php://input");
$s1 = json_decode($rawData,true);

/*
 * BidRequest
 * {
	"id": "4786d74e-96a2-4e74-a367-adca23fbcdda",
	"at": 2,
	"tmax": 100,
	"cur": ["KRW"],
	"test": 0,
	"imp": [{
		"id": "3d84e025-ecc1-4eef-ad6c-4dc720d237ac",
		"tagid": "08E40",
		"banner": {
			"w": 250,
			"h": 250
			}
		}],
	"device": {
		"ifa": "38400000-8cf0-11bd-b23e-10b96e40000d",
		"ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.6.17 (KHTML, like Gecko) Version/9.1.1 Safari/601.6.17",
		"dnt": 0,
		"lmt": 0,
		"ip": "125.209"
		},
	"user": {
		"id": "170458d6-9c00-470d-9e2e-c340430808d8"
	}

}
 */
$s2 = array('id' => $s1['id']);
$s2["bidid"] = md5(_microtime());
$s2["cur"] = "KRW";

//광고 정보 리딩(1개의 imp 일때 처리)
if(isset( $s1['imp'])){
    //echo
    $w = $s1['imp'][0]['banner']['w'];
    $h = $s1['imp'][0]['banner']['h'];
    $adTxt = "<div style='width: $w;height: $h;background-color:#ffeeff;position: relative;'><div style='position: absolute;top:50%;left: 50%;margin: -40px 0 0 -60px'><h1>$w x $h</h1></div></div>";
    //echo $adTxt;

}
else{
    echo "{}";
}


$bid = (object) array();
$bid->bidid = md5(_microtime());
$bid->id = $s1['imp'][0]['id'];
$bid->price = rand(1,500);
$bid->nurl = "http://www.adop.cc";
$bid->adm = $adTxt;

$seatbid = (object) array();
$seatbid->seat = rand(1,1000000);
$seatbid->bid = array($bid);

$s2["seatbid"] = array($seatbid);


//print_r($s2);
//exit('^^');

echo json_encode($s2);
exit();

//exit('<br /> terminate!!!');



//$s2['id'] = $s1["id"];
print_r($s1);
echo "=======================";
print_r($s2);
//echo "{'a':'1'}";
?>