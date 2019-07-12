<h2><b>Widget zur Anzeige von SSCam-Streams im FHEM Tablet UI</b></h2>

Dieses Widget ist für den Einsatz von FHEM Tablet UI 2.x vorgesehen.
Voraussetzung ist das Vorhandensein von SSCam-Streamingdevices.
Streaming-Devices werden in existierenden SSCam Kamera-Devices angelegt mit: 

     set <SSCam-Device> createStreamDev <Typ>
  
Das entstandene Device ist im Attribut "data-device" des Widgets einzutragen.
Mindestlevel der Modulversionen sind SSCamSTRM 2.6.0 und SSCam 8.15.0.



<b>Installation</b>

Die Datei widget_sscamstrm.js muss in das js-Verzeichnis der fhem-tablet-ui 
Installation und die Datei sscam_hls.js in das entsprechende lib-Verzeichnis 
kopiert werden. 

In FHEM kann der Befehl:

     update all https://raw.githubusercontent.com/nasseeder1/fhem-ftui_sscamstrm_widget/master/controls_sscamstrm_widget.txt
     
verwendet werden um die Dateien einmalig zu installieren. Sollen die Dateien in den regelmäßigen Update-Prozess mit eingebunden werden, kann das Controlfile in FHEM integriert werden:

      update add https://raw.githubusercontent.com/nasseeder1/fhem-ftui_sscamstrm_widget/master/controls_sscamstrm_widget.txt

<b>Attribute des smaportalspg-Widgets</b>

	data-device 		SSCam-Streamingdevice in FHEM, dessen Inhalt angezeigt werden soll 		
	data-get 		Name des Readings, das eine Änderung des SSCam-Streamingdevice signalisiert 	
	                        default: 'parentState' 	
	data-max-update 	Maximale Häufigkeit in Sekunden für das Update des SSCam-Streamingdevices	
	                        default: '2'

<b>Beispiele</b>
      
Einbinden des MJPEG-Streams: 

 <li data-row="1" data-col="1" data-sizey="3" data-sizex="4">
   <header>Kamera Keller</header>
      <div class="cell">
         <div data-type="sscamstrm" data-device="SSCamSTRM.SSCam.Keller.mjpeg" ></div> 
      </div>
 </li>

Einbinden der Schnappschußgalerie:

 <li data-row="1" data-col="1" data-sizey="3" data-sizex="5">
   <header>Schnappschüsse Eingang</header>
      <div class="cell">
         <div data-type="sscamstrm" data-device="SSCamSTRM.SSCam.Hauseingang.snapgallery" ></div> 
      </div>
 </li>


<b>Hinweis:</b> Es ist immer das Streaming-Device in FHEM zu erstellen und im Attribut "data-device" anzugeben, nicht das SSCam-Parentdevice selbst ! 