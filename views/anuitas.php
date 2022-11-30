<?php
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