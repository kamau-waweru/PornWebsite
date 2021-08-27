<?php
header('Content-Type: application/json');

$cache = false;

if (!isset($_GET['tipo']))
    $_GET['tipo'] = "portugues";

$url = "https://www.xvideos.com";

if (!isset($_GET['query']))
    $_GET['query'] = "novinha";

$categorias = array(
    "gay" => "/gay",
    "trans" => "/shemale",
    "best" => "\/best/" . date("Y-D"),
    "amador" => "/c/Amateur-65",
    "anal" => "/c/Anal-12",
    "asiatica" => "/c/Asian_Woman-32",
    "asmr" => "/c/ASMR-229",
    "bbw" => "/c/bbw-51",
    "bi" => "/c/Bi_Sexual-62",
    "boquete" => "/c/Blowjob-15",
    "coroa" => "/c/Mature-38",
    "familia" => "/c/Fucked_Up_Family-81",
    "firsting" => "/c/Fisting-165",
    "gangbang" => "/c/Gangbang-69",
    "cumshot" => "/c/Cumshot-18",
    "creampie" => "/c/Creampie-40",
    "interracial" => "/c/Interracial-27",
    "portugues" => "/lang/portugues",
    "search" => "/?k=" . $_GET['query'],
    "lesbicas" => "/c/Lesbian-26",
    "latina" => "/c/Latina-16",
    "lingerie" => "/c/Lingerie-83",
    "loira" => "/c/Blonde-20",
    "morena" => "/c/Brunette-25",
    "bigcock" => "/c/Big_Cock-34",
    "bigtits" => "/c/Big_Tits-23",
    "blackwoman" => "/c/Black_Woman-30",
    "ruiva" => "/c/Redhead-31",
    "solo" => "/c/Solo_and_Masturbation-33",
    "squirting" => "/c/Squirting-56",
    "camera" => "/c/Cam_Porn-58",
    "milf" => "/c/Milf-19",
    "bigass" => "/c/Big_Ass-24"
);

if (array_key_exists(strtolower($_GET['tipo']), $categorias)) {
    $url .= $categorias[strtolower($_GET['tipo'])];
} else {
    $url .= "/lang/portugues";
}

if (isset($_GET['pagina'])) {
    $pagina = isset($_GET['pagina']) ? (int) $_GET['pagina'] : 0;
    if ($pagina > 0)
        $url = $url . "/" . $pagina;
}


if ($cache) {
    @mkdir("cache");
    $hash_cache = md5(date("d-m-y") . $url);
    if (file_exists("cache/" . $hash_cache . ".cache")) {
        die(file_get_contents("cache/" . $hash_cache . ".cache"));
    }
}

$array = array();
$page = file_get_contents($url);
preg_match_all("<div id=\"video_(.*)>", $page, $out);

foreach ($out[0] as $item) {

    $pregTitle = preg_match('/<p class=\"title\"><a href=\"(.*)\" title=\"(.*)\">(.*) <span class=\"duration\">(.*)<\/span><\/a><\/p>/siU', $item, $title);
    $pregDuration = preg_match('/<span class="duration">(.*)<\/span>/siU', $item, $duration);
    $pregQuality = preg_match('/<span class="video-(.*)-mark">(.*)<\/span>/siU', $item, $quality);
    $pregThumb = preg_match('/data-src=\"(.*)\"/siU', $item, $thumbnail);
    $pregPath = preg_match('/<a href=\"(.*)\">/siU', $item, $path);
    $pregChannel = preg_match('/<span class=\"name\">(.*)</siU', $item, $channel);
    $pregViews = preg_match('/<\/span> (.*) <span class=\"sprfluous\">Views<\/span>/siU', $item, $views);

    if ($pregTitle)
        $titulo = $title[3];
    else
        $titulo = "Sem título";

    if ($pregDuration)
        $duracao = $duration[1];
    else
        $duracao = "?:?";

    if ($pregQuality)
        $qualidade = $quality[2];
    else
        $qualidade = "";

    if ($pregThumb)
        $imgthumb = $thumbnail[1];
    else
        $imgthumb = "";

    if ($pregPath)
        $pathVideo = $path[1];
    else
        $pathVideo = "";

    if ($pregChannel)
        $canal = $channel[1];
    else
        $canal = "";

    if ($pregViews)
        $visualizacoes = $views[1];
    else
        $visualizacoes = 0;

    $preview = explode("/", $imgthumb);

    $linkPreview = $preview[0] . "//" . $preview[2] . "/videos/videopreview/" . $preview[5] . "/" . $preview[6] . "/" . $preview[7] . "/" . $preview[8] . "_169.mp4";
    $videoId = str_replace("video", "", explode("/", $pathVideo)[1]);
    $video = array(
        "videoId" => $videoId,
        "title" => $titulo,
        "duration" => $duracao,
        "quality" => $qualidade,
        "thumbnail" => str_replace("THUMBNUM", rand(1, 10), $imgthumb),
        "preview" => $linkPreview,
        "path" => $pathVideo,
        "channel" => $canal,
        "views" => $visualizacoes,
        "url" => $url
    );
    array_push($array, $video);
}

$output = json_encode($array, JSON_PRETTY_PRINT);

if ($cache) {
    $fp = fopen("cache/" . $hash_cache . ".cache", "w");
    fwrite($fp, $output);
    fclose($fp);
}

echo $output;
