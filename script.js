fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const elements = [];
    
    // Create Nodes
    data.albums.forEach(album => {
      elements.push({
        data: { 
          id: album.id, 
          label: album.title,
          color: album.rating === 'liked' ? '#8B5CF6' : '#3B82F6' // Purple vs Blue
        }
      });
    });

    // Create Connections
    data.links.forEach(link => {
      elements.push({ data: { source: link.source, target: link.target } });
    });

    // Initialize Cytoscape
    var cy = cytoscape({
      container: document.getElementById('cy'),
      elements: elements,
      style: [
        { selector: 'node', style: { 'background-color': 'data(color)', 'label': 'data(label)', 'color': '#fff' } },
        { selector: 'edge', style: { 'width': 2, 'line-color': '#ccc' } }
      ],
      layout: { name: 'cose', animate: true } // 'cose' creates the spiderweb effect
    });
  });
