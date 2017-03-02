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
    filterOptions: function(){
        try{
            var _this = this;
            var hotel = window.location.pathname.split('/')[2];
            var data = {};
            jQuery('select').each(function(){
                jQuery(this).on('change', function(){
                    var filter = jQuery('option:selected', this).val();
                    if(jQuery(this).val() === 'null'){
                        return false;
                    }
                    if(jQuery(this).attr('id') === 'dailys'){
                        console.log('dailys');
                        if(filter === 'all'){
                            data.daily = null
                        }else{
                            data.daily = filter;
                        }
                    }
                    if(jQuery(this).attr('id') === 'departures'){
                        console.log('from');
                        if(filter === 'all'){
                            data.from = null
                        }else{
                            data.from = filter;
                        }
                    }
                    var options = jQuery.ajax({
                        method: "POST",
                        url: "/api/options/" + hotel,
                        dataType: "json",
                        data: data
                    });
                    options.done(function( data ) {

                        var dados = data;

                        jQuery('body').animate({scrollTop: jQuery('.filters').offset().top}, 500, 'swing');
                        jQuery('span.loader').fadeIn();
                        jQuery('.option').fadeTo('slow', 0.3);

                        if(dados.length > 0) {

                            setTimeout(function () {
                                jQuery('.option').remove();

                                for (var i = 0; i < dados.length; i++) {

                                    var valor = dados[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    var html = '<div class="option"><div class="main-info"><h2>' + dados[i].title + '</h2>';
                                    html += '<p>' + dados[i].description + '</p></div><div class="departures-info">';
                                    html += '<h3>Sa&iacute;das:</h3><ul class="departures-list">';
                                    for (var j = 0; j < dados[i].from.length; j++) {
                                        html += '<li>' + dados[i].from[j] + '</li>';
                                    }
                                    html += '</ul></div><div class="package">';
                                    html += '<p>' + dados[i].daily + '<img src="/images/daily.png" alt="Diárias"><span>Di&aacute;rias</span></p>';
                                    html += '<p>1 <img src="/images/people.png" alt="Pessoas"> <span>Pessoa</span></p>';
                                    html += '</div><div class="prices"><p class="tag">$ ' + dados[i].extras + '</p>';
                                    html += '<p>Por apenas:</p><p class="price">R$ <span>' + valor + '</span></p>';
                                    html += '<p>+ taxas em até 10x</p><a href="#" class="button button-orange">Quero ir</a>';
                                    html += '</div></div>';

                                    jQuery('#options').append(html);

                                    jQuery('.option').fadeIn();

                                    jQuery('span.loader').fadeOut();

                                }
                                ;
                                _this.setExtras();
                            }, 2000);
                        }else{
                            jQuery('span.loader').fadeOut();
                            jQuery('.option').fadeTo('slow', 1);
                            jQuery('.warning').html('Nenhum resultado encontrado com esta combinação de filtros.');
                            jQuery('#warnings').fadeIn();
                            setTimeout(function(){
                                jQuery('#warnings').fadeOut('fast', function(){
                                    jQuery('.warning').html('');
                                });
                            }, 3000);
                        }
                    });
                });
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
        this.filterOptions();
    }
};

jQuery(document).ready(function(){
    var hotel = new Hotel();
    hotel.init();
});

jQuery(window).on('load', function(){
    jQuery('.option').fadeIn();
});
