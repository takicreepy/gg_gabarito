document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //// CONTROLES ////
    //// =====================================================================================================
    var num_cpf         = "";
    var dat_nascimento  = "";
    var vUrlAjax        = "";
    var myVar;
    var ind_registrado 	= false;
    var estado 			= "inicial";

    cordova.plugins.ZoomControl.ZoomControl("true");
    cordova.plugins.ZoomControl.setDisplayZoomControls("false");
    document.addEventListener("backbutton", onBackKeyDown, false);

    //***************************************************************************************************************
    // chamo a fun?o pra criar o objeto
    var http = getHTTPObject();
    var isWorking = false;

    // verifica se o browser suporta o ajax
    function getHTTPObject() {
        try{
            xmlhttp = new XMLHttpRequest();
        }catch(ee){
            try{
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                try{
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }catch(E){
                    xmlhttp = false;
                }
            }
        }
        return xmlhttp;
    }
    // Nessa fun?o eu monto a conex? com a p?ina que me retornar?dados
    // ?passado como par?etros, o nome da p?ina e o valor de pesquisa
    function updateConteudo(varPagina)
    {
        if (http && isWorking) {
            http.abort();
            isWorking = false;
        }   
        if(!isWorking && http) {
            http.open("GET", varPagina, true);
            http.onreadystatechange = fnHttpResponse;
            isWorking = true;
            http.send(null);
            return false;
       }
    }

    // E nessa fun?o eu pego o que retorna da consulta (texto) e 
    // jogo como conte?do da DIV (dvConteudo)
    function fnHttpResponse()
    {
        if (estado == "dvConteudo") {
            $("#dvConteudo").removeClass("oculto");
        } else if (estado == "dvDetalhe") {
            $("#dvConteudo").addClass("oculto");
            $("#dvDetalhe").removeClass("oculto");
        }
        if (http.readyState == 1){
            window.plugins.toast.show("Carregando....", "2000", "bottom");
        } else if (http.readyState == 4){
        if (http.responseText.indexOf('invalid') == -1){   
            if (estado == "dvConteudo") {
                document.getElementById("dvConteudo").innerHTML = http.responseText;
            } else if (estado == "dvDetalhe") {
                //alert(http.responseText);
                document.getElementById("dvDetalhe").innerHTML = http.responseText;
            }
            myVar = setTimeout(function(){ VerificaAjax(); }, 6000);
        }
        isWorking = false;
        } else {
        	$("#dvConteudo").removeClass("oculto");
       		window.plugins.toast.show("Carregando....", "2000", "bottom");
        }
        http.close;
    }
    // Caso não haja conexão com a internet
    function VerificaAjax()
    {
        clearTimeout(myVar);
        if (estado == "dvConteudo") {
            var vTam = $("#dvConteudo").html();
            if (vTam.length == 0) {
            	window.plugins.toast.show("FALHA NA CONEXÃO\nVerifique se está conectado a Internet. Pode ocorrer que o nosso servidor esteja em manutenção não programada, acarretando falha na conexão.\nTente mais tarde.", "6000", "bottom");
            	Mudar_Estado("dvConteudo", "inicial");
            }
        } else if (estado == "dvDetalhe") {
            var vTam = $("#dvDetalhe").html();
            if (vTam.length == 0) {
                window.plugins.toast.show("FALHA NA CONEXÃO\nVerifique se está conectado a Internet. Pode ocorrer que o nosso servidor esteja em manutenção não programada, acarretando falha na conexão.\nTente mais tarde.", "6000", "bottom");
                Mudar_Estado("dvDetalhe", "dvConteudo");
            }            
        }
    }    
    //***************************************************************************************************************

    if (typeof(Storage) !== "undefined") {
        window.plugins.toast.show("Local Storage OK", "3000", "bottom");
    } else {
        window.plugins.toast.show("Celular não tem suporte para Local Storage", "6000", "bottom");
    }

    num_cpf         = localStorage.getItem("num_cpf");
    dat_nascimento  = localStorage.getItem("dat_nascimento");
    $("#num_cpf").val(num_cpf);
    $("#dat_nascimento").val(dat_nascimento);
            
    //alert(num_cpf);
    //alert(dat_nascimento);
    
    if ((num_cpf == null) || (dat_nascimento == null) || (ind_registrado == false)) {
    	Mudar_Estado("dvConteudo", "inicial");
    	$("#num_cpf").focus();
    } else {
        ind_registrado = true;
        estado = "dvConteudo";
        AjaxGetUrl(1);
    }

    $("#cmdLimpar").click(function(){
        localStorage.removeItem('num_cpf');
        localStorage.removeItem('dat_nascimento');
        ind_registrado = false;
		estado = "inicial";
        $("#num_cpf").val("");
        $("#dat_nascimento").val("");
    });     



    $("#cmdRegistrar").click(function(){
        num_cpf 		= $("#num_cpf").val();
        dat_nascimento 	= $("#dat_nascimento").val();

        if (num_cpf.length != 11) {
            window.plugins.toast.show("Formato incorreto do CPF. Utilize apenas números!", "2000", "bottom");
            $("#num_cpf").focus();
            return false;
        }
        if (dat_nascimento.length != 8) {
            window.plugins.toast.show("Formato incorreto da data de nascimento. Utilize apenas números!", "2000", "bottom");
            $("#dat_nascimento").focus();
            return false;            
        }
        localStorage.setItem('num_cpf',num_cpf);
        localStorage.setItem('dat_nascimento',dat_nascimento);
        ind_registrado = true;
        estado = "dvConteudo";
        AjaxGetUrl(1);
    }); 

    function AjaxGetUrl(varOp, cod_prova, cod_disciplina) 
    {
        if (varOp == 1) {
			Mudar_Estado("inicial", "dvConteudo");
        	var vSufixo = "?acao=get&num_cpf="+num_cpf+"&dat_nascimento="+dat_nascimento;
            vUrlAjax = "FrmGetGabaritoAluno.asp";
            AjaxNavega(vUrlAjax, vSufixo);
        } else if (varOp == 2) {
        	Mudar_Estado("dvConteudo", "dvDetalhe");
        	var vSufixo = "?acao=detalhe&num_cpf="+num_cpf+"&dat_nascimento="+dat_nascimento+"&cod_prova="+cod_prova+"&cod_disciplina="+cod_disciplina;
            vUrlAjax = "FrmGetGabaritoAluno.asp";
            AjaxNavega(vUrlAjax, vSufixo);
        }
    }    

    function AjaxNavega(vUrlAjax, vSufixo)
    {
        var vPrefixo = "https://www.baixacnpj.com.br/webservices/";
        var varPagina = vPrefixo + vUrlAjax + vSufixo;
        updateConteudo(varPagina);
    }    

    //------------------------------------------------------------------------------------------------------
    $("#voltar").click(function(){
    	onBackKeyDown();
    }); 
    function onBackKeyDown() {
    	if (estado == "dvConteudo") {
    		estado = "inicial";
    		Mudar_Estado("dvConteudo", estado);
    	} else if (estado == "dvDetalhe") {
    		estado = "dvConteudo"; 
    		Mudar_Estado("dvDetalhe", estado);
    	} else if (estado == "dvPrivacidade") {
    		estado = "inicial"; 
    		Mudar_Estado("dvPrivacidade", estado);
    	} else if (estado == "inicial") {
            if(confirm("Deseja sair do Aplicativo ?")){   
                MOForceAppClose.forceAppClose();
            }
        }
    }
    
    $(document.body).on('click', '.editgrupo', function () {
        var delString       = this.id;
        var splitId         = delString.split("_");
        var vTemp           = splitId[1].split("$");
        var cod_prova       = vTemp[0];
        var cod_disciplina  = vTemp[1];
        estado              = "dvDetalhe";
        Mudar_Estado("dvConteudo",estado);
        AjaxGetUrl(2, cod_prova, cod_disciplina); 
    });
    
    function Mudar_Estado(origem, destino) {
        $("#"+origem).addClass('oculto');
        $("#"+destino).removeClass('oculto');
        if (destino != "inicial") {
        	$("#voltar").removeClass("oculto");
        } else {
        	$("#voltar").addClass("oculto");
        }
    }    
    
    $("#cmdPrivacidade").click(function(){
    	estado = "dvPrivacidade";
    	Mudar_Estado("inicial", estado);
    }); 

    //================================== AUXILIARES ========================================================
    function Valida_Campo(varOp) {
        if (varOp == "") {
            return null;
        } else {
            return varOp;
        }
    }
    function Retira_Null(varOp) {
        if (varOp == null) {
            return "";
        } else {
            return varOp;
        }
    }
    function FormataData(vDate) {
        if (vDate == "") {
            return "";
        } else {
            var vDia = vDate.substring(8,10);
            var vMes = vDate.substring(5,7);
            var vAno = vDate.substring(0,4);
            return vDia + '/' + vMes + '/' + vAno;
        }
    }
    function getDia(vDate) {
        if (vDate == "") {
            return "";
        } else {
            var vDia = vDate.substring(8,10);
            return "" + vDia + "";
        }       
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

