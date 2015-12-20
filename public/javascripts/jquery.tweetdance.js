(function(jQuery){
    // GetPoint
    var twitter='http://plusblog.jp/tweetdance/twittersearch.php';
    // 表示文字カラー
    var colorsRaw={white:15,red:1,pink:1,orange:1,yellow:1,green:1,cyan:1,purple:1}
    // カラー配列初期化
    var colors=[],

    // カラー配列初期化
    c=0;
    for(var i in colorsRaw){
        for(var j=0; j<colorsRaw[i]; j++){
            colors[j+c] = i;
        }
        c += j;
    }

    var nikoStart = function(){
        return function(){
            //　文字列
            var t = jQuery(this);
            //var href = t.attr('href');
            var width = t.attr('width');
            var height = t.attr('height');
            var img = t.attr('img');
            //var q = t.attr('q');
            var tweet = parseInt(9);
            var lheight = Math.round(height / (tweet+2));
            var fsize = Math.round((lheight / 3)*2);

            function(json){
                    t.attr('style', 'width:' + width + 'px; height:' + height + 'px; background-image:url(' + img + '); display:table-cell; text-decoration:none; vertical-align:middle; background-repeat:no-repeat;');
                    for(var i=0; i<json.statuses.length; i++){
                        addMarquee(t,json.statuses[i], fsize, lheight);
                    }
            }
        }
    });

    // @param t.tweet (メッセージ), fsize(フォントサイズ), lheight(文字高さ)
    function addMarquee(t, tweet, fsize, lheight){
        var scrollamount = Math.round(tweet.text.length / 20) + 5;
        var url = 'https://twitter.com/' + tweet.from_user + '/status/' + tweet.id_str;
        var style='font-weight:bold; color:' + getColor() + '; text-decoration:none; text-shadow:1px 1px 1px #222; font-size:' + fsize + 'px; line-height:' + lheight + 'px; filter:DropShadow(color=#202020 offX=1 offY=0) DropShadow(color=#202020 offX=-1 offY=0) DropShadow(color=#202020 offX=0 offY=1) DropShadow(color=#202020 offX=0 offY=-1);';
        t.append('<marquee scrolldelay="1" scrollamount="' + scrollamount + '"><a href="" target="_blank" style="' + style + '">' + tweet.text + '</a></marquee>');
    }

    function getColor(){
        return colors[Math.floor(Math.random() * colors.length)];
    }
})(jQuery);
