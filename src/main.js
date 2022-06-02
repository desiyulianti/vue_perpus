var api_url = "http://127.0.0.1:8000/api";
var api_url2 = "http://127.0.0.1:8000";

//konfigurasi route
var router = [
    {   
        path: "/home", 
        name: "Home", 
        component: httpVueLoader("./src/components/Home.vue")
    },
    {   
        path: "/book", 
        name: "Book", 
        component: httpVueLoader("./src/components/Book.vue")
    },
    {   
      path: "/borrowing", 
      name: "BorrowingBook", 
      component: httpVueLoader("./src/components/BorrowingBook.vue")
  },
  {   
    path: "/book_return", 
    name: "Book_Return", 
    component: httpVueLoader("./src/components/Book_Return.vue")
  },
  {   
      path: "/class", 
      name: "Class", 
      component: httpVueLoader("./src/components/Class.vue")
  },
  {   
    path: "/student", 
    name: "Student", 
    component: httpVueLoader("./src/components/Student.vue")
  },

];

var routers = new VueRouter({ routes : router, base: "/"});


//INSTANCE VUE

var app = new Vue({
    el: "#app",
    components: {
      'apps' : httpVueLoader("./src/components/App.vue"),
      'login' : httpVueLoader("./src/components/Login.vue"),
    },
    data: { //hak akses, username, email(sifatnya global)
      user : {
        id_user: "",
        role: "",
        name: "",
        username: "",
      },
      mycomponent: ""
    },
    router: routers,
    methods: {
      CekToken : function(){
          //punya token di cookies apa tidak?
          if(this.$cookies.isKey('Authorization')){
              //kalau punya 
              //mapping header token
              let config = {
                headers : {
                  "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
              }

            axios.get(api_url + '/login_check', config)
            .then( response => {
                if(response.data.status == 1){
                  this.mycomponent = "apps";
                  
                  this.id_user = response.data.data.id;
                  this.role = response.data.data.role;
                  this.name = response.data.data.name;
                  this.username = response.data.data.username;

                } else {
                  this.mycomponent = "login";
                }
          })

        } else { 
              //kalau tidak punya, langsung ke login
              this.mycomponent = "login";
        }

      },
    },
    mounted(){
      this.CekToken();
    }
  });