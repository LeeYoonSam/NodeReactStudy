(function() {
    $.fn.libChangeColor = function() {
        this.each(function() {
            var $dom = $(this);

            $dom.click(function() {
                $dom.css("color", "red");    
            });
        });
    };
}) ();