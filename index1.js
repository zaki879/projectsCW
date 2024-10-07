const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer d7e37134a6d22a78fcf076431c2c1d3ef73c606801b976fed1e2e16359717610'
    }
  };
  
  fetch('https://try.readme.io/https://api.webflow.com/v2/collections/66fd0fe543d4d200a323a9fe/items', options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON response
    })
    .then(data => {
      const leftColumn = document.getElementById('projects-item'); // Left column container
      const rightColumn = document.querySelector('.cw-work-col.-right'); // Right column container
  
      // Store the project items for filtering
      const projectItems = [];
  
      // Clear existing content
      leftColumn.innerHTML = '';
      rightColumn.innerHTML = '';
  
      // Loop through each item and create the HTML structure
      data.items.forEach((item, index) => {
        const { fieldData } = item; // Get fieldData
        const projectDataCat = fieldData['project-dat-cat'] || []; // Get project categories, default to empty array if undefined
  
        // Create the anchor element
        const anchor = document.createElement('a');
        anchor.className = 'cw-work-item';
        anchor.href = `item.html?slug=${fieldData.slug}`;
        anchor.setAttribute('data-cursor-text', 'Explore');
        anchor.setAttribute('aria-label', fieldData.name);
        anchor.setAttribute('data-cat', JSON.stringify(fieldData['project-dat-cat'] || []));
    
        // Add click event to anchor
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const slug = fieldData.slug;
          setTimeout(() => {
            window.location.href = `item.html?slug=${slug}`;
          }, 500);
        });
    
        anchor.style.cssText = `
          opacity: 1;
          translate: none;
          rotate: none;
          scale: none;
          transform: translate(0px, 0px);
          will-change: auto;
        `;
    
        // Add click event to anchor
        anchor.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default anchor behavior
          const slug = fieldData.slug; // Store slug for use in the URL
          history.pushState({ slug }, '', anchor.href); // Change the URL in the address bar
          loadProject(slug); // Function to load project content
        });
    
        // Create the inner content
        const workPreviewDiv = document.createElement('div');
        workPreviewDiv.className = 'cw-work-preview -sm';
  
        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'cw-work-preview-media';
  
        // Create the image
        const picture = document.createElement('picture');
        const img = document.createElement('img');
        img.src = fieldData['project-thumbnail'].url; // Use the thumbnail URL
        img.srcset = `${fieldData['project-thumbnail'].url} 2x`; // Set srcset for high-res image
        img.alt = fieldData['project-sub-title']; // Set alt text
  
        // Append the image to the picture
        picture.appendChild(img);
        mediaDiv.appendChild(picture);
        workPreviewDiv.appendChild(mediaDiv);
        anchor.appendChild(workPreviewDiv);
  
        // Create the caption
        const captionDiv = document.createElement('div');
        captionDiv.className = 'cw-work-caption';
        captionDiv.innerHTML = `<b>${fieldData.name}</b> – ${fieldData['project-sub-title']}`; // Set the caption text
  
        anchor.appendChild(captionDiv);
  
        // Append the item to the appropriate column based on index
        if (index % 2 === 0) {
          leftColumn.appendChild(anchor); // Append to left column for even indices
        } else {
          rightColumn.appendChild(anchor); // Append to right column for odd indices
        }
  
        // Store the anchor in the projectItems array for filtering
        projectItems.push(anchor);
      });
  
      // Filter functionality
      const filterLinks = document.querySelectorAll('.cw-modal_box-nav-item a');
  
      filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = e.currentTarget.getAttribute('data-filter-target');
          
          console.log("Selected target:", target); // Log the selected target
  
          // Clear both left and right columns before re-adding filtered items
          leftColumn.innerHTML = '';
          rightColumn.innerHTML = '';
  
          let filteredItems;
  
          // Show all items if 'all' is selected
          if (target === 'all') {
            filteredItems = projectItems; // Show all items
          } else {
            filteredItems = projectItems.filter(item => {
              const itemCategoriesStr = item.getAttribute('data-cat'); // Get categories from data attribute
              if (!itemCategoriesStr) {
                console.warn("No categories found for item:", item); // Warn if no categories
                return false; // Exclude item if no categories
              }
      
              const itemCategories = JSON.parse(itemCategoriesStr); // Parse JSON string to array
              console.log("Item categories:", itemCategories); // Log item categories
  
              // Check if the item categories include the target category
              return itemCategories.includes(target); // Only include matching items
            });
          }
  
          // Re-split filtered items between the left and right columns
          filteredItems.forEach((item, index) => {
            item.style.display = ''; // Ensure the item is visible
            if (index % 2 === 0) {
              leftColumn.appendChild(item); // Append to left column
            } else {
              rightColumn.appendChild(item); // Append to right column
            }
          });
        });
      });
  
    })
    .catch(err => {
      console.error('Fetch error:', err); // Handle any errors
    });
  