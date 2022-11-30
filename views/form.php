<link rel='stylesheet' id='kdrt-simulation-style'  href='<?php echo plugins_url('../css/styles.css', __FILE__ );?>' type='text/css' media='all' />

<!-- jQuery Modal -->

<link rel="stylesheet" href="<?php echo plugins_url('../css/bootstrap-modal.min.css', __FILE__ );?>"/>

<script type='text/javascript' src='<?php echo plugins_url('../js/app.js', __FILE__ );?>'></script>
<script type='text/javascript' src='<?php echo plugins_url('../js/accounting.js', __FILE__ );?>'></script>
<script type='text/javascript' src='<?php echo plugins_url("../js/jquery.inputmask.bundle.min.js", __FILE__);?>'></script>
<script type='text/javascript' src='<?php echo plugins_url("../js/inputmask.binding.min.js", __FILE__);?>'></script>

<script src="<?php echo plugins_url('../js/bootstrap-modal.min.js', __FILE__ );?>"></script>



<div class="kdrt-container">
<form method="post" accept-charset="utf-8" action="">
    <h3 class="text-center">Kalkulator Kredit </h3><br/>
    <div class="input-container">
        <div class="input-group">
            <label>Jumlah Pinjaman (Rp)</label>
            <input name="kdrtPlafond" id="kdrtPlafond" type="text" min="1" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true" value="10000000">
        </div> 
        
        <div class="input-group">
            <label>Jangka Waktu (Bulan)</label>
            <input name="kdrtJangka" id="kdrtJangka" type="number" min="1" value="24">
        </div>
        <div class="input-group">
            <label>Bunga ( %/Tahun )</label>
            <input name="kdrtBunga" id="kdrtBunga" type="number" step="any" min="1" value="8.5">
        </div>
        
        <div class="input-group">
            <label>Metode Angsuran</label>
            <!-- 
            <select id="kdrtMetode">
                <option value="flat">Flat</option>
               <option value="anuitas">Anuitas</option> 
            </select>
            -->
             <input id="kdrtMetode" name="kdrtMetode" type="text" value="flat">
            
            
        </div>

   
        <div class="input-group clear text-center">
            <button class="btn btn-primary" type="submit" name="submit">Hitung</button>
        </div>

    </div>
</form>
</div>

<div id="show-personality">   
<?php 
if(isset($_POST['submit'])) 
{ 
    define('FINANCIAL_MAX_ITERATIONS', 128);
    define('FINANCIAL_PRECISION', 1.0e-08);
    function RATE($nper, $pmt, $pv, $fv = 0.0, $type = 0, $guess = 0.1) {
        $rate = $guess;
        if (abs($rate) < FINANCIAL_PRECISION) {
            $y = $pv * (1 + $nper * $rate) + $pmt * (1 + $rate * $type) * $nper + $fv;
        } else {
            $f = exp($nper * log(1 + $rate));
            $y = $pv * $f + $pmt * (1 / $rate + $type) * ($f - 1) + $fv;
        }
        $y0 = $pv + $pmt * $nper + $fv;
        $y1 = $pv * $f + $pmt * (1 / $rate + $type) * ($f - 1) + $fv;
        $i = $x0 = 0.0;
        $x1 = $rate;
        while ((abs($y0 - $y1) > FINANCIAL_PRECISION) && ($i < FINANCIAL_MAX_ITERATIONS)) {
            $rate = ($y1 * $x0 - $y0 * $x1) / ($y1 - $y0);
            $x0 = $x1;
            $x1 = $rate;
            if (abs($rate) < FINANCIAL_PRECISION) {
                $y = $pv * (1 + $nper * $rate) + $pmt * (1 + $rate * $type) * $nper + $fv;
            } else {
                $f = exp($nper * log(1 + $rate));
                $y = $pv * $f + $pmt * (1 / $rate + $type) * ($f - 1) + $fv;
            }
            $y0 = $y1;
            $y1 = $y;
            ++$i;
        }
        return $rate;
    }
    
    
    $plafond = $_POST['kdrtPlafond'];
    $plafond = str_replace(",","",$plafond);
    $plafond_rp = "Rp. ". number_format($plafond,2);
    $jangka_bln = $_POST['kdrtJangka'];
    $jangka_thn = floatval($jangka_bln)/12;
    $bunga_thn = $_POST['kdrtBunga'];
    $bunga_bln = floatval($bunga_thn)/12;    
    $bunga_bln_format = round($bunga_bln,2);  
    $metode = $_POST['kdrtMetode'];
    
    $cicilan_pokok = floatval($plafond)/floatval($jangka_bln);        
    $bunga_flat = floatval($plafond)*($bunga_bln/100);
    $pmt = $cicilan_pokok+$bunga_flat;
    $pv= floatval(-$plafond);
    $fv = 0;
    $type = 0;
    $guess = 0;

    $rate = RATE($jangka_bln, $pmt, $pv, $fv, $guess)*12;
    $rate_round = round($rate,2);
    
    $rate_persen = round((float)$rate * 100,2)  . '%';
    
   // $total_bunga = floatval($plafond)*$rate_round;
    $total_bunga = (float)$plafond*(float)$bunga_thn/100 * $jangka_thn;
    $total_angsuran = $total_bunga+$plafond;
    
    
    $html = '<div class="kdrt-container">';
    
    $html .= '<h3 class="text-center">Pinjaman Anda </h3><br/>';
    $html .= '<div class="modal-container">'; 
    $html .= '<label>Jumlah Pinjaman  </label><label> : ' .$plafond_rp. '</label><br/>';
    $html .= '<label>Lama Pinjaman  </label><label> : '. $jangka_bln. 'bulan ('. $jangka_thn. ' tahun)</label> <br/>';
    $html .= '<label>Bunga Flat   </label><label> : '.$bunga_bln_format.'% / bulan ('.$bunga_thn.'%/ tahun)</label><br/>';
   
    $html .= '<label>Total Bunga  ( '.$jangka_bln.' bulan ) </label><label> : Rp '.number_format($total_bunga,2).'</label><br/>';
    $html .= '<label>Total Pembayaran  ( '.$jangka_bln.' bulan ) </label><label> : Rp '.number_format($total_angsuran,2).'</label><br/>';
         
   
    
    
   
    $html .= '<table><tr>';
    $html .= '<th></th>';
    $html .= '<th>Bunga FLAT</th>';
    $html .= '<th>Bunga Anuitas</th>';        
    $html .= '</tr>'; 
    $html .= '<tr>';
    $html .= '<td>Suku Bunga per Tahun 	</td>';
    $html .= '<td>' .$bunga_thn.'% <br/> <span id="flat_modal" style="cursor:pointer;color:#453d94;font-weight:bold;"> Lanjut </span></td>';
    $html .= '<td>' .$rate_persen.' <br/> <span id="anuitas_modal" style="cursor:pointer;color:#453d94;font-weight:bold;"> Lanjut</span></td>';        
    $html .= '</tr>'; 
    $html .= '</table>'; 
    
   $html .= '</div>';
    
    
    
    
    
    echo $html;
}
?> 
</div>


<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="important-msg-label" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="important-msg-label">Simulasi Angsuran</h4>
          </div>
          <div class="modal-body">            
          </div>
          <div class="modal-footer text-center">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
           
          </div>
        </div>
      </div>
    </div>

 