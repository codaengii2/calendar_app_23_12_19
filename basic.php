<?php
$posts = [
    ['id' => 1, 'title' => 'First Post'],
    ['id' => 2, 'title' => 'Second Post']
];

$comments = [
    ['id' => 1, 'text' => 'Comment 1', 'postId' => 1],
    ['id' => 2, 'text' => 'Comment 2', 'postId' => 2]
];

$profile = [
    'name' => 'John Doe',
    'age' => 30
];

$holidays = [
    ['id' => 1, 'title' => 'New Year', 'start' => '2024-01-01'],
    ['id' => 2, 'title' => 'Independence Day', 'start' => '2024-07-04']
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = [];
    switch ($_SERVER['REQUEST_URI']) {
        case '/posts':
            $data = $posts;
            break;
        case '/comments':
            $data = $comments;
            break;
        case '/profile':
            $data = $profile;
            break;
        case '/holidays':
            $data = $holidays;
            break;
        default:
            http_response_code(404);
            $data = ['error' => 'Not Found'];
            break;
    }

    header('Content-Type: application/json');
    echo json_encode($data);
}
?>