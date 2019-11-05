$(document).ready(function(){
    var wsize = 2;
    var hsize = 2;
    var wlego = 32;
    var hlego = 32;
    var ctx, img;
    var rot = 0,ratio = 1;

    var CanvasCrop;
	var fixpixel;

    window.onload = init();
    var color_arr = 	[[56,95,224,'#385FE0'],
						[216,53,50,'#D83532'],
						[252,127,57,'#FC7F39'],
						[179,204,40,'#B3CC28'],
						[114,169,246,'#72A9F6'],
						[237,208,138,'#EDD08A'],
						[59,146,75,'#3B924B'],
						[75,162,255,'#4BA2FF'],
						[254,234,35,'#FEEA23'],
						[53,65,105,'#354169'],
						[254,223,170,'#FEDFAA'],
						[254,237,96,'#FEED60'],
						[183,58,119,'#B73A77'],
						[253,192,236,'#FDC0EC'],
						[119,71,65,'#774741'],
						[238,204,123,'#EECC7B'],
						[174,176,172,'#AEB0AC'],
						[251,112,197,'#FB70C5'],
						[129,53,64,'#813540'],
						[71,75,67,'#474B43'],
						[97,99,103,'#616367'],
						[250,250,250,'#FAFAFA'],
						[49,48,55,'#313037'],
						[80,61,153,'#503D99'],
						[70,71,80,'#464750'],
						[253,232,202,'#FDE8CA']
						];
	var grey_arr = [[174,176,172,'#AEB0AC'],
					[71,75,67,'#474B43'],
					[97,99,103,'#616367'],
					[250,250,250,'#FAFAFA'],
					[49,48,55,'#313037'],
					[70,71,80,'#464750']];

	function init(){
		$("#grey_lego").prop("checked", false);
		$("#check_lego").prop("checked", false);
        CanvasCrop = $.CanvasCrop({
            cropBox : ".imageBox",
            imgSrc : "temp/temp.jpg",
            limitOver : 2
        });
        setTimeout(function(){
            $("#crop").trigger('click');
            $('#hsize3232').trigger('click');
        }, 100);
		setTimeout(function(){
				$("#visbleCanvas").draggable();
            }, 1000);
    }

    function loadPixelatedImage(url){
		ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		img = new Image();
		img.onload = function(){
			pixelate('dotimage');
	  	};
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
        img.src = url;
    }


    function showResult() {
        var w = 1;
        var h = 1;
        if(wsize > hsize){
            w = wsize / hsize;
        }else if(wsize < hsize){
            h = hsize / wsize;
        }
        var src = CanvasCrop.getDataURL("jpeg", w, h);
        loadPixelatedImage(src);
    }


    $('#upload-file').on('change', function(){
		$("#grey_lego").prop("checked", false);
		$("#check_lego").prop("checked", false);
        var reader = new FileReader();
        reader.onload = function(e) {
            CanvasCrop = $.CanvasCrop({
                cropBox : ".imageBox",
                imgSrc : e.target.result,
                limitOver : 2
            });
            rot =0 ;
            ratio = 1;

            setTimeout(function(){
                $("#crop").trigger('click');
				$('#hsize3232').trigger('click');
				$("#visbleCanvas").css('left','0px');
				$("#visbleCanvas").css('top','0px');
            }, 100);
			setTimeout(function(){
				$("#visbleCanvas").draggable();
            }, 1000);
        }
        reader.readAsDataURL(this.files[0]);
		$("#file-name").html(this.files[0].name);
        //this.files = [];
    });


    $("#rotateRight").on("click",function(){
	$("#grey_lego"). prop("checked", false);
		$("#check_lego"). prop("checked", false);
        rot += 90;
        rot = rot>360?90:rot;
        CanvasCrop.rotate(rot);
		$("#crop").trigger('click');
        /*var img=document.getElementById('canvas');
	    img.setAttribute('style','transform:rotate('+rot+'deg)');*/
    });

    $("#zoomIn").on("click",function(){
		$("#grey_lego"). prop("checked", false);
		$("#check_lego"). prop("checked", false);

        if($('#visbleCanvas').attr('width') > 400 || $('#visbleCanvas').attr('height') > 400){
			if(ratio>1){
			ratio =ratio*0.9; }
			if(ratio<1){
			ratio=1;}
			CanvasCrop.scale(ratio);
			$("#crop").trigger('click');
        }
    });

    $("#zoomOut").on("click",function(){
		$("#grey_lego"). prop("checked", false);
		$("#check_lego"). prop("checked", false);
        ratio =ratio*1.1;
        CanvasCrop.scale(ratio);
        $("#crop").trigger('click');

    });

    $("#crop").on("click",function(){
        var w = 1;
        var h = 1;
        if(wsize > hsize){
            w = wsize / hsize;
        }else if(wsize < hsize){
            h = hsize / wsize;
        }
        var src = CanvasCrop.getDataURL("jpeg", w, h);
        if(!$("#croppedimage").attr('src'))
            $("#cropresult").append("<img id='croppedimage' src='"+src+"' />");
        else
            $("#croppedimage").attr('src', src);
        showResult()
    });


    $(document).on( "mouseup",'#visbleCanvas', function(e){
        $("#crop").trigger('click');
    });


    function changeimageBoxStyle(){
        var wr = 1;
        var hr = 1;
        if(wsize > hsize){
            hr = hsize / wsize;
        }else if(wsize < hsize){
            wr = wsize / hsize;
        }
        var vw = wr * 400;
        var vh = hr * 400;
        $('.imageBox').css('width', vw);
        $('.imageBox').css('height', vh);
    }


    function pixelate(id) {
        w = canvas.width * wsize * 0.04,
        h = canvas.height * hsize  * 0.04;
        ctx.drawImage(img, 0, 0, w, h);
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, img.width, img.height);
        var step = 400 / hlego;
        if(wlego > hlego) step = 400 / wlego;
        var image2 = document.getElementById(id);
        for(var width = 0 ; width < img.width; width += step){
            for(var height = 0 ; height < img.height; height += step){
                ctx.drawImage(image2, width, height, step, step);
            }
        }
		fixpixel=ctx.getImageData(0,0,canvas.width,canvas.height);
    }


    $('input[type=radio][name=hsize]').change(function() {
		$("#grey_lego"). prop("checked", false);
		$("#check_lego"). prop("checked", false);
       	whh=$(this).val();
        switch(whh){
            case '16*16':
				        wlego=16;
                hlego = 16;
				        wsize=1;
				        hsize=1;
                break;
            case '32*32':
				        wlego=32;
                hlego = 32;
		            wsize=2;
		            hsize=2;
                break;
            case '32*64':
			          wlego=32;
                hlego = 64;
				        wsize=2;
		            hsize=4;
                break;
            case '32*96':
				        wlego=32;
                hlego = 96;
				        wsize=2;
				        hsize=6;
                break;
            case '32*128':
				        wlego=32;
                hlego = 128;
				        wsize=2;
				        hsize=8;
                break;
            case '64*32':
				        wlego=64;
                hlego = 32;
				        wsize=4;
				        hsize=2;
                break;
            case '96*32':
				        wlego=96;
                hlego = 32;
				        wsize=6;
				        hsize=2;
                break;
            case '128*32':
				        wlego=128;
                hlego = 32;
				        wsize=8;
				        hsize=2;
                break;
            case '64*64':
			          wlego=64;
                hlego = 64;
				        wsize=4;
		            hsize=4;
                break;
            case '64*96':
        				wlego=64;
        				hlego = 96;
        				wsize=4;
        				hsize=6;
                break;
			      case '64*128':
        				wlego=64;
        				hlego = 128;
        				wsize=4;
        				hsize=8;
                break;
			      case '96*64':
        				wlego=96;
        				hlego = 64;
        				wsize=6;
        				hsize=4;
                break;
			      case '128*64':
        				wlego=128;
        				hlego = 64;
        				wsize=8;
        				hsize=4;
                break;
			      case '96*96':
        				wlego=96;
        				hlego = 96;
        				wsize=6;
        				hsize=6;
                break;
			      case '96*128':
        				wlego=96;
        				hlego = 128;
        				wsize=6;
        				hsize=8;
                break;
			      case '128*96':
        				wlego=128;
        				hlego = 96;
        				wsize=8;
        				hsize=6;
                break;
			      case '128*128':
        				wlego=128;
        				hlego = 128;
        				wsize=8;
        				hsize=8;
                break;
             default:
                break;
        }
        showResult();
        changeimageBoxStyle();
    });


	$('input[name="check_lego"]').change(function () {
		var wr = 1;
        var hr = 1;
        if(wsize > hsize){
            hr = hsize / wsize;
        }else if(wsize < hsize){
            wr = wsize / hsize;
        }
        var vw = wr * 400;
        var vh = hr * 400;

		if (this.checked) {

			var imgData=ctx.getImageData(0,0,vw,vh);
			for (var i=0;i<imgData.data.length;i+=4)
			  {
			  r1=imgData.data[i];
			  g1=imgData.data[i+1];
			  b1=imgData.data[i+2];
			  lessdiff=index=0;
			  for (var j=0;j<26;j++)
			  {
				r2=color_arr[j][0]-r1;
				g2=color_arr[j][1]-g1;
				b2=color_arr[j][2]-b1;
				difference=Math.sqrt((r2*r2)+(g2*g2)+(b2*b2));
				if(j==0){
				lessdiff=difference;
				}
				if(lessdiff>difference){
				lessdiff=difference;
				index=j;
				}
			  }
			  imgData.data[i]=color_arr[index][0];
			  imgData.data[i+1]=color_arr[index][1];
			  imgData.data[i+2]=color_arr[index][2];
			  imgData.data[i+3]=255;
			  }
			ctx.putImageData(imgData,0,0);

		}else{
		ctx.putImageData(fixpixel,0,0);

		}
	});

	$('input[name="grey_lego"]').change(function () {
		var wr = 1;
        var hr = 1;
        if(wsize > hsize){
            hr = hsize / wsize;
        }else if(wsize < hsize){
            wr = wsize / hsize;
        }
        var vw = wr * 400;
        var vh = hr * 400;
		if (this.checked) {
			var imgData=ctx.getImageData(0,0,vw,vh);
			for (var i=0;i<imgData.data.length;i+=4)
			 {
			  r1=imgData.data[i];
			  g1=imgData.data[i+1];
			  b1=imgData.data[i+2];
			  lessdiff=index=0;
			  for (var j=0;j<6;j++)
			  {
				r2=grey_arr[j][0]-r1;
				g2=grey_arr[j][1]-g1;
				b2=grey_arr[j][2]-b1;
				difference=Math.sqrt((r2*r2)+(g2*g2)+(b2*b2));
				if(j==0){
				lessdiff=difference;
				}
				if(lessdiff>difference){
				lessdiff=difference;
				index=j;
				}
			  }
			  imgData.data[i]=grey_arr[index][0];
			  imgData.data[i+1]=grey_arr[index][1];
			  imgData.data[i+2]=grey_arr[index][2];
			  imgData.data[i+3]=255;
			  }
			ctx.putImageData(imgData,0,0);

		}else{
		ctx.putImageData(fixpixel,0,0);
		}
	});

	$("#exportcsv").on("click",function(){
		if($('input[name="check_lego"]').prop("checked") == true || $('input[name="grey_lego"]').prop("checked") == true ){
		w = canvas.width * wsize * 0.04,
        h = canvas.height * hsize  * 0.04;
        var step = 400 / hlego;
        if(wlego > hlego) step = 400 / wlego;
		let csvContent = "data:text/csv;charset=utf-8,";
		 csvContent += "R,G,B \r\n";
        for(var width = 0 ; width < img.width; width += step){
            for(var height = 0 ; height < img.height; height += step){
				var imgData=ctx.getImageData(width,height,1,1);
				 let row = imgData.data[0]+','+imgData.data[1]+','+imgData.data[2];
					csvContent += row + "\r\n";
            }
        }
		 var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "croppic.csv");
			link.innerHTML= "";
			document.body.appendChild(link);
			link.click();

			}else{alert("Please use LEGO Brick or Grey Colors to export CSV." ); }
    });


	/*$(".imageBox").mousemove(function(e){
		var x = $(".imageBox").position();
		var link = $(".imageBox");
		var offset = link.offset();
		var top = offset.top;
		var left = offset.left;
		var bottom1 = top + link.outerHeight();
		var right1 = left + link.outerWidth();
		 var y = $("#visbleCanvas").position();
		 var link1 = $("#visbleCanvas");
		var offset1 = link1.offset();
		var top1 = offset1.top;
		var left1 = offset1.left;
		var bottom2 = top1 + link1.outerHeight();
		var right2 = left1 + link1.outerWidth();
		 if(x.left>=y.left && x.top>=y.top && bottom1 <= bottom2 && right1<=right2){
				return true;
		 }
		 return false;
	});*/

	 $( ".imageBox" ).droppable({
      drop: function( event, ui ) {
      $("#crop").trigger('click');
      }
    });
})
