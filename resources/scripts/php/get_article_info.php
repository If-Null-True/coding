<?php
  function get_article_info($dir, $file_name, $metadata_only = false): mixed {
    /* FORMAT INPUTS */
    if (!str_ends_with($dir, '/')) { $dir = $dir . '/'; }


    /* IGNORE NON-ARTICLES */
    // Ignore non-article directories
    if ($file_name === '.' || $file_name === '..' || !str_ends_with($file_name, '.md')) { return false; }

    $file_data = file_get_contents($dir . $file_name);

    // Ignore non-existent files
    if ($file_data === false) { return false; }

    // Ignore poorly-formatted articles
    if (!str_starts_with($file_data, '---')) { return false; }


    /* GET METADATA */
    // Get metadata string
    $file_data = ltrim($file_data, "-\r\n"); // Removes --- from the start of the file
    $data_list = explode("\n---\n", $file_data);
    $metadata_string = $data_list[0];
    
    // Ignore drafts
    if ( str_contains($metadata_string, "draft: true") 
      || str_contains($metadata_string, "draft:true") 
      || str_contains($metadata_string, "draft:  true")
       )
    {
      return false;
    }

    // Get metadata list
    $metadata_list = explode("\n", $metadata_string);

    // Get properties
    $article_data = ['id' => base64_encode($file_name)];
    foreach ($metadata_list as $property) {
      if (str_starts_with($property, 'title:')) {
        $list = explode("\"", $property);
        if (count($list) == 1) $list = explode("'", $property);
        array_shift($list);
        $article_data['title'] = trim(substr(implode("\"", $list), 0, -1));
      }
      else if (str_starts_with($property, 'date:')) {
        $list = explode("date:", $property);
        array_shift($list);
        $date = explode("-", trim(implode($list)));
        $bce = false;
        if (count($date) === 4) {
          $bce = true;
          array_shift($date);
        }
        else if (count($date) !== 3) return false;
        $article_data['date'] = [
          'year' => ((int) $date[0]) * (($bce)? -1 : 1),
          'month' => (int) $date[1],
          'day' => (int) $date[2]
        ];
      }
      else if (str_starts_with($property, 'session:')) {
        $list = explode("session:", $property);
        array_shift($list);
        $session = explode("/", trim(implode($list)));
        if (count($session) !== 2) return false;
        $article_data['session'] = [
          'term' => (int) $session[0],
          'week' => (int) $session[1]
        ];
      }
    }

    
    /* METADATA ONLY */
    if ($metadata_only) { return $article_data; }


    /* GET CONTENT */
    array_shift($data_list);
    $content = implode("\n---\n", $data_list);
    $article_data['content'] = trim($content);

    
    /* RETURN */
    return $article_data;
  }



  function get_all_articles($dir, $metadata_only = false): mixed {
    $files = scandir($dir, SCANDIR_SORT_ASCENDING);
    
    $article_list = [];

    // Get article data
    foreach ($files as $file) {
      $article_data = get_article_info($dir, $file, $metadata_only);
  
      if ($article_data !== false) {
        array_push($article_list, $article_data);
      }
    }

    // Sort by date
    function cmp($a, $b) {
      $asc = false;
      $lower = ($asc)? -1 : 1;
      $upper = ($asc)? 1 : -1;

      $d1 = $a['date'];
      $d2 = $b['date'];
      if ($d1 === $d2) { return 0; }

      if ($d1['year']  < $d2['year'])  { return $lower; }
      if ($d1['year']  > $d2['year'])  { return $upper; }
      if ($d1['month'] < $d2['month']) { return $lower; }
      if ($d1['month'] > $d2['month']) { return $upper; }
      if ($d1['day']   < $d2['day'])   { return $lower; }
      if ($d1['day']   > $d2['day'])   { return $upper; }

      return 0;
    }
    usort($article_list, "cmp");
    
    return $article_list;
  }
?>