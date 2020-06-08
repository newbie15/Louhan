<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>LOUHAN - LAPORAN UPDATE HARIAN</title>

	<link rel="stylesheet" href="<?php echo base_url('assets/cus/css/custom-alert.css'); ?>">
	<!-- <link rel="stylesheet" href="http://localhost/ant/assets/datatables/css/jquery.dataTables.min.css"> -->
	<style type="text/css">
		.btn{
			display: inline-block;
	    margin-bottom: 0px;
	    font-size: 14px;
	    font-weight: 400;
	    line-height: 1.42857;
	    text-align: center;
	    white-space: nowrap;
	    vertical-align: middle;
	    touch-action: manipulation;
	    cursor: pointer;
	    user-select: none;
	    background-image: none;
	    padding: 6px 12px;
	    border-width: 1px;
	    border-style: solid;
	    border-color: transparent;
	    border-image: initial;
	    border-radius: 4px;			
		}

		.btn-success{
			background-image: linear-gradient(rgb(92, 184, 92) 0px, rgb(65, 150, 65) 100%);
			background-repeat: repeat-x;
			border-color: rgb(62, 143, 62);
			color: rgb(255, 255, 255);
		}

		.btn-info{
			color: #fff;
	    background-color: #0014ff;
	    border-color: #0014ff;
		}

		.btn-warning{
			color: #fff;
	    background-color: #d9534f;
	    border-color: #d43f3a;
		}		

		.hapus{
			float: left;
		}
	</style>

</head>

<script type="text/javascript">
  function updatevalue(x) {
  	console.log(x);
  	var d = x.parentNode.innerHTML;
  	console.log(d);
  	var a = d.split("value=");
  	var baru = a[0]+"value=\""+x.value+"\">";
  	console.log(baru);
  	x.parentNode.innerHTML = baru;
  	console.log(x.value);
  }
</script>

<body style="font-family: Verdana; width: 100%; margin:0px;" id="bdy">
  <div style="text-align: center;">  
  	<h2>LAPORAN HARIAN</h2>
  </div>
  Pabrik : 
  <select id="pabrik">
    <option>SDI1</option>
  </select>
  <br>
  Tanggal : 
  <select id="tahun">
    <option>2017</option>
    <option>2018</option>
    <option>2019</option>
  </select>
  <select id="bulan">
    <option value="01">januari</option>
    <option value="02">februari</option>
    <option value="03">maret</option>
    <option value="04">april</option>
    <option value="05">mei</option>
    <option value="06">juni</option>
    <option value="07">juli</option>
    <option value="08">agustus</option>
    <option value="09">september</option>
    <option value="10">oktober</option>
    <option value="11">november</option>
    <option value="12">desember</option>
  </select>
  <select id="tanggal">
    <option>01</option>
    <option>02</option>
    <option>03</option>
    <option>04</option>
    <option>05</option>
    <option>06</option>
    <option>07</option>
    <option>08</option>
    <option>09</option>
    <option>10</option>
    <option>11</option>
    <option>12</option>
    <option>13</option>
    <option>14</option>
    <option>15</option>
    <option>16</option>
    <option>17</option>
    <option>18</option>
    <option>19</option>
    <option>20</option>
    <option>21</option>
    <option>22</option>
    <option>23</option>
    <option>24</option>
    <option>25</option>
    <option>26</option>
    <option>27</option>
    <option>28</option>
    <option>29</option>
    <option>30</option>
    <option>31</option>
  </select>
  <br>
  Nama Fitter :
  <?php echo $dropdown_mpp; ?>
  <hr/>
  <form id="form" name="form">
	  <div id="my-spreadsheet"></div>  	
  </form>

  <button id="tambah" class="btn btn-info" style="">+ Tambah Job</button>

  <button id="simpan" class="btn btn-success" style="float: right">
  Simpan Job
	</button>

	<div id="forminput" style="display: none;" tabindex="0">
		<table>
			<tr>
				<td><strong>Area</strong></td>
				<td></td>
			</tr>
			<tr>
				<td>Station</td>
				<td><select id="station"></select></td>
			<tr>	
			<tr>
				<td>Unit</td>
				<td><select id="unit"></select></td>
			</tr>
			<tr>
				<td>Sub Unit</td>
				<td><select id="sub_unit"></select></td>
			</tr>
			<tr>
				<td><strong>Problem</strong></td>
				<td><input type="text" id="problem"></td>
			</tr>
			<tr>
				<td><strong>Penyelesaian</strong></td>
				<td><input type="text" id="penyelesaian"></td>
			</tr>
			<tr>
				<td><strong>Start</strong></td>
				<td><input type="time" id="start"></td>
			</tr>
			<tr>
				<td><strong>Stop</strong></td>
				<td><input type="time" id="stop"></td>
			</tr>
			<tr>
				<td><strong>Status</strong></td>
				<td>
					<select id="status">
						<option>Pilih Salah Satu</option>\
						<option>Belum Selesai</option>\
						<option>Tunggu Sparepart</option>\
						<option>Monitoring</option>\
		  				<option>Selesai</option>\
					</select>
				</td>
			</tr>
		</table>
		<button id="simpanjob" class="btn btn-success">Simpan Job Tambahan</button><br><br>
	</div>
	<br>
	<br>
	<br>
	<br>
</body>


  <script type="text/javascript" src="<?php echo base_url('assets/jquery/dist/jquery.js'); ?>"></script>
  <script type="text/javascript" src="<?php echo base_url('assets/cus/js/custom-alert.min.js'); ?>"></script>

  <script type="text/javascript" src="<?php echo base_url('assets/ant/ant.js'); ?>"></script>

</html>