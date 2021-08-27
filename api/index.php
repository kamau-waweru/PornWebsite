<?php
header('Content-Type: application/json');

$cache = false;

if(!isset($_GET['tipo']))
    die(json_encode(array("error" => "API missing \"tipo\"!")));

switch($_GET['tipo']){
    case "portugues":
        $url = "https://www.xvideos.com/lang/portugues";
    break;
    case "gay":
        $url = "https://www.xvideos.com/gay";
    break;
    case "trans":
        $url = "https://www.xvideos.com/shemale";
    break;
    case "best":
        $url = "https://www.xvideos.com/best/".date("Y-D");
    break;
    case "search":
        if(!isset($_GET['query']))
            $_GET['query'] = "novinha";
    $url = "https://www.xvideos.com/?k=".strip_tags(stripslashes($_GET['query']));
    break;
    default:
    $url = "https://www.xvideos.com/lang/portugues";
    break;
}

if(isset($_GET['pagina'])){
    $pagina = isset($_GET['pagina']) ? (int) $_GET['pagina'] : 1;
    $url = $url."/".$pagina;
}

if($cache){
@mkdir("cache");

$hash_cache = md5(date("d-m-y").$url);

if(file_exists("cache/".$hash_cache.".cache")){
    die(file_get_contents("cache/".$hash_cache.".cache"));
}
}

$array = array();
$page = file_get_contents($url);
preg_match_all("<div id=\"video_(.*)>", $page, $out);

foreach($out[0] as $item){

    $pregTitle = preg_match('/<p class=\"title\"><a href=\"(.*)\" title=\"(.*)\">(.*) <span class=\"duration\">(.*)<\/span><\/a><\/p>/siU', $item, $title);
    $pregDuration = preg_match('/<span class="duration">(.*)<\/span>/siU', $item, $duration);
    $pregQuality = preg_match('/<span class="video-(.*)-mark">(.*)<\/span>/siU', $item, $quality);
    $pregThumb = preg_match('/data-src="(.*)"/siU', $item, $thumbnail);
    $pregPath = preg_match('/<a href=\"(.*)\">/siU', $item, $path);
    $pregChannel = preg_match('/<span class=\"name\">(.*)</siU', $item, $channel);
    $pregViews = preg_match('/<\/span> (.*) <span class=\"sprfluous\">Views<\/span>/siU', $item, $views);

    if($pregTitle)
        $titulo = $title[3];
    else
        $titulo = "Sem título";

    if($pregDuration)
        $duracao = $duration[1];
    else
        $duracao = "?:?";

    if($pregQuality)
        $qualidade = $quality[2];
    else
        $qualidade = "?";

    if($pregThumb)
        $imgthumb = $thumbnail[1];
    else
        $imgthumb = "";

    if($pregPath)
        $pathVideo = $path[1];
    else
        $pathVideo = "";

    if($pregChannel)
        $canal = $channel[1];
    else
        $canal = "";

    if($pregViews)
        $visualizacoes = $views[1];
    else
        $visualizacoes = 0;

    $preview = explode("/", $imgthumb);
    
    //https://cdn77-pic.xvideos-cdn.com/videos/videopreview/b7/6a/57/b76a57e6babc08a824305152c2ffca08_169.mp4
    //https://cdn77-pic.xvideos-cdn.com/videos/thumbs169ll/b7/6a/57/b76a57e6babc08a824305152c2ffca08/b76a57e6babc08a824305152c2ffca08.3.jpg

    $linkPreview = $preview[0]."//".$preview[2]."/videos/videopreview/".$preview[5]."/".$preview[6]."/".$preview[7]."/".$preview[8]."_169.mp4";
    $videoId = str_replace("video", "", explode("/", $pathVideo)[1]);
    $video = array(
        "videoId" => $videoId,
        "title" => $titulo,
        "duration" => $duracao,
        "quality" => $qualidade,
        "thumbnail" => $imgthumb,
        "preview" => $linkPreview,
        "path" => $pathVideo,
        "channel" => $canal,
        "views" => $visualizacoes
    );
    array_push($array, $video);
}

$output = json_encode($array, JSON_PRETTY_PRINT);

if($cache){
$fp = fopen("cache/".$hash_cache.".cache", "w");
fwrite($fp, $output);
fclose($fp);
}

echo $output;
