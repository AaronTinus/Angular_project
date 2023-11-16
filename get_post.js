var app = angular.module('my_app', []);
app.run(function($rootScope){
    $rootScope.the_g_var = "Globally created"
})

app.controller('my_cntrl',function($scope, $location, $interval,  $http)
{
    $scope.myUrl = $location.absUrl();
    

    $scope.the_time = new Date().toLocaleTimeString();

    $interval(function(){
        $scope.the_time = new Date().toLocaleTimeString();
    },1000);







    // $http.get("http://localhost:9000/get_all_emails").then(function (response) {
    //     $scope.myWelcome = response.data;
    // });

    $scope.user_list_filter = ""
    $scope.user_list_data = function(){
        $http.get("http://localhost:9000/get_user_list/?ul_filter=" + $scope.user_list_filter).then(function (response) {
        $scope.api_res = response.data;
        $scope.api_sts = response.status;
        $scope.api_txt = response.statusText;
    });
    }



    $scope.data_base_filter = ""
    $scope.data_base_data = function(){
        $http.get("http://localhost:9000/get_all_data/?d_filter=" + $scope.data_base_filter).then(function (response) {
        $scope.api_res = response.data;
        $scope.api_sts = response.status;
        $scope.api_txt = response.statusText;
    });
    }

    $scope.last_name_filter = ""
    $scope.last_name_data = function(){
        $http.get("http://localhost:9000/get_last_name/?l_filter=" + $scope.last_name_filter).then(function (response) {
        $scope.api_res = response.data;
        $scope.api_sts = response.status;
        $scope.api_txt = response.statusText;
    });
    }

    $scope.blog_filter = ""
    $scope.blog_data = function(){
        $http.get("http://localhost:9000/get_blog_name/?b_filter=" + $scope.blog_filter).then(function (response) {
        $scope.api_res = response.data;
        $scope.api_sts = response.status;
        $scope.api_txt = response.statusText;
        console.log("blog list delivered");
    });
    }



    
 $scope.emails_filter = ""
    $scope.email_data = function(){
        $http.get("http://localhost:9000/get_all_emails/?s_filter=" + $scope.emails_filter).then(function (response) {
        $scope.api_res = response.data;
        $scope.api_sts = response.status;
        $scope.api_txt = response.statusText;
    });
    }


    $scope.name_filter = ""
    $scope.name_data = function(){
        $http.get("http://localhost:9000/get_one_record/?n_filter=" + $scope.name_filter).then(function (response) {
        $scope.api_res = response.data;
        $scope.api_sts = response.status;
        $scope.api_txt = response.statusText;
    });
    }




    $scope.user_filter = ""
    $scope.get_data = function(){
        $http.get("http://localhost:9000/get_one_filtered_record/?u_filter=" + $scope.user_filter).then(function (response) {
        $scope.api_res = response.data;
        $scope.api_sts = response.status;
        $scope.api_txt = response.statusText;
    });
    }


    $scope.make_post = function(){
        $scope.our_data = {
            'user_author_name' : $scope.user_author_name,
            'user_author_lname' : $scope.user_author_lname,
            'user_author_email' : $scope.user_author_email,
            'user_blog_name' : $scope.user_blog_name,
            'user_blog' : $scope.user_blog,
        }

        $scope.config = {
            headers : {
                'Content-Type': 'application/json'
                            
            }
        }

        $http.post("http://localhost:9000/save_data", $scope.our_data, $scope.config).then(function (response) {
        $scope.post_res = response.data;
    });
    };

});

