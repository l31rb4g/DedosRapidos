<?php
ini_set('display_errors', 'on');
error_reporting(E_ALL ^ E_STRICT);
$db = new PDO('mysql:host=localhost;dbname=dedosrapidos', 'dedosrapidos', ';2~(@#C#&*V%#&*(Y');
$db->exec('SET CHARACTER SET UTF8');

if (isset($_GET['action'])){
    $action = $_GET['action'];
    
    if ($action == 'top15'){
        $q = $db->prepare("SELECT * FROM top15 ORDER BY score DESC limit 15");
        $q->execute();
        $top15 = [];
        while ($l = $q->fetch(PDO::FETCH_ASSOC)){
            $top15[] = [$l['name'], $l['score']];
        }
        echo json_encode($top15);
    }
    
    if ($action == 'score'){
        $name = strip_tags(trim($_POST['nickname']));
        $score = strip_tags(intval($_POST['score']));
        $conn = $db->prepare("INSERT INTO top15 VALUES (NULL, '$name', $score, NULL)");
        $conn->execute();
    }
        
}