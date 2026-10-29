<?php
$segment = isset($_GET['path']) ? (string) $_GET['path'] : '';
$segment = ltrim($segment, '/');

if ($segment === '' || strpos($segment, '..') !== false || strpos($segment, '\\') !== false) {
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('success' => false, 'message' => 'Path API tidak valid'));
    exit;
}

$upstream = 'https://abipay-id-4ic7-bsrdddrhk-lionheart1.vercel.app/api/' . $segment;

$params = $_GET;
unset($params['path']);
if (!empty($params)) {
    $upstream .= '?' . http_build_query($params);
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
$body = file_get_contents('php://input');

if (!function_exists('curl_init')) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('success' => false, 'message' => 'cURL PHP belum aktif di hosting'));
    exit;
}

$headers = array('Accept: application/json, text/plain, */*');
if (!empty($_SERVER['CONTENT_TYPE'])) {
    $headers[] = 'Content-Type: ' . $_SERVER['CONTENT_TYPE'];
}

$ch = curl_init($upstream);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

if ($method !== 'GET' && $method !== 'HEAD') {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body === false ? '' : $body);
}

$response = curl_exec($ch);
if ($response === false) {
    http_response_code(502);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('success' => false, 'message' => 'Gagal menghubungi server API'));
    curl_close($ch);
    exit;
}

$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

$rawHeaders = substr($response, 0, $headerSize);
$respBody = substr($response, $headerSize);

http_response_code($status > 0 ? $status : 502);
foreach (preg_split("/\r\n|\n|\r/", $rawHeaders) as $line) {
    if (stripos($line, 'Content-Type:') === 0 || stripos($line, 'Content-Disposition:') === 0) {
        header($line);
    }
}

echo $respBody;
