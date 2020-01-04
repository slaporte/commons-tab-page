var settings = {'delay': 15000,
                'all_categories': 'Featured pictures of astronomy\nFeatured pictures of fish\nFeatured pictures of Charadriiformes\nFeatured pictures of Passeriformes\nFeatured pictures of Accipitriformes\nFeatured pictures of mammals\nFeatured pictures of architecture\nFeatured pictures of flowers\nFeatured pictures of landscapes\nFeatured night shots\nFeatured pictures of art\nFeatured maps\nFeatured pictures of lighthouses\nFeatured pictures of churches\nFeatured pictures of fortresses\nFeatured pictures of bridges\nFeatured pictures of the International Space Station\nFeatured pictures of rolling stock\nFeatured pictures of motorcycles\nFeatured pictures of ships\nFeatured pictures of aircraft\nPictures of the Year (2008)\nPictures of the Year (2009)\nPictures of the Year (2010)\nPictures of the Year (2011)\nPictures of the Year (2012)\nPictures of the Year (2013)'}

function shuffle(array) {
  /**
  * Returns a randomly shuffled array.
  * Copied from here: http://stackoverflow.com/a/2450976
  */
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function get_random_category() {
  /**
  * Returns a random category from the extension's local settings.
  */
  var all_categories = settings['all_categories'].split('\n');
  var rand_index = Math.floor(Math.random() * all_categories.length);
  var category = all_categories[rand_index].replace(/ /g, '_');
  if (category.indexOf('Category:') < 0) {
    category = 'Category:' + category;
  }
  return category;
}

function get_image_infos() {
  ret = []
  for (i=0; i < 10; i++) {
    var photo_idx = Math.floor(Math.random() * photos.length)
    var photo = photos[photo_idx]
    if (photo['imageinfo'] && photo['imageinfo'].length > 0 && photo['imageinfo'][0]['extmetadata']['LicenseShortName']) {
        var filename = photo['imageinfo'][0]['url'].split(/[\/]+/).pop();
        var parts = photo['imageinfo'][0]['url'].split(/commons\//);
        var src = parts[0] + 'commons/thumb/' + parts[1] + '/1440px-' + filename;
        var rights = photo['imageinfo'][0]['extmetadata']['LicenseShortName']['value'];
        ret.unshift({'src': src, 
                     'author': photo['imageinfo'][0]['user'],
                     'userpage': 'https://commons.wikimedia.org/wiki/User:' + photo['imageinfo'][0]['user'],
                     'title': photo['title'].replace('File:', '').split(/[\.]+/).shift(),
                     'filepage': photo['imageinfo'][0]['descriptionurl'],
                     'rights': rights});
      }
  }
  return ret  
}


$(function() {

  var slides = get_image_infos()
  $('body').vegas({
    timer: false,
    color: '#000',
    delay: settings['delay'],
    color: '#000',
    slides: slides,
    transitionDuration: 0,
    walk: function(index, slide) {
      $('#credits-container').show();
      $('#filename')
        .html(slide.title)
        .attr('href', slide.filepage);
      $('#author')
        .html(slide.author)
        .attr('href', slide.userpage);
      $('#rights')
        .html(slide.rights);
    }
  });

  $('#credits-container').hide();
})