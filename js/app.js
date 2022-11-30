jQuery(document).ready(function () {
    plafond = jQuery("#kdrtPlafond").val();
    plafond = parseFloat(plafond.replace(/,/g, ''));
    plafond_format = accounting.formatNumber(plafond, 2, ",", ".");
    plafond_format_rp = "Rp. "+ plafond_format;


    jangka_bln = jQuery("#kdrtJangka").val();
    jangka_thn = jangka_bln/12;
    bunga_thn = jQuery("#kdrtBunga").val();
    bunga_bln = bunga_thn/12;        
        
    bunga_bln_format = bunga_bln.toFixed(2);
        
        
     jQuery("#flat_modal").click(function () {
        
        
        metode = "Bunga Flat";
        
        html = '';
        html += '<label class="section-title">Data Diri </label><br/>';
        html += '<div class="modal-container">'; 
        html += '<label>Jumlah Pinjaman  </label><label> : '+ plafond_format_rp+'</label><br/>';
        html += '<label>Lama Pinjaman  </label><label> : '+ jangka_bln+'bulan ('+ jangka_thn +' tahun)</label> <br/>';
        html += '<label>Bunga   </label><label> : '+ bunga_bln_format +'% / bulan ('+ bunga_thn +'%/ tahun)</label><br/>';
       
        html += '<label>Perhitungan Bunga  </label><label> : '+ metode.toUpperCase()+'</label><br/>';
         
        html += '</div>';
        
        total_bunga = plafond*(bunga_thn/100) * jangka_thn;
        total_pembayaran = plafond+total_bunga;
        total_bunga_format_rp = "Rp. "+accounting.formatNumber(total_bunga, 2, ",", ".");
        total_pembayaran_format_rp = "Rp. "+accounting.formatNumber(total_pembayaran, 2, ",", ".");
        cicilan_pokok = plafond/jangka_bln;        
            bunga = plafond*(bunga_bln/100);
            bunga_format = accounting.formatNumber(bunga, 2, ",", ".");
            bunga_format_rp = "Rp. "+ bunga_format;
            jml_cicilan = parseFloat(cicilan_pokok+bunga);
            cicilan_pokok_format = accounting.formatNumber(cicilan_pokok, 2, ",", ".");

          
            jml_cicilan_format = accounting.formatNumber(jml_cicilan, 2, ",", ".");
            
            jml_cicilan_format_rp = "Rp. "+ jml_cicilan_format;
            
            cicilan_pokok_format_rp = "Rp. "+ cicilan_pokok_format;

 
            html += '<br/><br/><label class="section-title">Pinjaman Anda </label><br/>';
            html += '<div class="modal-container">'; 
            html += '<label>Total Bunga ('+jangka_bln+' bulan ) </label><label> : '+ total_bunga_format_rp+'</label><br/>';
            html += '<label>Total Pembayaran ('+jangka_bln+' bulan )  </label><label> : '+ total_pembayaran_format_rp+'</label><br/>';       
           
            
            html += '</div>';      
           
          


           // tglSkr=new Date();
            //hari=tglSkr.getDate(); 
            html += '<br/><br/><label class="section-title">Tabel Angsuran </label>';
            html += '<table><tr>';
            html += '<th>Angsuran ke -</th>';
            html += '<th>Angsuran Bunga</th>';
            html += '<th>Angsuran Pokok</th>';        
            html += '<th>Total Angsuran</th>';
            html += '<th>Sisa Pinjaman</th>';
            html += '</tr>'; 
            html += '<tr>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>'+plafond_format_rp+'</td>';
            html += '</tr>';

            for(var i = 1; i <= jangka_bln; i++) {  
              cicilan_berjalan = cicilan_pokok * i;      
              sisa_pinjaman = plafond - cicilan_berjalan;
              sisa_pinjaman_format = accounting.formatNumber(sisa_pinjaman, 2, ",", ".");
              sisa_pinjaman_format_rp = "Rp. "+ sisa_pinjaman_format;

              html += '<tr>';
              html += '<td>'+i+'</td>';
              html += '<td>'+bunga_format_rp+'</td>';
              html += '<td>'+cicilan_pokok_format_rp+'</td>';          
              html += '<td>'+jml_cicilan_format_rp+'</td>';
              html += '<td>'+sisa_pinjaman_format_rp+'</td>';
              html += '</tr>';
                    

            }

           html += '</table>';
           
       jQuery("#myModal").modal("show");
       jQuery(".modal-body").empty();       
       jQuery(".modal-body").append(html);
        
     });
     
     jQuery("#anuitas_modal").click(function () {
         
        metode = "Bunga Anuitas";
        
        html = '';
        html += '<label class="section-title">Data Diri </label><br/>';
        html += '<div class="modal-container">'; 
        html += '<label>Jumlah Pinjaman  </label><label> : '+ plafond_format_rp+'</label><br/>';
        html += '<label>Lama Pinjaman  </label><label> : '+ jangka_bln+'bulan ('+ jangka_thn +' tahun)</label> <br/>';
        html += '<label>Bunga   </label><label> : '+ bunga_bln_format +'% / bulan ('+ bunga_thn +'%/ tahun)</label><br/>';
       
        html += '<label>Perhitungan Bunga  </label><label> : '+ metode.toUpperCase()+'</label><br/>';
         
        html += '</div>';
        
        jml_anuitas = getAnuitas(plafond,bunga_bln,jangka_bln);
        jml_anuitas_format = accounting.formatNumber(jml_anuitas, 2, ",", ".");
        jml_anuitas_format_rp = "Rp. "+ jml_anuitas_format;
         

        html += '<br/><br/><label class="section-title">Angsuran Anda </label><br/>';
        html += '<div class="modal-container">'; 
        html += '<label>Angsuran per Bulan  </label><label> : '+ jml_anuitas_format_rp+'</label><br/>';            
        html += '</div><br/>';

        html += '<br/><br/><label class="section-title">Tabel Angsuran </label>';

        html += '<table><tr>';
        html += '<th>Angsuran ke -</th>';
        html += '<th>Angsuran Bunga</th>';
        html += '<th>Angsuran Pokok</th>';        
        html += '<th>Total Angsuran</th>';
        html += '<th>Sisa Pinjaman</th>';
        html += '</tr>'; 
        html += '<tr>';
        html += '<td>0</td>';
        html += '<td>0</td>';
        html += '<td>0</td>';
        html += '<td>0</td>';
        html += '<td>'+plafond_format_rp+'</td>';
        html += '</tr>';

        for(var i = 1; i <= jangka_bln; i++) {

              //anuitas = getAnuitas(plafond,bunga_bln,jangka_bln);

          angs_bunga = plafond*(bunga_bln/100);
          angs_bunga_rp = "Rp. "+ accounting.formatNumber(angs_bunga, 2, ",", ".");
              
              

          angs_pokok = jml_anuitas-angs_bunga;
          angs_pokok_rp = "Rp. "+ accounting.formatNumber(angs_pokok, 2, ",", ".");
              
          jml_cicilan = angs_bunga+angs_pokok;
          jml_cicilan_rp = "Rp. "+ accounting.formatNumber(jml_cicilan, 2, ",", ".");

          sisa_pinjaman_ori = plafond-angs_pokok;
          if(sisa_pinjaman_ori > 0){
            sisa_pinjaman = sisa_pinjaman_ori;
          } else {
            sisa_pinjaman = 0;
          }
          sisa_pinjaman_rp = "Rp. "+ accounting.formatNumber(sisa_pinjaman, 2, ",", ".");
          plafond=sisa_pinjaman;

              

          html += '<tr>';
          html += '<td>'+i+'</td>';
          html += '<td>'+angs_bunga_rp+'</td>';
          html += '<td>'+angs_pokok_rp+'</td>';          
          html += '<td>'+jml_cicilan_rp+'</td>';
          html += '<td>'+sisa_pinjaman_rp+'</td>';
          html += '</tr>';
       html += '</table>';
           
       jQuery("#myModal").modal("show");
       jQuery(".modal-body").empty();       
       jQuery(".modal-body").append(html);
        
     });
     
     
     
     
     
     
     
     
    jQuery("#nadaft-kpr-simulation-form").on('submit', function(event){
        event.preventDefault();
        plafond = jQuery("#kdrtPlafond").val();
        plafond = parseFloat(plafond.replace(/,/g, ''));
        plafond_format = accounting.formatNumber(plafond, 2, ",", ".");
        plafond_format_rp = "Rp. "+ plafond_format;


        jangka_bln = jQuery("#kdrtJangka").val();
        jangka_thn = jangka_bln/12;
        bunga_thn = jQuery("#kdrtBunga").val();
        bunga_bln = bunga_thn/12;        
        
        bunga_bln_format = bunga_bln.toFixed(2);   

        metode = jQuery("#kdrtMetode").val();
       /* mulai_bln = jQuery("#kdrtMulaiBulan").val();
        mulai_bln_text = jQuery("#kdrtMulaiBulan option:selected").text();
        mulai_thn = jQuery("#kdrtMulaiTahun").val();
        mulai_meminjam = mulai_bln_text+' '+mulai_thn;
        */


        html = '';
        html += '<label class="section-title">Data Diri </label><br/>';
        html += '<div class="modal-container">'; 
        html += '<label>Jumlah Pinjaman  </label><label> : '+ plafond_format_rp+'</label><br/>';
        html += '<label>Lama Pinjaman  </label><label> : '+ jangka_bln+'bulan ('+ jangka_thn +' tahun)</label> <br/>';
        html += '<label>Bunga   </label><label> : '+ bunga_bln_format +'% / bulan ('+ bunga_thn +'%/ tahun)</label><br/>';
       
        html += '<label>Perhitungan Bunga  </label><label> : '+ metode.toUpperCase()+'</label><br/>';
         
        html += '</div>';


        if(metode == 'flat'){
            cicilan_pokok = plafond/jangka_bln;        
            bunga = plafond*(bunga_bln/100);
            bunga_format = accounting.formatNumber(bunga, 2, ",", ".");
            bunga_format_rp = "Rp. "+ bunga_format;
            jml_cicilan = parseFloat(cicilan_pokok+bunga);
            cicilan_pokok_format = accounting.formatNumber(cicilan_pokok, 2, ",", ".");

          
            jml_cicilan_format = accounting.formatNumber(jml_cicilan, 2, ",", ".");
            
            jml_cicilan_format_rp = "Rp. "+ jml_cicilan_format;
            
            cicilan_pokok_format_rp = "Rp. "+ cicilan_pokok_format;

 
            html += '<br/><br/><label class="section-title">Angsuran Anda </label><br/>';
            html += '<div class="modal-container">'; 
            html += '<label>Angsuran Pokok per Bulan  </label><label> : '+ cicilan_pokok_format_rp+'</label><br/>';
            html += '<label>Angsuran Bunga per Bulan  </label><label> : '+ bunga_format_rp+'</label><br/>';       
           
            html += '<label>Total Angsuran per Bulan  </label><label> : '+ jml_cicilan_format_rp+'</label><br/>';
            html += '</div>';      
           
          


           // tglSkr=new Date();
            //hari=tglSkr.getDate(); 
            html += '<br/><br/><label class="section-title">Tabel Angsuran </label>';
            html += '<table><tr>';
            html += '<th>Angsuran ke -</th>';
            html += '<th>Angsuran Bunga</th>';
            html += '<th>Angsuran Pokok</th>';        
            html += '<th>Total Angsuran</th>';
            html += '<th>Sisa Pinjaman</th>';
            html += '</tr>'; 
            html += '<tr>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>'+plafond_format_rp+'</td>';
            html += '</tr>';

            for(var i = 1; i <= jangka_bln; i++) {  
              cicilan_berjalan = cicilan_pokok * i;      
              sisa_pinjaman = plafond - cicilan_berjalan;
              sisa_pinjaman_format = accounting.formatNumber(sisa_pinjaman, 2, ",", ".");
              sisa_pinjaman_format_rp = "Rp. "+ sisa_pinjaman_format;

              html += '<tr>';
              html += '<td>'+i+'</td>';
              html += '<td>'+bunga_format_rp+'</td>';
              html += '<td>'+cicilan_pokok_format_rp+'</td>';          
              html += '<td>'+jml_cicilan_format_rp+'</td>';
              html += '<td>'+sisa_pinjaman_format_rp+'</td>';
              html += '</tr>';
                    

            }

           html += '</table>';
         } else {
            /*anuitas*/
            jml_anuitas = getAnuitas(plafond,bunga_bln,jangka_bln);
            jml_anuitas_format = accounting.formatNumber(jml_anuitas, 2, ",", ".");
            jml_anuitas_format_rp = "Rp. "+ jml_anuitas_format;
         

            html += '<br/><br/><label class="section-title">Angsuran Anda </label><br/>';
            html += '<div class="modal-container">'; 
            html += '<label>Angsuran per Bulan  </label><label> : '+ jml_anuitas_format_rp+'</label><br/>';            
            html += '</div><br/>';

            html += '<br/><br/><label class="section-title">Tabel Angsuran </label>';

            html += '<table><tr>';
            html += '<th>Angsuran ke -</th>';
            html += '<th>Angsuran Bunga</th>';
            html += '<th>Angsuran Pokok</th>';        
            html += '<th>Total Angsuran</th>';
            html += '<th>Sisa Pinjaman</th>';
            html += '</tr>'; 
            html += '<tr>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>0</td>';
            html += '<td>'+plafond_format_rp+'</td>';
            html += '</tr>';

            for(var i = 1; i <= jangka_bln; i++) {

              //anuitas = getAnuitas(plafond,bunga_bln,jangka_bln);

              angs_bunga = plafond*(bunga_bln/100);
              angs_bunga_rp = "Rp. "+ accounting.formatNumber(angs_bunga, 2, ",", ".");
              
              

              angs_pokok = jml_anuitas-angs_bunga;
              angs_pokok_rp = "Rp. "+ accounting.formatNumber(angs_pokok, 2, ",", ".");
              
              jml_cicilan = angs_bunga+angs_pokok;
              jml_cicilan_rp = "Rp. "+ accounting.formatNumber(jml_cicilan, 2, ",", ".");

              sisa_pinjaman_ori = plafond-angs_pokok;
              if(sisa_pinjaman_ori > 0){
                sisa_pinjaman = sisa_pinjaman_ori;
              } else {
                sisa_pinjaman = 0;
              }
              sisa_pinjaman_rp = "Rp. "+ accounting.formatNumber(sisa_pinjaman, 2, ",", ".");
              plafond=sisa_pinjaman;

              

              html += '<tr>';
              html += '<td>'+i+'</td>';
              html += '<td>'+angs_bunga_rp+'</td>';
              html += '<td>'+angs_pokok_rp+'</td>';          
              html += '<td>'+jml_cicilan_rp+'</td>';
              html += '<td>'+sisa_pinjaman_rp+'</td>';
              html += '</tr>';
                    

            }

           html += '</table>'; 

          }

      
       jQuery("#myModal").modal("show");
       jQuery(".modal-body").empty();       
       jQuery(".modal-body").append(html); 

    });
});

function getAnuitas(plafond,bunga_bln,jangka_bln)
 { 
  bunga = bunga_bln/100; 
  i = 1-(1/Math.pow(1+bunga,jangka_bln)); 
  result = plafond*(bunga/i); 
  return result; 
 } 