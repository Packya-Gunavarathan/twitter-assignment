class TwitterSearch {

    constructor (target){
        this.$target = $(`#${target}`);
        this.$searchBtn = null;
        this.$loadMoreBtn = null;
        this.$searchBox = null;

        this.init();
    }

    /*Initialize the methods */
    init(){
        this.bindDom();
        this.bindListeners();
    }

    /*Bind DOM for variables decleared inside constructor*/
    bindDom(){
        this.$searchForm =  $('#searchTweet');
        this.$searchBox =  this.$target.find('.twitter-search__search-box');
        this.$loadMoreBtn =  this.$target.find('.twitter-search__load-btn');
    }
    /*Bind Listeners to Buttons and Actionalbles*/
    bindListeners() {
        let self = this;
        self.$searchForm.submit(function (event ) {
            console.log('Search button clicked');
            self.loadTweetList();
            event.preventDefault();
        });

        self.$loadMoreBtn.click(function () {
            console.log('Load More Search button clicked');
            self.getTweetList();
        });
    }
    getTweetList(){
        let keyWord = this.$searchBox.val();
        let self = this;
        $.ajax({
            method: "GET",
            url: "http://172.31.23.173:3333/tweetList",
            data: { key: keyWord, limit: 25 }
        })
            .done(function( result ) {
                console.log('Tweet list', result);
                self.loadTweetList();


            });
        /*CONSUMER_KEY: '0XG5299e6oSESyHvLGIMGmwW3'
        CONSUMER_SECRET: 'kh08Sydpo5hYYr0DCY8i7oJRAbxNkI1NKNpdStVi08ICIwBUOW'
        ACCESS_TOKEN: '3097151617-91Ayf0gu7O81oe6ae3quLPX5cxYkf7pZlkNZ09h'
        ACCESS_TOKEN_SECRET: 'TPnK7IgPW0TB0m9NemXiyKAlZC6rBRpqi56w7sDhVxEgl'*/
        /*$.ajax({
                url: 'https://api.twitter.com/1.1/search/tweets.json?q=%40twitterdev&count=25',
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'OAuth oauth_consumer_key="0XG5299e6oSESyHvLGIMGmwW3", oauth_nonce="kh08Sydpo5hYYr0DCY8i7oJRAbxNkI1NKNpdStVi08ICIwBUOW", oauth_signature="3097151617-91Ayf0gu7O81oe6ae3quLPX5cxYkf7pZlkNZ09h", oauth_signature_method="HMAC-SHA1", oauth_version="1.0"');
                },
                dataType: "jsonp",
                success: function(data) {
                    console.log("Success: " + data);
                },
            error: function(data) {
                console.log("Error " + JSON.stringify(data));
            }


    });*/
        /* $.getJSON("http://search.twitter.com/search.json?q=sheffield&callback=?", function(data) {
// loop around the result
            console.log(data);
        });*/
    }

    loadTweetList(){



    }

    searchTweets(){

    }

    updateTweetNotification(){

    }

}
