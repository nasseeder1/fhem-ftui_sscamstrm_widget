/* FTUI Plugin
 * Copyright (c) 2016 Mario Stephan <mstephan@shared-files.de>
 * originally created by Thomas Nesges,
 * Under MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
 
/* Einbindung:
 *
 *			<li data-row="1" data-col="1" data-sizey="3" data-sizex="4">
 *			 <header>Kamera Stream</header>
 *            <div class="cell">
 *              <div data-type="sscamstrm" data-device="SSCamSTRM.CamHE1.lastsnap" data-get="parentState" ></div> 
 *            </div>
 *			</li>
*/

/* Versionen:
 *
 *  1.0.0	02.07.2019	initial version
*/

/* global ftui:true, Modul_widget:true */

"use strict";

function depends_sscamstrm (){
    return [ftui.config.basedir + "lib/sscam_hls.js"];
};

var Modul_sscamstrm = function () {

    function init_attr(elem) {
        elem.initData('get', 'parentState');
        elem.initData('max-update', 2);

        me.addReading(elem, 'get');
    }

    //usage of "function init()" from Modul_widget()

    function update(dev, par) {

        me.elements.filterDeviceReading('get', dev, par)
            .each(function (index) {
                var elem = $(this);
                var value = elem.getReading('get').val;
                //console.log('sscamstrm:',value);
                if (ftui.isValid(value)) {
                    var dNow = new Date();

                    var lUpdate = elem.data('lastUpdate') || null;
                    var lMaxUpdate = parseInt(elem.data('max-update'));
                    if (isNaN(lMaxUpdate) || (lMaxUpdate < 1))
                        lMaxUpdate = 10;

                    //console.log('sscamstrm update time stamp diff : ', dNow - lUpdate, '   param maxUPdate :' + lMaxUpdate + '    : ' + $(this).data('max-update') );
                    lUpdate = (((dNow - lUpdate) / 1000) > lMaxUpdate) ? null : lUpdate;
                    if (lUpdate === null) {
                        //console.log('sscamstrm DO update' );
                        elem.data('lastUpdate', dNow);

                        var cmd = [ 'get', elem.data('device'), "ftui" ].join(' ');
                        ftui.log('sscamstrm update', dev, ' - ', cmd);
                        
                        ftui.sendFhemCommand(cmd)
                            .done(function (data, dev) {
                            //console.log('received update for dynamic html : ', $(this) );
                            elem.html(data);
                        });
                    }
                }
            });
    }

    // public
    // inherit all public members from base class
    var me = $.extend(new Modul_widget(), {
        //override or own public members
        widgetname: 'sscamstrm',
        init_attr: init_attr,
        update: update,
    });

    return me;
};