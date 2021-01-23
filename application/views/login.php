<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>LOUHAN | Log in</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="assets/adminlte/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="assets/adminlte/bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="assets/adminlte/bower_components/Ionicons/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="assets/adminlte/dist/css/AdminLTE.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="assets/adminlte/plugins/iCheck/square/blue.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

    <!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body class="hold-transition login-page">
    <div class="login-box">
        <div class="login-logo">
            <a href="<?php site_url(""); ?>"><b>LOUHAN</b><br>Laporan Update Harian</a>
        </div>
        <!-- /.login-logo -->
        <div class="login-box-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <form action="login/signin" method="post">
                <div class="form-group has-feedback">
                    <!-- <input type="user" class="form-control" placeholder="User" name="user"> -->
                    <select id="dropmenu" class="form-control">
                        <option>==== Pilih Site ====</option>
                        <?php echo $dropdown_pabrik ?>
                    </select>
                    <!-- <span class="glyphicon glyphicon-user form-control-feedback"></span> -->
                </div>
                <!-- <div class="form-group has-feedback">
                    <input type="password" class="form-control" placeholder="Password" name="pass">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                </div> -->
                <div class="row">
                    <div class="col-xs-8">
                        <div class="checkbox icheck">
                            <label>
                                <!-- <input type="checkbox"> Remember Me -->
                            </label>
                        </div>
                    </div>
                    <!-- /.col -->
                    <div class="col-xs-4">
                        <button type="button" class="btn btn-primary btn-block btn-flat">Masuk</button>
                    </div>
                    <!-- /.col -->
                </div>
            </form>

            <!-- /.social-auth-links -->

            <a href="#">I forgot my password</a><br>
            <a href="register.html" class="text-center">Register a new membership</a>

        </div>
        <!-- /.login-box-body -->
    </div>
    <!-- /.login-box -->

    <!-- jQuery 3 -->
    <script src="assets/adminlte/bower_components/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap 3.3.7 -->
    <script src="assets/adminlte/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- iCheck -->
    <!-- <script src="assets/adminlte/plugins/iCheck/icheck.min.js"></script> -->
    <script>
        $(document).ready(function() {
            $("button").click(function() {
                if ($("#dropmenu").val() != "==== Pilih Site ====") {
                    document.cookie = $("#dropmenu").val();
                    gotopage();
                }
            });

            function cek_cookie() {
                console.log(document.cookie);
                if (document.cookie != "") {
                    // gotopage();
                    $("#dropmenu").val(document.cookie);
                }
            }

            function gotopage(xxx) {
                var url = window.location.href;
                console.log(url);

                var x = url.split("/");
                console.log(x);

                var GOTO = x[0] + "//" + x[2] + "/" + x[3] + "/" + "act/"; // "http://10.23.3.101/MDP/";
                // console.log(BASE_URL);

                if (xxx == undefined) {
                    xxx = "";
                }

                window.location.replace(GOTO + xxx);
            }

            cek_cookie();

        });
    </script>
</body>

</html>