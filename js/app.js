$(function() {

        var limit = 15;
        var defaultSearch = 'athens'

       // default
        $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47f195244824d0f049993018e24224d4&text=' + defaultSearch + '&format=json&jsoncallback=?', function (item) {
            $.each(item.photos.photo, function (i, item) {
                if(i < limit) {
                  
                    var bannerName = item.id + '_' + item.secret + '_z.jpg?zz=1';
                    var bannerUrl = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + bannerName;
                    var thumbName = item.id + '_' + item.secret + '_q.jpg';
                    var thumbUrl = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + thumbName;
                    var thumbTag = '<img class="fimg" src="' + thumbUrl + '" mce_src="' + thumbUrl + '" />';
                    var flickrLink = '<a href="' + bannerUrl + '">' + thumbTag + '</a>';    
                    $(flickrLink).appendTo("#flick");  
                } else return false;
            });

            $('#flick a').click(function(e) {
                e.preventDefault();
                var banner = $(this).attr('href');
                $('#banner img').attr('src',banner);
            });

            var firstImg = $('#flick a').first().attr('href');
            var defaultBanner = '<img src="'+ firstImg +'" />';
            $(defaultBanner).appendTo('#banner');
        });

        // search
        $('#fsearch').click(function(e) {
        	e.preventDefault();
            $('#flick').empty();
            var fquery = $('#flickbox').val();
            var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47f195244824d0f049993018e24224d4&text='+ fquery +'&per_page=' + limit + '';
            $.getJSON(url + "&format=json&jsoncallback=?", function (item) {
                $.each(item.photos.photo, function (i, item) {
                   var bannerName = item.id + '_' + item.secret + '_z.jpg?zz=1';
                    var bannerUrl = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + bannerName;
                    var thumbName = item.id + '_' + item.secret + '_q.jpg';
                    var thumbUrl = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + thumbName;
                    var thumbTag = '<img class="fimg" src="' + thumbUrl + '" mce_src="' + thumbUrl + '" />';
                    var flickrLink = '<a href="' + bannerUrl + '">' + thumbTag + '</a>';
                    $(flickrLink).appendTo("#flick");
                });

               $('#flick a').click(function(e) {
                e.preventDefault();
                var banner = $(this).attr('href');
                $('#banner img').attr('src',banner);
            });
            });
        });
        
    });