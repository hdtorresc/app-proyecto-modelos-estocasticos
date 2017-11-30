'use strict';

// Articles controller
angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;

    $scope.servidores=[
      {
        idServidor:1,
        nombre:'Servidor 1'
      },
      {
        idServidor:2,
        nombre:'Servidor 2'
      },
      {
        idServidor:3,
        nombre:'Servidor 3'
      }
    ];
      
    $scope.servidor_seleccionado={
      idServidor:1,
      nombre:'Servidor 1'
    };

    // Create new Article
    $scope.create = function () {
      // Create new Article object
      var article = new Articles({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };

    // Update existing Article
    $scope.update = function () {
      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Articles.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };
  
  
    // ********************
    // ******* COMUN ******
    // ********************

    $scope.visible = 0;

    // Funcion random
    $scope.getRandom = function(min, max){
      return Math.floor((Math.random() * (max - min) ) + min);
    };
  
    $scope.factorial = function(num){
      if (num === 0){ 
        return 1; 
      } else { 
        return num * $scope.factorial(num - 1 ); 
      }
    };

    // Calcular la sumatoria necesaria en p0 (r^c / n!) para el caso M/M/c
    $scope.mmc_sumatoria_p0 = function (c, r) {
      var sumatoria = 0;
      var aux = 0;
      for (var i = 0; i < c; i++) {
        aux = Math.pow(r,i) / $scope.factorial(i);
        sumatoria = sumatoria + aux;
      }
      return sumatoria;
    };


    // M / M / 1
    // Calcular L para el caso M/M/1
    $scope.mm1_L = function (lambda, mu) {
      return lambda / (mu - lambda);
    };

    // Calcular Lq para el caso M/M/1
    $scope.mm1_Lq = function (lambda, mu) {
      return (lambda * lambda) / ( mu * (mu - lambda));
    };

    // Calcular W para el caso M/M/1
    $scope.mm1_W = function (lambda, mu) {
      return 1 / (mu - lambda);
    };

    // Calcular Wq para el caso M/M/1
    $scope.mm1_Wq = function (lambda, mu) {
      return lambda / ( mu * (mu - lambda));
    };

    // Calcular p0 para el caso M/M/1
    $scope.mm1_p0 = function (lambda, mu) {
      return (1 - (lambda / mu)) * 100;
    };

    // Calcular p para el caso M/M/1
    $scope.mm1_p = function (lambda, mu) {
      return lambda / mu;
    };


    // M / M / c
    // Calcular p para el caso M/M/c
    $scope.mmc_p = function (lambda, mu, c) {
      return lambda / (c * mu);
    };

    // Calcular r para el caso M/M/c
    $scope.mmc_r = function (lambda, mu) {
      return lambda / mu;
    };

    // Calcular p0 para el caso M/M/c
    $scope.mmc_p0 = function (c, p, r) {   
      return 1 / ((Math.pow(r,c) / ($scope.factorial(c) * (1-p)) ) + $scope.mmc_sumatoria_p0(c,r) ) ;
    };

    // Calcular L para el caso M/M/c
    $scope.mmc_L = function (lambda, mu, c, p0) {   
      return ((lambda * mu * Math.pow(lambda/mu, c)) / (($scope.factorial(c-1)) * Math.pow((c * mu - lambda),2))) * p0 + (lambda/mu);
    };

    // Calcular Lq para el caso M/M/c
    $scope.mmc_Lq = function (lambda, mu, c, p0) {
      return ((Math.pow(lambda/mu, c) * lambda * mu) / ($scope.factorial(c-1) * Math.pow(c*mu-lambda, 2))) * p0;
    };

    // Calcular W para el caso M/M/c
    $scope.mmc_W = function (lambda, mu, c, p0) {
      return ((mu * Math.pow(lambda/mu, c)) / ($scope.factorial(c-1) * Math.pow(c*mu-lambda, 2))) * p0 + (1/mu);
    };

    // Calcular Wq para el caso M/M/c
    $scope.mmc_Wq = function (lambda, Lq) {
      return Lq / lambda;
    };


    // M / M / c / k
    // Calcular p0 para p != 1 en el caso M/M/c/k
    $scope.mmck_p0_1 = function (c, p, r, k) { 
      return 1 / ( ( (Math.pow(r,c) * (1 - Math.pow(p, k-c+1))) / ($scope.factorial(c) * (1-p)) ) + $scope.mmc_sumatoria_p0(c,r) ) ;
    };

    // Calcular p0 para p == 1 en el caso M/M/c/k
    $scope.mmck_p0_2 = function (c, p, r, k) {   
      return 1 / (((Math.pow(r,c) / $scope.factorial(c) ) * (k-c+1)) + $scope.mmc_sumatoria_p0(c,r) ) ;
    };

    // Calcular pk_1 para (1 <= n <= c) en el caso M/M/c/k
    $scope.mmck_pk_1 = function (lambda, mu, c, p0, k) {
      return ( Math.pow(lambda, k) / ($scope.factorial(k) * Math.pow(mu, k))) * p0;
    };

    // Calcular pk_2 para (c <= n <= k) en el caso M/M/c/k
    $scope.mmck_pk_2 = function (lambda, mu, c, p0, k) {
      return ( Math.pow(lambda, k) / (Math.pow(c, k-c) * $scope.factorial(c) * Math.pow(mu, k))) * p0;
    };

    // Calcular Lq para el caso M/M/c/k
    $scope.mmck_Lq = function (c, p0, p, k, r) {
      return (p0 * Math.pow(r, c) * p) / ($scope.factorial(c) * Math.pow(1-p,2)) * (1 - Math.pow(p, k-c+1) - ((1-p) * (k-c+1) * Math.pow(p, k-c)));
    };

    // Calcular L para el caso M/M/c/k
    $scope.mmck_L = function (Lq, r, pk) {   
      return ( parseFloat(Lq) + parseFloat((r * (1 - pk)) ) );
    };

    // Calcular W para el caso M/M/c/k
    $scope.mmck_W = function (lambda, L, pk) {   
      return L / (lambda * (1 - pk));
    };

    // Calcular Wq para el caso M/M/c/k
    $scope.mmck_Wq = function (lambda, mu, L, pk) {   
      return (L / (lambda * (1 - pk))) - (1 / mu);
    };


    // ***********************
    // ******* SIMULADOR *****
    // ***********************

    // Variables simulador
    $scope.lambda_1 = 0;
    $scope.miu_1 = 0;
    $scope.L_1 = 0;
    $scope.Lq_1 = 0;
    $scope.W_1 = 0;
    $scope.Wq_1 = 0;
    $scope.p0_1 = 0;

    $scope.lambda_2 = 0;
    $scope.miu_2 = 0;
    $scope.L_2 = 0;
    $scope.Lq_2 = 0;
    $scope.W_2 = 0;
    $scope.Wq_2 = 0;
    $scope.p0_2 = 0;

    $scope.lambda_3 = 0;
    $scope.miu_3 = 0;
    $scope.c = 3;
    $scope.L_3 = 0;
    $scope.Lq_3 = 0;
    $scope.W_3 = 0;
    $scope.Wq_3 = 0;
    $scope.p0_3 = 0;

    // Calcular valores
    $scope.mostrar = function () {
      alert('Un mensaje de prueba');
    };

    // Calcular valores random
    $scope.reiniciar = function () {
      $scope.visible = 0;
      $scope.L_1 = 0;
      $scope.L_2 = 0;
      $scope.L_3 = 0;
      $scope.Lq_1 = 0;
      $scope.Lq_2 = 0;
      $scope.Lq_3 = 0;
      $scope.W_1 = 0;
      $scope.W_2 = 0;
      $scope.W_3 = 0;
      $scope.Wq_1 = 0;
      $scope.Wq_2 = 0;
      $scope.Wq_3 = 0;
      $scope.p0_1 = 0;
      $scope.p0_2 = 0;
      $scope.p0_3 = 0;
      $scope.lambda_1 = $scope.getRandom(10,20);
      $scope.miu_1 = $scope.getRandom(21,30);
      $scope.lambda_2 = $scope.getRandom(15,25);
      $scope.miu_2 = $scope.getRandom(26,40);
      $scope.lambda_3 = $scope.getRandom(15,30);
      $scope.miu_3 = $scope.getRandom(11,30);
    };

    // Calcular valores de rendimiento para el primer servidor
    $scope.calcular_tres_servidores = function () {
      $scope.visible = 1;
      $scope.calcular_servidor_1();
      $scope.calcular_servidor_2();
      $scope.calcular_servidores_3();
      console.log('Servidor seleccionado = ' + $scope.servidor_seleccionado.idServidor);

      var max = Math.max($scope.Wq_1, $scope.Wq_2, $scope.Wq_3);
      var aux = 0;

      if (max == $scope.Wq_1) {
        aux = 1;
      } 
      if (max == $scope.Wq_2) {
        aux = 2;
      }
      if (max == $scope.Wq_3) {
        aux = 3;
      }

      console.log('Max = ' + max);
      console.log('aux = ' + aux);

      if ($scope.servidor_seleccionado.idServidor == aux) {
        alert('Correcto !!!');
      } else {
        alert('Es incorrecto :( ');
      }

    };

    // Calcular valores de rendimiento para el primer servidor
    $scope.calcular_servidor_1 = function () {   
      $scope.L_1 = $scope.mm1_L($scope.lambda_1, $scope.miu_1).toFixed(3);
      $scope.Lq_1 = $scope.mm1_Lq($scope.lambda_1, $scope.miu_1).toFixed(3);
      $scope.W_1 = $scope.mm1_W($scope.lambda_1, $scope.miu_1).toFixed(3);
      $scope.Wq_1 = $scope.mm1_Wq($scope.lambda_1, $scope.miu_1).toFixed(3);
      $scope.p0_1 = $scope.mm1_p0($scope.lambda_1, $scope.miu_1).toFixed(3);
    };

    // Calcular valores de rendimiento para el primer servidor
    $scope.calcular_servidor_2 = function () {
      $scope.L_2 = $scope.mm1_L($scope.lambda_2, $scope.miu_2).toFixed(3);
      $scope.Lq_2 = $scope.mm1_Lq($scope.lambda_2, $scope.miu_2).toFixed(3);
      $scope.W_2 = $scope.mm1_W($scope.lambda_2, $scope.miu_2).toFixed(3);
      $scope.Wq_2 = $scope.mm1_Wq($scope.lambda_2, $scope.miu_2).toFixed(3);
      $scope.p0_2 = $scope.mm1_p0($scope.lambda_2, $scope.miu_2).toFixed(3);
    };

    // Calcular valores de rendimiento para los 3 servidores
    $scope.calcular_servidores_3 = function () {
      var p = ($scope.lambda_3 / ($scope.miu_3 * $scope.c));
      var r = $scope.lambda_3 / $scope.miu_3;
      $scope.p0_3 = $scope.mmc_p0($scope.c, p, r).toFixed(3);
      $scope.L_3 = $scope.mmc_L($scope.lambda_3, $scope.miu_3, $scope.c, $scope.p0_3).toFixed(3);
      $scope.Lq_3 = $scope.mmc_Lq($scope.lambda_3, $scope.miu_3, $scope.c, $scope.p0_3).toFixed(3);
      $scope.W_3 = $scope.mmc_W($scope.lambda_3, $scope.miu_3, $scope.c, $scope.p0_3).toFixed(3);
      $scope.Wq_3 = $scope.mmc_Wq($scope.lambda_3, $scope.Lq_3).toFixed(3);
    };
  
    // *************************
    // ******* CALCULADORA *****
    // *************************

    // Variables calculadora mm1
    $scope.cal_mm1_lambda = '';
    $scope.cal_mm1_miu = '';
    $scope.cal_mm1_L = 0;
    $scope.cal_mm1_Lq = 0;
    $scope.cal_mm1_W = 0;
    $scope.cal_mm1_Wq = 0;
    $scope.cal_mm1_p0 = 0;
    $scope.cal_mm1_p = 0;

    // Variables calculadora mmc
    $scope.cal_mmc_lambda = '';
    $scope.cal_mmc_miu = '';          
    $scope.cal_mmc_c = '';
    $scope.cal_mmc_r = 0;
    $scope.cal_mmc_p = 0;
    $scope.cal_mmc_L = 0;
    $scope.cal_mmc_Lq = 0;
    $scope.cal_mmc_W = 0;
    $scope.cal_mmc_Wq = 0;
    $scope.cal_mmc_p0 = 0;

    // Variables calculadora mmck
    $scope.cal_mmck_lambda = '';
    $scope.cal_mmck_mu = '';
    $scope.cal_mmck_c = '';
    $scope.cal_mmck_k = '';
    $scope.cal_mmck_r = 0;
    $scope.cal_mmck_p = 0;
    $scope.cal_mmck_pk = 0;
    $scope.cal_mmck_L = 0;
    $scope.cal_mmck_Lq = 0;
    $scope.cal_mmck_W = 0;
    $scope.cal_mmck_Wq = 0;
    $scope.cal_mmck_p0 = 0;    
    $scope.is_p0_1 = true;    
    $scope.is_pk_1 = true;

    $scope.controles_OK = true;

    // Inicializar valores mm1
    $scope.inicializar_valore_mm1 = function () {
      $scope.cal_mm1_lambda = '';
      $scope.cal_mm1_miu = '';
      $scope.cal_mm1_L = 0;
      $scope.cal_mm1_Lq = 0;
      $scope.cal_mm1_W = 0;
      $scope.cal_mm1_Wq = 0;
      $scope.cal_mm1_p0 = 0;
      $scope.cal_mm1_p = 0;
    };

    // Inicializar valores mmc
    $scope.inicializar_valore_mmc = function () {
      $scope.cal_mmc_lambda = '';
      $scope.cal_mmc_miu = '';          
      $scope.cal_mmc_c = '';
      $scope.cal_mmc_r = 0;
      $scope.cal_mmc_p = 0;
      $scope.cal_mmc_L = 0;
      $scope.cal_mmc_Lq = 0;
      $scope.cal_mmc_W = 0;
      $scope.cal_mmc_Wq = 0;
      $scope.cal_mmc_p0 = 0;
    };

    // Inicializar valores mmck
    $scope.inicializar_valore_mmck = function () {
      $scope.cal_mmck_lambda = '';
      $scope.cal_mmck_mu = '';
      $scope.cal_mmck_c = '';
      $scope.cal_mmck_k = '';
      $scope.cal_mmck_r = 0;
      $scope.cal_mmck_p = 0;
      $scope.cal_mmck_pk = 0;
      $scope.cal_mmck_L = 0;
      $scope.cal_mmck_Lq = 0;
      $scope.cal_mmck_W = 0;
      $scope.cal_mmck_Wq = 0;
      $scope.cal_mmck_p0 = 0;    
      $scope.is_p0_1 = true;    
      $scope.is_pk_1 = true;
    };

    // Controles de valores de entrada
    $scope.controles_datos_entrada = function (lambda, mu, c, k, modelo) {
      console.log('lambda = '+lambda);
      console.log('mu = '+mu);
      console.log('c = '+c);
      console.log('k = '+k);
      $scope.controles_OK = true;
      if (lambda <= 0 || mu <= 0 || c <= 0 || k <= 0) {
        $scope.controles_OK = false;
        alert('Por favor ingrese valores mayores a 0');
        switch(modelo) {
          case 'mm1':
              $scope.inicializar_valore_mm1();
              break;
          case 'mmc':
              $scope.inicializar_valore_mmc();
              break;
          case 'mmck':
              $scope.inicializar_valore_mmck();
              break;
        } 
      }
      if(isNaN(lambda) || isNaN(mu) || isNaN(c) || isNaN(k)){
        $scope.controles_OK = false;
        alert('Por favor ingrese valores numéricos');
        switch(modelo) {
          case 'mm1':
              $scope.inicializar_valore_mm1();
              break;
          case 'mmc':
              $scope.inicializar_valore_mmc();
              break;
          case 'mmck':
              $scope.inicializar_valore_mmck();
              break;
        }
      }
    };

    // Calcular valores de rendimiento mm1
    $scope.calcular_mm1 = function (lambda, mu) {
      $scope.controles_datos_entrada(lambda, mu, 1, 1, 'mm1');
      if ($scope.controles_OK != false) {
        if (lambda < mu) {        
          $scope.cal_mm1_L = $scope.mm1_L(lambda, mu).toFixed(4);
          $scope.cal_mm1_Lq = $scope.mm1_Lq(lambda, mu).toFixed(4);
          $scope.cal_mm1_W = $scope.mm1_W(lambda, mu).toFixed(4);
          $scope.cal_mm1_Wq = $scope.mm1_Wq(lambda, mu).toFixed(4);
          $scope.cal_mm1_p0 = $scope.mm1_p0(lambda, mu).toFixed(4);
          $scope.cal_mm1_p = $scope.mm1_p(lambda, mu).toFixed(4);
        } else {
          alert('La tasa de llegadas (λ) debe ser menor que la tasa de servico (µ) para evitar que la fila crezca infinitamente');
          $scope.inicializar_valore_mm1();
        }
      }
    };

    // Calcular valores de rendimiento mmc
    $scope.calcular_mmc = function (lambda, mu, c) {
      $scope.controles_datos_entrada(lambda, mu, c, 1, 'mmc');
      if ($scope.controles_OK != false) {
        if (lambda < (mu*c)) {
          $scope.cal_mmc_p = $scope.mmc_p(lambda, mu, c).toFixed(4);
          $scope.cal_mmc_r = $scope.mmc_r(lambda, mu);
          $scope.cal_mmc_p0 = $scope.mmc_p0(c, $scope.cal_mmc_p, $scope.cal_mmc_r).toFixed(4);   
          console.log('p0' + $scope.cal_mmc_p0);
          $scope.cal_mmc_L = $scope.mmc_L(lambda, mu, c, $scope.cal_mmc_p0).toFixed(4);   
          $scope.cal_mmc_Lq = $scope.mmc_Lq(lambda, mu, c, $scope.cal_mmc_p0).toFixed(4);
          $scope.cal_mmc_W = $scope.mmc_W(lambda, mu, c, $scope.cal_mmc_p0).toFixed(4);
          $scope.cal_mmc_Wq = $scope.mmc_Wq(lambda, $scope.cal_mmc_Lq).toFixed(4);
        } else {
          alert('La tasa de llegadas (λ) debe ser menor que la tasa de servico (µ) multiplicado por el numero de servidores (c) para evitar que la fila crezca infinitamente');
          $scope.inicializar_valore_mmc();
        }
      }
    };
    

    // Calcular valores de rendimiento mmck
    $scope.calcular_mmck = function (lambda, mu, c, k) {
      $scope.controles_datos_entrada(lambda, mu, c, k, 'mmck');
      if ($scope.controles_OK != false) {
        if (lambda < (mu*c)) {
          $scope.cal_mmck_p = $scope.mmc_p(lambda, mu, c).toFixed(4);
          $scope.cal_mmck_r = $scope.mmc_r(lambda, mu);

          if ($scope.cal_mmck_p == 1) {
            $scope.cal_mmck_p0 = $scope.mmck_p0_2(c, $scope.cal_mmck_p, $scope.cal_mmck_r, k).toFixed(4);
          } else {
            $scope.cal_mmck_p0 = $scope.mmck_p0_1(c, $scope.cal_mmck_p, $scope.cal_mmck_r, k).toFixed(4);
          }

          if (1 <= k && k < c) {
            $scope.cal_mmck_pk = $scope.mmck_pk_1(lambda, mu, c, $scope.cal_mmck_p0, k).toFixed(4);
          } 
          else if (c <= k ) {
            $scope.cal_mmck_pk = $scope.mmck_pk_2(lambda, mu, c, $scope.cal_mmck_p0, k).toFixed(4);
          }

          $scope.cal_mmck_Lq = $scope.mmck_Lq(c, $scope.cal_mmck_p0, $scope.cal_mmck_p, k, $scope.cal_mmck_r).toFixed(4);
          $scope.cal_mmck_L = $scope.mmck_L($scope.cal_mmck_Lq, $scope.cal_mmck_r, $scope.cal_mmck_pk);  
          $scope.cal_mmck_W = $scope.mmck_W(lambda, $scope.cal_mmck_L, $scope.cal_mmck_pk).toFixed(4);
          $scope.cal_mmck_Wq = $scope.mmck_Wq(lambda, mu, $scope.cal_mmck_L, $scope.cal_mmck_pk).toFixed(4);
        } else {
          alert('La tasa de llegadas (λ) debe ser menor que la tasa de servico (µ) multiplicado por el numero de servidores (c) para evitar que la fila crezca infinitamente');
          $scope.inicializar_valore_mmck();
        }
      }
    };


  }
]);

