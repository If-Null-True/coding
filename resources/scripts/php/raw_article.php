<?php
  include "./get_article_info.php";

  $dir = '../../articles/';
  $q = $_GET['q']; // this is the base64 encoded version of $query
  $metaonly = $_GET['meta-only'];
  $metadata_only = false;

  if ($metaonly !== null) $metadata_only = true;

  /* Get all articles */
  if ($q === null) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(get_all_articles($dir, $metadata_only));
  }

  /* Get a specific article */
  else {
    $query = base64_decode($q, true);

    if ($query === false) {
      http_response_code(400);
      echo 'Error! Invalid query.';
      exit;
    }

    else {
      $article_data = get_article_info($dir, $query, $metadata_only);

      if ($article_data === false) {
        http_response_code(404);
        echo 'Error! That file does not exist';
        exit;
      }

      else {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($article_data);
      }
    }
  }
?>