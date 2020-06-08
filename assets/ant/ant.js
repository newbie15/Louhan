$(document).ready(function(){
    // var BASE_URL = "http://localhost/ant/";
    var BASE_URL = window.location.href;

    var autonum = 0;

    new customAlert();

    function station_refresh() {
        $("#station").load(BASE_URL + "act/station_ajax_dropdown/" + $("#pabrik").val(),
            function (responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    unit_refresh();
                } else {
                }
            }
        );
    }

    function unit_refresh() {
        $("#unit").load(BASE_URL + "act/unit_ajax_dropdown_sub/" + $("#pabrik").val() + "/" + encodeURI($("#station").val()),
            function (responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    sub_unit_refresh();
                } else {
                }
            }
        );
    }

    function sub_unit_refresh() {
        $("#sub_unit").load(BASE_URL + "act/sub_unit_ajax_dropdown/" + $("#pabrik").val() + "/" + encodeURI($("#station").val()+ "/" + ($("#unit").val())),
            function (responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                } else {
                }
            }
        );
    }

    function refresh(data) {
        if (data.length<1) {
            console.log("yes");

            data = []; //JSON.parse(msg);
            console.log(data);
            x = data;
            $('#my-spreadsheet').html("");
            var shtml = "\
            <table>\
            	<tr>\
            		<td>Area</td>\
            		<td>"+data[0]+"</td>\
            	</tr>\
            	<tr>\
            		<td>Problem</td>\
            		<td>"+data[1]+"</td>\
            	</tr>\
            	<tr>\
            		<td>Penyelesaian</td>\
            		<td>"+data[2]+"</td>\
            	</tr>\
            	<tr>\
            		<td>Start</td>\
            		<td>"+data[3]+"</td>\
            	</tr>\
            	<tr>\
            		<td>Stop</td>\
            		<td>"+data[4]+"</td>\
            	</tr>\
            	<tr>\
            		<td>Status</td>\
            		<td>"+"</td>\
            	</tr>\
            </table>\
            ";
        }else{
        	var shtml = "";
    		autonum = 0;
        	for (var i = 0; i < data.length; i++) {
        		var x = data[i];
				shtml += "\
	            <table>\
	            	<tr>\
	            		<td><span class=\"btn btn-warning hapus\"># Hapus</span></td>\
	            		<td></td>\
	            	</tr>\
	            	<tr>\
	            		<td><strong>Area</strong></td>\
	            		<td>"+x[1]+"<input type=\"hidden\" id=\"no_wo-"+ autonum +"\" name=\"no_wo-"+ autonum +"\" value=\""+x[0]+"\"><input type=\"hidden\" id=\"area-"+ autonum +"\" name=\"area-"+ autonum +"\" value=\""+ x[1] +"\"></td>\
	            	</tr>\
	            	<tr>\
	            		<td><strong>Problem</strong></td>\
	            		<td>"+x[2]+"<input type=\"hidden\" id=\"problem-"+ autonum +"\" name=\"problem-"+ autonum +"\" value=\""+x[2]+"\"></td>\
	            	</tr>\
	            	<tr>\
	            		<td><strong>Penyelesaian</strong></td>\
	            		<td><input name=\"penyelesaian-"+ autonum +"\" type=\"text\" value=\""+x[3]+"\"></td>\
	            	</tr>\
	            	<tr>\
	            		<td><strong>Start</strong></td>\
	            		<td><input onchange=\"updatevalue(this)\" name=\"start-"+ autonum +"\" type=\"time\" value=\""+x[4]+"\"></td>\
	            	</tr>\
	            	<tr>\
	            		<td><strong>Stop</strong></td>\
	            		<td><input onchange=\"updatevalue(this)\" name=\"stop-"+ autonum +"\" type=\"time\" value=\""+x[5]+"\"></td>\
	            	</tr>\
	            	<tr>\
	            		<td><strong>Status</strong></td>\
	            		<td>\
	            			<select id=\"status-"+ autonum +"\" name=\"status-"+ autonum +"\">";
				x[6] == "Belum Selesai" ? a = "<option selected=\"selected\">Belum Selesai</option>" : a = "<option>Belum Selesai</option>"
				x[6] == "Tunggu Sparepart" ? b = "<option selected=\"selected\">Tunggu Sparepart</option>" : b = "<option>Tunggu Sparepart</option>"
				x[6] == "Monitoring" ? c = "<option selected=\"selected\">Monitoring</option>" : c = "<option>Monitoring</option>"
                x[6] == "Selesai" ? d = "<option selected=\"selected\">Selesai</option>" : d = "<option>Selesai</option>"
                x[6] == "Pilih Salah Satu" ? z = "<option selected=\"selected\">Pilih Salah Satu</option>" : z = "<option>Pilih Salah Satu</option>"
				x[6] == "Tidak Dikerjakan" ? y = "<option selected=\"selected\">Tidak Dikerjakan</option>" : y = "<option>Tidak Dikerjakan</option>"

                shtml += z;
                shtml += y;
				shtml += a;
				shtml += b;
				shtml += c;
				shtml += d;
        		shtml += "</select>"+
        				"</td>\
	            	</tr>\
	            	<tr><td><hr/></td><td><hr/></td></tr>\
	            </table>\
	            ";
	            autonum++;
        	}

            $('#my-spreadsheet').html(shtml);
        }
    }


    function ajax_refresh(){
    	if($("#mpp").val()=="--PILIH SALAH SATU--"){
            var dt = [];
            refresh(dt);
    	}else{
	        $.ajax({
	            method: "POST",
	            url: BASE_URL + "act/load",
	            data: {
	                id_pabrik: $("#pabrik").val(),
	                // id_station: $("#station").val(),
	                d: $("#tanggal").val(),
	                m: $("#bulan").val(),
	                y: $("#tahun").val(),
	                mpp : $("#mpp").val(),
	            }
	        }).done(function (msg) {
	            console.log(msg);
	            data = JSON.parse(msg);
	            console.log(data);
	            refresh(data);
	        });
    	}
    }


    $("#tahun").change(function () {
        var syear = parseInt($("#tahun").val());
        var shtml = null; //"<option>"++"</option>"
        var start_year = syear - 2;
        var stop_year = syear + 2;
        for (var i = start_year; i <= stop_year; i++) {
            shtml += "<option>" + i + "</option>";
        }
        $("#tahun").html(shtml);
        $("#tahun").val(syear.toString());

        ajax_refresh();
    });

    $("#bulan").change(function () {
    	ajax_refresh();
    });

	$("#tanggal").change(function () {
    	ajax_refresh();
    });
   

    var tgl = new Date();
    var y = tgl.getFullYear();

    var shtml = null; //"<option>"++"</option>"
    var start_year = y - 2;
    var stop_year = y + 2;
    for (var i = start_year; i <= stop_year; i++) {
        shtml += "<option>" + i + "</option>";
    }
    $("#tahun").html(shtml);

    $("#tahun").val(y.toString());

    var tgl = new Date();
    var m = tgl.getMonth() + 1;
    if (m < 10) {
        $("#bulan").val("0" + m.toString());
    } else {
        $("#bulan").val(m.toString());
    }

    var d = tgl.getDate();
    if (d < 10) {
        $("#tanggal").val("0" + d.toString());
    } else {
        $("#tanggal").val(d.toString());
    }	

    $("#pabrik").change(function(){
        station_refresh();
    });

    $("#station").change(function () {
    	unit_refresh();
    });

    $("#unit").change(function () {
        sub_unit_refresh();
    });


    $("#mpp").change(function(){
    	ajax_refresh();
    });

    $("#tambah").click(function(){
    	if($(this).html()=="+ Tambah Job" && $("#mpp").val()!="--PILIH SALAH SATU--"){
	    	$("#forminput").show('slow');
	    	station_refresh();
	        setTimeout(() => {
		    	$("#forminput").focus();
	        }, 500);

	    	$(this).html("Batal");

	    	$("#simpan").hide();
    	}else{
    		if($("#mpp").val()=="--PILIH SALAH SATU--"){
    			alert("Pilih Man Power Dulu !!!");
    		}else{
		    	$("#forminput").hide('slow');
		    	$(this).html("+ Tambah Job");
		    	$("#simpan").show();
    		}
    	}
    });

    $("#simpan").click(function(){
    	console.log($("#form").serializeArray());
        x = $("#form").serializeArray();
        y = 0;
        for (var i = x.length - 1; i >= 0; i--) {
            // console.log(x[i]);
            if(x[i]['value']=="Pilih Salah Satu"){
                console.log("ada");
                y++;
            }else{
                // console.log("tidak ada");
            }
        }
        if(y==0){
            $.ajax({
                method: "POST",
                url: BASE_URL + "act/simpan",
                data: {
                    id_pabrik: $("#pabrik").val(),
                    // id_station: $("#station").val(),
                    d: $("#tanggal").val(),
                    m: $("#bulan").val(),
                    y: $("#tahun").val(),
                    mpp : $("#mpp").val(),
                    data : $("#form").serializeArray()
                }
            }).done(function (msg) {
                console.log(msg);
                if(msg=="ok"){
                    alert("data sukses tersimpan");
                    $(".customalert").css("background-color", "green");
                    $(".customalert .header").css("background-color", "green");
                    $(".customalert .body").css("background-color", "green");
                    $(".customalert .footer").css("background-color", "green");    


                    $("#mpp").val("--PILIH SALAH SATU--");
                    $("#my-spreadsheet").html("");
                }
            });
        }else{
            alert("Anda belum melengkapi isian<br>Mohon cek kembali !!!");
            $(".customalert").css("background-color", "red");
            $(".customalert .header").css("background-color", "red");
            $(".customalert .body").css("background-color", "red");
            $(".customalert .footer").css("background-color", "red");                        
        }
    });

    $("#my-spreadsheet").click(function(e){
    	if($(e.target).hasClass('hapus')){
	        confirm("Hapus Job dipakai jika anda<br>salah membuat job tambahan<br><br> \
                Jika Job tidak dikerjakan maka,<br>silahkan kosongi input jam dan<br> \
	        	pilih status sebagai Tidak Dikerjakan<br><br> \
	        	Yakin menghapus Job ini ?", function(done) {
	            if (!done) {
			    	$(e.target).parent().parent().parent().parent().html("");            
	            }
	        }, {
	            "title": "Pemberitahuan !!!",
	            "done": {
	                "text": "Jangan Hapus",
	            },
	            "cancel": {
	                "text" : "Iya Hapus",
	                "default": true
	            }
	        });
    	}
    });

    $("#simpanjob").click(function(){
    	var area = $("#station").val() + "<br>" + $("#unit").val() + "<br>" + $("#sub_unit").val();
    	var problem = $("#problem").val();
    	var penyelesaian = $("#penyelesaian").val();
    	var start = $("#start").val();
    	var stop = $("#stop").val();
    	var status = $("#status").val();

		shtml = "\
        <table>\
        	<tr>\
        		<td><span class=\"btn btn-warning hapus\"># Hapus</span></td>\
        		<td></td>\
        	</tr>\
        	<tr>\
        		<td><strong>Area</strong></td>\
        		<td>"+area+"<input type=\"hidden\" id=\"no_wo-"+ autonum +"\" name=\"no_wo-"+ autonum +"\" value=\""+"null"+"\"><input type=\"hidden\" id=\"area-"+ autonum +"\" name=\"area-"+ autonum +"\" value=\""+ area +"\"></td>\
        	</tr>\
        	<tr>\
        		<td><strong>Problem</strong></td>\
        		<td>"+problem+"<input type=\"hidden\" id=\"problem-"+ autonum +"\" name=\"problem-"+ autonum +"\" value=\""+problem+"\"></td>\
        	</tr>\
        	<tr>\
        		<td><strong>Penyelesaian</strong></td>\
        		<td><input name=\"penyelesaian-"+ autonum +"\" type=\"text\" value=\""+penyelesaian+"\"></td>\
        	</tr>\
        	<tr>\
        		<td><strong>Start</strong></td>\
        		<td><input onchange=\"updatevalue(this)\" name=\"start-"+ autonum +"\" type=\"time\" value=\""+start+"\"></td>\
        	</tr>\
        	<tr>\
        		<td><strong>Stop</strong></td>\
        		<td><input onchange=\"updatevalue(this)\" name=\"stop-"+ autonum +"\" type=\"time\" value=\""+stop+"\"></td>\
        	</tr>\
        	<tr>\
        		<td><strong>Status</strong></td>\
        		<td>\
        			<select id=\"status-"+ autonum +"\" name=\"status-"+ autonum +"\">\
        			";
        status == "Belum Selesai" ? a = "<option selected=\"selected\">Belum Selesai</option>" : a = "<option>Belum Selesai</option>"
        status == "Tunggu Sparepart" ? b = "<option selected=\"selected\">Tunggu Sparepart</option>" : b = "<option>Tunggu Sparepart</option>"			
        status == "Monitoring" ? c = "<option selected=\"selected\">Monitoring</option>" : c = "<option>Monitoring</option>"			
        status == "Selesai" ? d = "<option selected=\"selected\">Selesai</option>" : d = "<option>Selesai</option>"			
        status == "Pilih Salah Satu" ? z = "<option selected=\"selected\">Pilih Salah Satu</option>" : z = "<option>Pilih Salah Satu</option>"
        status == "Tidak Dikerjakan" ? y = "<option selected=\"selected\">Tidak Dikerjakan</option>" : y = "<option>Tidak Dikerjakan</option>"

        shtml += z;
        shtml += y;
        shtml += a;
        shtml += b;
        shtml += c;
        shtml += d;
        shtml += "</select>"+
        		"</td>\
        	</tr>\
        	<tr><td><hr/></td><td><hr/></td></tr>\
        </table>\
        ";
        autonum++;

        var xhtml = $('#my-spreadsheet').html();

        $('#my-spreadsheet').html(xhtml+shtml);

        $("#forminput").hide('slow');
        $("#tambah").html("+ Tambah Job");
    	$("#simpan").show();
        

    });

	ajax_refresh();

});