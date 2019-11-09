import React, { Component } from 'react';


export default class Grafo extends Component {
  render() {
    return(
        
<head>
<link href="style.css" rel="stylesheet" />
<meta charset=utf-8 />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
<title>PI</title>
<link rel="stylesheet" href="style.css" type="text/css">
<script src="../../Pi/js/cytoscape.min.js"></script>
</head>
<body>
<canvas id="viewport" width="800" height="600"></canvas>
<div id="cy"></div>
<script src="code.js"></script>
</body>

    );
  }
}