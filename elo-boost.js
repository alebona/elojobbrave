function getPrecoServico(data){var base_img=base_url+'assets/img/badges/';var elosSemDivisao=["mestre","grao-mestre","desafiante"];var ligaatual=$('#ligaatual').val();var divisaoatual=$('#divisaoatual').val();var ligadesejada=$('#ligadesejada').val();var divisaodesejada=$('#divisaodesejada').val();var serverImage=$('#servidor').val().toLowerCase()+'.webp';if(elosSemDivisao.includes(ligaatual)){var currentImage=ligaatual+'.webp';$('#boxDivisaoAtual').hide();}else{var currentImage=ligaatual+'_'+divisaoatual+'.webp';$('#boxDivisaoAtual').show();}
if(elosSemDivisao.includes(ligadesejada)){var desiredImage=ligadesejada+'.webp';$('#boxDivisaoDesejada').hide();}else{var desiredImage=ligadesejada+'_'+divisaodesejada+'.webp';$('#boxDivisaoDesejada').show();}
$('#server-image').attr('src',base_img+serverImage);$('#current-image').attr('src',base_img+currentImage);$('#desired-image').attr('src',base_img+desiredImage);$.ajax({url:base_url+'app/servico_preco.json',type:'POST',dataType:'json',data:'idioma='+idioma+'&moeda='+moeda+'&servico=eloboost&'+data,beforeSend:function(){$('#result').html('<img src="assets/img/preload.webp" alt="'+data.carregando+'">');},success:function(data){if(data.status=='1'){if(pagina.cupom.ativo=='1'){var valorDesconto=data.total-(data.total/100*pagina.cupom.desconto);var html='<p class="display-4 text-dark text-uppercase">'+
'<small style="font-size: 20px;"><strike class="text-danger">'+pagina.cupom.de+' '+data.simbolo+' '+formatMoney(data.total,moeda)+'</strike></small><br />'+
'<small style="font-size: 20px;">'+pagina.cupom.por+'</small> '+data.simbolo+' '+formatMoney(valorDesconto,moeda)+'<br />'+
'<font class="text-success" style="margin: 0; font-size: 18px;">'+pagina.cupom.descricao+'</font></p>'+
'<p><a href="'+data.url+'" class="btn btn-round btn-lg btn-dark">'+pagina.comprar+'</a></p>';}else{var html='<p class="display-4 text-dark text-uppercase">'+data.simbolo+' '+data.total+'</p>'+
'<p><a href="'+data.url+'" class="btn btn-round btn-lg btn-dark">'+pagina.comprar+'</a></p>';}}else{var html='<div class="alert alert-primary alert-icon alert-dismissible fade show" role="alert">';html+='<i class="far fa-bell"></i>';html+=data.mensagem;html+='<span aria-hidden="true"></span>';html+='</button>';html+='</div>';}
$('#result').html(html);}});}
$(function(){$('#servidor, #fila, #ligaatual, #ligadesejada, #divisaoatual, #divisaodesejada').change(function(){$('#form-service').submit();});$('#form-service').submit(function(){getPrecoServico($(this).serialize());return false;}).submit();});