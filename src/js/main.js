(function() {
    var $window = $(window);
        winHeight = $window.height();

    $window.on('load', function() {
        var $onScrollAniatedBlocks = $('.scroll-animation'),
            onScrollAniatedBlocksPositions = [],
            onScrollAniatedBlocksHeights = [];

        $onScrollAniatedBlocks.each(function() {
            var $this = $(this);

            onScrollAniatedBlocksPositions.push($this.offset().top);
            onScrollAniatedBlocksHeights.push($this.outerHeight());
        });

        $window.on('scroll', function() {
            var scrollTop = $window.scrollTop();

            $onScrollAniatedBlocks.each(function(i) {
                var $this = $(this);

                if (scrollTop + winHeight > onScrollAniatedBlocksPositions[i] + onScrollAniatedBlocksHeights[i] / 2) {
                    $this.addClass('animated');
                }

            });
        });
    });
})();