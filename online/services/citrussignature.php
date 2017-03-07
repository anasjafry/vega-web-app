<?php 											
    $secret_key = "47174500f0462da15e680703d7c0057f2e718f43"; 
    $access_key = "BUCSR9TEY01XIKSQDCTN"; 

    $txnID = "9043960876";
    $amount = "1.00"; 

    $returnURL = "http://localhost/vega-web-app/online/citrusresponse.php";
    $notifyUrl = "http://localhost/vega-web-app/online/citrusnotification.php";

    $data = "merchantAccessKey=" . $access_key
                . "&transactionId="  . $txnID 
                . "&amount="         . $amount;
    $signature = hash_hmac('sha1', $data, $secret_key);
    echo $signature;
?> 