/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *28/02/17 :: 20:16-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
"use strict";

function Hotel(){
    console.log('init Hotel');
    return
};

Hotel.prototype = {
    setPhotoGallery: function(){
        try{
            jQuery('.thumb').css({
                'width': 'calc(' + (100 / (jQuery('.thumb').length)) + '% - 10px'
            });
            var image = jQuery('.thumb:first').attr('href');
            jQuery('.photo').css({
                'background-image': 'url("' + image + '")'
            });
            jQuery('.thumb:first').addClass('active');
        }catch (err){
            console.error(err);
        }
    },
    setThumbsClick: function(){
        try{
            jQuery('.thumb').click(function(e){
                e.preventDefault();
                if(jQuery(this).hasClass('active')){
                    return false;
                }
                var this_image = jQuery(this).attr('href');
                jQuery('.photo').fadeOut('fast', function(){
                    jQuery(this).css({
                        'background-image': 'url("' + this_image + '")'
                    });
                });
                jQuery('.photo').fadeIn();
                jQuery('.active').removeClass('active');
                jQuery(this).addClass('active');
            });

            jQuery('.gallery-buttons').click(function(e){
                e.preventDefault();
                //Previous click
                if(jQuery(this).hasClass('prev-button')){
                    var prev = jQuery('.thumb.active').prev();
                    if(prev.length <= 0){
                        return false;
                    }
                    var prev_image = jQuery('.thumb.active').prev().attr('href');
                    jQuery('.photo').fadeOut('fast', function(){
                        jQuery(this).css({
                            'background-image': 'url("' + prev_image + '")'
                        });
                    });
                    jQuery('.photo').fadeIn();

                    jQuery('.thumb.active').removeClass('active');
                    prev.addClass('active');
                }
                //Next click
                if(jQuery(this).hasClass('next-button')){
                    var next = jQuery('.thumb.active').next();
                    if(next.length <= 0){
                        return false;
                    }
                    var next_image = jQuery('.thumb.active').next().attr('href');
                    jQuery('.photo').fadeOut('fast', function(){
                        jQuery(this).css({
                            'background-image': 'url("' + next_image + '")'
                        });
                    });
                    jQuery('.photo').fadeIn();

                    jQuery('.thumb.active').removeClass('active');
                    next.addClass('active');
                }
            });

        }catch(err){
            console.error(err);
        }
    },
    getOptionsFilters: function(){
        try{
            var hotel = window.location.pathname.split('/')[2];

            jQuery(window).on('load', function(){
                console.log('haha');
            });
            //Get departures list
            var departures = jQuery.ajax({
                method: "GET",
                url: "/api/departures/" + hotel,
                dataType: "json"
            });
            departures.done(function( data ) {
                var dados = data;
                for(var i = 0; i < dados.length; i++){
                    jQuery('#departures').append('<option value="' + dados[i] + '">' + dados[i] + "</option>");
                };
            });
            //Get dailys list
            var dailys = jQuery.ajax({
                method: "GET",
                url: "/api/dailys/" + hotel,
                dataType: "json"
            });
            dailys.done(function( data ) {
                var dados = data;
                for(var i = 0; i < dados.length; i++){
                    jQuery('#dailys').append('<option value="' + dados[i] + '">' + dados[i] + "</option>");
                };
            });
        }catch(err){
            console.error(err);
        }
    },
    setExtras: function(){
        try{
            jQuery('.tag').each(function(){
                if(jQuery(this).html().indexOf('Tarifa') >= 0){
                    jQuery(this).addClass('tarifa');
                }
                if(jQuery(this).html().indexOf('Cancelamento') >= 0){
                    jQuery(this).addClass('cancelamento');
                }
            });
        }catch(err){
            console.error(err);
        }
    },
    init: function(){
        this.setPhotoGallery();
        this.setThumbsClick();
        this.getOptionsFilters();
        this.setExtras();
    }
};

jQuery(document).ready(function(){
    var hotel = new Hotel();
    hotel.init();
});
